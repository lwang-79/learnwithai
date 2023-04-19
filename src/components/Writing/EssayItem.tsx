import { Essay } from "@/models"
import { EssayType } from "@/types/types"
import { 
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  HStack, 
  Icon,
  IconButton, 
  Text, 
  useDisclosure, 
  useToast 
} from "@chakra-ui/react"
import { DataStore } from "aws-amplify"
import { useRef } from "react"
import { MdClose } from "react-icons/md"

interface EssayItem {
  essay: Essay
  refreshList: ()=>void
  selectCallback: (essay: Essay) => void
}

function EssayItem({ essay, refreshList, selectCallback }: EssayItem) {
  const { 
    isOpen: isOpenAlert, 
    onOpen: onOpenAlert, 
    onClose: onCloseAlert
  } = useDisclosure();

  const cancelRef = useRef(null);

  const toast = useToast();

  const deleteButtonClickedHandler = async () => {
    onCloseAlert();
    await DataStore.delete(essay);
    toast({
      description: `Essay has been deleted successfully`,
      status: 'success',
      duration: 5000,
      isClosable: true
    });
    refreshList();
  }

  return (
    <>
      <HStack align='flex-end' w='full' >
        <Text whiteSpace='nowrap' onClick={()=>selectCallback(essay)}>{essay.DateTime.slice(0,10)}</Text>
        <Text whiteSpace='nowrap' onClick={()=>selectCallback(essay)}>{essay.level}</Text>
        <Text color='teal' whiteSpace='nowrap' onClick={()=>selectCallback(essay)}>{essay.type === EssayType.Narrative ? 'Creative Writing': 'Persuasive Essay'}</Text>
        <Text 
          fontSize='sm'
          whiteSpace='nowrap' 
          overflow='hidden' 
          textOverflow='ellipsis'
          onClick={()=>selectCallback(essay)}
        >
          {essay.text}
        </Text>
        <IconButton
          rounded='full'
          variant='ghost'
          size='xs'
          aria-label='Before'
          icon={<Icon as={MdClose} boxSize={4} />}
          onClick={onOpenAlert}
        />
      </HStack>
      <AlertDialog
        isOpen={isOpenAlert}
        leastDestructiveRef={cancelRef}
        onClose={onCloseAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete essay
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can not undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef} 
                onClick={onCloseAlert}
                rounded={'full'}
                px={6}
              >
                Cancel
              </Button>
              <Button 
                colorScheme='red' 
                rounded={'full'}
                px={6}
                onClick={deleteButtonClickedHandler} 
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default EssayItem
