import { 
  Box, 
  Button, 
  Center, 
  Flex, 
  Modal, 
  ModalBody, 
  ModalCloseButton, 
  ModalContent, 
  ModalFooter, 
  ModalOverlay, 
  Skeleton, 
  Spacer, 
  Spinner, 
  Stack, 
  useBoolean, 
  useColorModeValue, 
  useDisclosure 
} from '@chakra-ui/react'
import { API, Auth, DataStore, graphqlOperation } from 'aws-amplify'
import { useEffect, useState } from 'react'
import Header from '@/components/Common/Header'
import WithAuth from '@/components/Common/WithAuth'
import { GetUserQuery, StepsSubscribeMutation } from '@/types/API'
import { stepsSubscribe } from '@/graphql/mutations'
import { GraphQLResult } from "@aws-amplify/api-graphql"
import ProfileCard from '../../components/Profile/ProfileCard'
import { User } from '../../src/models'
import { ZenObservable } from 'zen-observable-ts'
import PlanSubList from '../../components/Profile/PlanSubList'
import { PlanSub } from '../../components/Profile/PlanSubItem'
import Subscription from '../../components/Profile/Subscription'
import { getUser } from '../../src/graphql/queries'

export interface SubStatus {
  personal: PlanSub,
  professional: PlanSub,
  enterprise: PlanSub
}

function Profile() {
  const [ user, setUser ] = useState<User>();
  const [ subStatus, setSubStatus ] = useState<SubStatus>();
  const [ shouldRefresh, setShouldRefresh ] = useBoolean();

  const { 
    isOpen: isOpenSubModal, 
    onOpen: onOpenSubModal, 
    onClose: onCloseSubModal
  } = useDisclosure();

  let userSub: ZenObservable.Subscription;

  useEffect(() => {
    Auth.currentAuthenticatedUser()
    .then( currentUser => {
      userSub = DataStore.observeQuery(
        User,
        u => u.sub.eq(currentUser.attributes.sub)
      ).subscribe(({ items }) => {
        if (items.length > 0) {
          setUser(items[0]);
          getAndSetSubStatus(items[0].id)
        }
      });
    });

    return () => userSub?.unsubscribe();
  }, []);

  useEffect(() => {
    refreshUserStatus();
  }, [shouldRefresh]);

  const refreshUserStatus = async () => {
    if (!user) return;

    getAndSetSubStatus(user.id);

    try {
      const response = await API.graphql(graphqlOperation(
        getUser,
        {id: user.id}
      )) as GraphQLResult<GetUserQuery>;

      const remoteUser = response.data?.getUser;

      if (!remoteUser) return;

      const clonedUser = User.copyOf(user, updated => {
        updated.membership = remoteUser.membership
      });

      setUser(clonedUser);
    } catch (error) {
      console.error(error);
    }
  }

  const getAndSetSubStatus = async (userId: string) => {
    const response = await API.graphql(graphqlOperation(
      stepsSubscribe, {
        operation: 'getPlanSubscriptions', 
        subscriptionId: '',
        userId: userId, 
      }
    )) as GraphQLResult<StepsSubscribeMutation>;

    if (
      !response.data || 
      !response.data.stepsSubscribe ||
      response.data.stepsSubscribe.statusCode != 200
    ) {
      console.error(`Failed to get subscription status. ${response.data?.stepsSubscribe?.body}`);
      return;
    }

    const subscriptions = JSON.parse(response.data.stepsSubscribe.body!);

    setSubStatus(subscriptions);
  }

  const refreshAndCloseModal = () => {
    setShouldRefresh.toggle();
    onCloseSubModal();
  }

  return (
    <WithAuth>
      <Flex direction='column' bg={useColorModeValue('gray.50', 'gray.800')} minH='100vh'>
        {user ? (
          <>
            <Header user={user} />
            <Stack
              justify={'center'}
              mt={24}
              mx='auto'
              w={{base: 'xs', sm: 'sm', md: 'lg'}}
              spacing={4}
            >
              <ProfileCard user={user} />
                  
              <Box cursor='pointer' onClick={onOpenSubModal} minH={100}>
                {subStatus ? (
                  <PlanSubList subStatus={subStatus} />
                ) : (
                  <Stack
                    rounded={'lg'}
                    boxShadow={'lg'}
                    w='full'
                    p={4}
                    pt={8}
                  >
                    <Skeleton height='20px' />
                    <Skeleton height='20px' />
                  </Stack>
                )}
              </Box>

              <Button 
                rounded={'full'}
                px={6}
                colorScheme={'orange'}
                bg={'orange.400'}
                _hover={{ bg: 'orange.500' }}
                boxShadow='lg'
                onClick={onOpenSubModal}
              >
                Upgrade plan or unsubscribe
              </Button>

            </Stack>
          </> ) : (
          <Stack  h='70vh'>
            <Spacer />
            <Center>
              <Spinner size='xl'/>
            </Center>
            <Spacer />
          </Stack>
        )}
        
        <Modal
          isOpen={isOpenSubModal} 
          onClose={onCloseSubModal}
          scrollBehavior='inside'
          size='full'
        >
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody mt={-6}>
              {user && subStatus ? (<Subscription subStatus={subStatus} user={user} onClose={refreshAndCloseModal} />) : null}
            </ModalBody>
            <ModalFooter>
              <Button onClick={onCloseSubModal}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>      
    </WithAuth>
  )
}


export default Profile
