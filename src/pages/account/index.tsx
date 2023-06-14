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
import { API, DataStore, graphqlOperation } from 'aws-amplify'
import { useContext, useEffect, useState } from 'react'
import Header from '@/components/Common/Header'
import WithAuth from '@/components/Common/WithAuth'
import { GetUserQuery, LearnwithaiSubscribeMutation } from '@/types/API'
import { learnwithaiSubscribe } from '@/graphql/mutations'
import { GraphQLResult } from "@aws-amplify/api-graphql"
import ProfileCard from '@/components/Account/ProfileCard'
import { User } from '@/models'
import PlanSubList from '@/components/Account/PlanSubList'
import { PlanSub } from '@/components/Account/PlanSubItem'
import Subscription from '@/components/Account/Subscription'
import { getUser } from '@/graphql/queries'
import Notification from '@/components/Account/Notification'
import SharedComponents from '@/components/Common/SharedComponents'

export interface SubStatus {
  personal: PlanSub,
  professional: PlanSub,
  enterprise: PlanSub
}

function Profile() {
  const [ subStatus, setSubStatus ] = useState<SubStatus>();
  const [ shouldRefresh, setShouldRefresh ] = useBoolean();
  const { dataStoreUser, setDataStoreUser } = useContext(SharedComponents);

  const { 
    isOpen: isOpenSubModal, 
    onOpen: onOpenSubModal, 
    onClose: onCloseSubModal
  } = useDisclosure();

  useEffect(() => {
    const refreshUserStatus = async () => {
      if (!dataStoreUser) return;
  
      getAndSetSubStatus(dataStoreUser.id);
  
      try {
        const response = await API.graphql(graphqlOperation(
          getUser,
          {id: dataStoreUser.id}
        )) as GraphQLResult<GetUserQuery>;
  
        const remoteUser = response.data?.getUser;
  
        if (!remoteUser) return;
  
        const currentUser = await DataStore.query(User, dataStoreUser.id);
        const clonedUser = User.copyOf(currentUser!, updated => {
          updated.membership = remoteUser.membership;
          updated.quota = remoteUser.quota;
        });
  
        setDataStoreUser(clonedUser);
      } catch (error) {
        console.error(error);
      }
    }

    refreshUserStatus();
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRefresh]);

  

  const getAndSetSubStatus = async (userId: string) => {
    const response = await API.graphql(graphqlOperation(
      learnwithaiSubscribe, {
        operation: 'getPlanSubscriptions', 
        subscriptionId: '',
        userId: userId, 
      }
    )) as GraphQLResult<LearnwithaiSubscribeMutation>;

    if (
      !response.data || 
      !response.data.learnwithaiSubscribe ||
      response.data.learnwithaiSubscribe.statusCode != 200
    ) {
      console.error(`Failed to get subscription status. ${response.data?.learnwithaiSubscribe?.body}`);
      return;
    }

    const subscriptions = JSON.parse(response.data.learnwithaiSubscribe.body!);

    setSubStatus(subscriptions);
  }

  const refreshAndCloseModal = () => {
    setShouldRefresh.toggle();
    onCloseSubModal();
  }

  return (
    <WithAuth>
      <Flex direction='column' bg={useColorModeValue('gray.50', 'gray.800')} minH='100vh'>
        {dataStoreUser ? (
          <>
            <Header />
            <Stack
              justify={'center'}
              mt={24}
              mx='auto'
              pb={4}
              w={{base: 'xs', sm: 'sm', md: 'lg'}}
              spacing={4}
            >
              <ProfileCard user={dataStoreUser} />

              <Notification user={dataStoreUser} />
                  
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
                boxShadow='md'
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
              {dataStoreUser && subStatus ? (<Subscription subStatus={subStatus} user={dataStoreUser} onClose={refreshAndCloseModal} />) : null}
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
