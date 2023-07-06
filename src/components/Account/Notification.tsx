import { NotificationType, User } from "@/models";
import { isValidEmail } from "@/types/utils";
import { 
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box, 
  Button, 
  Checkbox, 
  CheckboxGroup, 
  HStack, 
  Icon,
  Input, 
  Tag, 
  TagCloseButton, 
  TagLabel, 
  Text, 
  Tooltip, 
  useColorModeValue, 
  useDisclosure, 
  useToast, 
  VStack, 
  Wrap,
  WrapItem
} from "@chakra-ui/react";
import { DataStore } from "aws-amplify";
import { useContext, useRef, useState } from "react"
import { MdHelpOutline } from "react-icons/md";
import SharedComponents from "../Common/SharedComponents";

interface NotificationProps {
  user: User
}

function Notification({ user }: NotificationProps) {
  const [ email, setEmail ] = useState('');
  const [ types, setTypes ] = useState<(NotificationType | null)[]>(
    user.notification ? 
    user.notification.types as (NotificationType | null)[] : 
    [NotificationType.MONTHLY]
  );
  const selectedIndexRef = useRef(0);

  const { setDataStoreUser } = useContext(SharedComponents);

  const toast = useToast();

  const { 
    isOpen: isOpenRemoveAlert, 
    onOpen: onOpenRemoveAlert, 
    onClose: onCloseRemoveAlert 
  } = useDisclosure();
  const cancelRef = useRef(null);

  const setSelectedTypes = async (type: NotificationType) => {
    let updatedTypes = [...types];
    const index = types.indexOf(type);

    if (index > -1) {
      updatedTypes.splice(index, 1);
    } else {
      updatedTypes = [...updatedTypes, type];
    }

    setTypes([...updatedTypes]);

    const currentUser = await DataStore.query(User, user.id);
    if (!currentUser) return;
    const updatedUser = await DataStore.save(User.copyOf(currentUser, updated=>{
      updated.notification = updated.notification ? {
        ...updated.notification,
        types: updatedTypes
      } : {
        emails: [user.email],
        types: updatedTypes
      }
    }));
    setDataStoreUser(updatedUser);
  }

  const addEmail = async () => {
    console.log(email)
    if (!isValidEmail(email)) {
      toast({
        description: `Invalid email address!`,
        position: 'top',
        status: 'error',
        duration: 5000,
        isClosable: true
      });

      return;
    }

    const currentUser = await DataStore.query(User, user.id);
    if (!currentUser) return;
    const updatedUser = await DataStore.save(User.copyOf(currentUser, updated => {
      if (currentUser.notification && !currentUser.notification.emails.includes(email)) {
        updated.notification = {
          emails: [...currentUser.notification.emails, email],
          types: types
        }
      } else if (!currentUser.notification) {
        updated.notification = {
          emails: [email],
          types: types
        }
      } else {
        toast({
          description: `Duplicated email address!`,
          position: 'top',
          status: 'error',
          duration: 5000,
          isClosable: true
        });

        return;
      }

      setEmail('');
    }));
    setDataStoreUser(updatedUser);
  }

  const removeEmail = async (index: number) => {
    if (!user.notification) return;

    let updatedEmails = [...user.notification.emails];

    updatedEmails.splice(index, 1);

    const currentUser = await DataStore.query(User, user.id);
    if (!currentUser) return;

    const updatedUser = await DataStore.save(User.copyOf(currentUser, updated=>{
      updated.notification = {
        ...user.notification!,
        emails: updatedEmails,
      }
    }));
    
    setDataStoreUser(updatedUser);
    onCloseRemoveAlert();
  }

  return (
    <Box
      rounded={'lg'}
      bg={useColorModeValue('white', 'gray.700')}
      boxShadow={'md'}
      p={8}
      w='full'
    >
      <VStack align='flex-start' spacing={4}>
        <HStack align='flex-start'>
          <Text>Notification</Text>
          <Tooltip
            hasArrow
            bg='teal'
            label={`Schedule report and send by email. \n 
                    Monitor activity instantly. \n`}
          >
            <span><Icon as={MdHelpOutline} boxSize={5} /></span>
          </Tooltip>
        </HStack>
        {user.membership && user.membership.current > 2 ? (
          <>
            <HStack>
              <Text fontSize='sm'>Emails:</Text>
              <Wrap>
                {user.notification && user.notification.emails.map((email, index) => {
                  return (
                    <WrapItem key={`${email}-${index}`}>
                      <Tag rounded='full' size='sm'>
                        <TagLabel>{email}</TagLabel>
                        <TagCloseButton onClick={()=>{
                          selectedIndexRef.current = index;
                          onOpenRemoveAlert();
                        }} />
                      </Tag>
                    </WrapItem>
                )})}
              </Wrap>
            </HStack>
            <HStack w='full'>
              <Input
                value={email}
                size='sm'
                rounded='lg'
                w='full'
                onChange={(e)=> setEmail(e.target.value)}
                placeholder='Add an email address to receive notification'
              />
              <Button
                size='sm'
                variant='ghost'
                onClick={addEmail}
              >
                Add
              </Button>
            </HStack>

            <CheckboxGroup
              value={types as string[]}
            >
              <HStack>
                <Text fontSize='sm'>Types:</Text>
                <>
                  {[NotificationType.MONTHLY, 
                    NotificationType.WEEKLY, 
                    NotificationType.DAILY, 
                    NotificationType.INSTANT
                  ].map((type, index)=>{
                    return (
                      <Checkbox
                        value={type}
                        onChange={()=>setSelectedTypes(type)}
                        key={`${type}-${index}`}
                        size='sm'
                      >
                        {type}
                      </Checkbox>
                  )})} 
                </>
              </HStack>
            </CheckboxGroup>
          </>
        ):(
          <Text fontSize='sm' color='teal'>
            Upgrade to professional plan to enable notification.
          </Text>
        )}
      </VStack>

      <AlertDialog
        isOpen={isOpenRemoveAlert}
        leastDestructiveRef={cancelRef}
        onClose={onCloseRemoveAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete question?
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can not undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button 
                ref={cancelRef} 
                onClick={onCloseRemoveAlert}
                rounded={'full'}
                px={6}
              >
                Cancel
              </Button>
              <Button 
                colorScheme='red' 
                rounded={'full'}
                px={6}
                onClick={()=>removeEmail(selectedIndexRef.current)} 
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  )
}

export default Notification
