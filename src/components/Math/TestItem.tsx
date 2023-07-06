import { Test } from "@/models"
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Card, CardBody, Icon, IconButton, Text, useDisclosure, useToast } from "@chakra-ui/react"
import { DataStore } from "aws-amplify";
import { useRef } from "react";
import { MdClose } from "react-icons/md"

interface TestItemProps {
  test: Test
  refreshList: ()=>void
  selectCallback: (test: Test) => void
}

function TestItem({ test, refreshList, selectCallback }: TestItemProps) {
  const { 
    isOpen: isOpenAlert, 
    onOpen: onOpenAlert, 
    onClose: onCloseAlert
  } = useDisclosure();

  const cancelRef = useRef(null);

  const toast = useToast();

  const deleteButtonClickedHandler = async () => {
    onCloseAlert();
    await DataStore.delete(test);
    toast({
      description: `Test has been deleted successfully`,
      status: 'success',
      duration: 5000,
      isClosable: true
    });
    refreshList();
  }

  return (
    <>
      <Card shadow='xs' position='relative'>
        <CardBody p={4} onClick={()=>selectCallback(test)}>
          <Text fontSize='xs'>{(new Date(test.dateTime)).toLocaleString('sv-SE')}</Text>
          <Text fontSize='sm'>Score: {test.correct} / {test.total}</Text>
        </CardBody>
        <IconButton
          rounded='full'
          variant='ghost'
          size='xs'
          aria-label='Before'
          icon={<Icon as={MdClose} boxSize={4} />}
          position='absolute'
          right='2px'
          bottom='2px'
          onClick={onOpenAlert}
        />
      </Card>
      <AlertDialog
        isOpen={isOpenAlert}
        leastDestructiveRef={cancelRef}
        onClose={onCloseAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete test?
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

export default TestItem
