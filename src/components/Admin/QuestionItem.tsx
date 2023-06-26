import { BadQuestionSet } from "@/models"
import { 
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Card,
  CardBody,
  HStack, 
  Spacer, 
  Tag, 
  useDisclosure, 
  useToast, 
  VStack
} from "@chakra-ui/react"
import { DataStore } from "aws-amplify"
import { useRef } from "react"
import Latex from "react-latex"

interface QuestionItemProps {
  question: BadQuestionSet
}

function QuestionItem({ question }: QuestionItemProps) {
  const { 
    isOpen: isOpenAlert, 
    onOpen: onOpenAlert, 
    onClose: onCloseAlert
  } = useDisclosure();

  const cancelRef = useRef(null);

  const toast = useToast();

  const deleteButtonClickedHandler = async () => {
    onCloseAlert();
    await DataStore.delete(question);
    toast({
      description: `Question has been deleted successfully`,
      status: 'success',
      duration: 5000,
      isClosable: true
    });
  }

  return (
    <Card w='full'>
      <CardBody>
        <VStack align='flex-start'>
          <HStack w='full'>
            <Tag colorScheme='teal'>{question.source}</Tag>
            <Tag colorScheme='teal'>{question.level}</Tag>
            <Tag colorScheme='teal'>{question.concept}</Tag>
            <Spacer />
            <Button
              size='sm'
              colorScheme='red'
              variant='ghost'
              onClick={onOpenAlert}
            > 
              Delete 
            </Button>
          </HStack>
          <HStack>
            <Latex>{question.question}</Latex>
          </HStack>
          <HStack>
            {question.options?.map((option, index) => (
              <HStack
                key={`${option}-${index}`}
                spacing={0}
              >
                <Tag
                  rounded='full'
                  colorScheme={String.fromCharCode(65 + index) === question.answer ? 'teal' : 'black'}
                >
                  {String.fromCharCode(65 + index)}
                </Tag>
                <Latex>
                  {`: ${option}`}
                </Latex>
              </HStack>
            ))}
          </HStack>
          <AlertDialog
            isOpen={isOpenAlert}
            leastDestructiveRef={cancelRef}
            onClose={onCloseAlert}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                  Delete question
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
        </VStack>

      </CardBody>
    </Card>
  )
}

export default QuestionItem
