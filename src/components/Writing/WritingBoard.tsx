import { Essay } from "@/models"
import { EssayTopic, EssayType, QuestionLevel } from "@/types/types"
import { 
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Center,
  Collapse,
  Divider,
  HStack,
  Icon,
  IconButton, 
  SkeletonText, 
  Spacer, 
  Spinner, 
  Stack, 
  Tag, 
  Text, 
  Textarea, 
  useDisclosure, 
  VStack
} from "@chakra-ui/react"
import ResizeTextarea from "react-textarea-autosize";
import { Fragment, useEffect, useRef, useState } from "react"
import { MdClose } from "react-icons/md"
import Footer from "../Common/Footer";
import { DataStore } from "aws-amplify";

export enum WritingMode {
  Essay = 'essay',
  Narrative = 'narrative'
}

interface WritingBoardProps {
  type: EssayType
  level: QuestionLevel
  topic: EssayTopic
  onClose: ()=>void
}

function WritingBoard({ type, level, topic, onClose}: WritingBoardProps) {
  const [ essay, setEssay ] = useState<Essay>();
  const [ text, setText ] = useState('');
  const [ count, setCount ] = useState(0);
  const [ mark, setMark ] = useState('');
  const [ isSubmitted, setIsSubmitted ] = useState(false);
  const [ shouldShowMark, setShouldShowMark ] = useState(false);
  const [ isMarking, setIsMarking ] = useState(false);
  const cancelRef = useRef(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const { 
    isOpen: isOpenAlert, 
    onOpen: onOpenAlert, 
    onClose: onCloseAlert 
  } = useDisclosure();

  
  useEffect(() => {
    generatePrompt();
  },[]);

  useEffect(() => {
    setCount(countWords(text));
  },[text]);

  const generatePrompt = async () => {
    const response = await fetch('/api/writing/prompt', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: type,
        level: level,
        topic: topic
      }),
    });

    const data = await response.json();
    if (response.status !== 200) {
      throw data.error || new Error(`Request failed with status ${response.status}`);
    }

    console.log(data.result);
    const prompt = data.result as string;

    const essay = new Essay({
      type: type,
      level: level,
      topic: type === EssayType.Persuasive ? topic : '',
      prompt: prompt.trim().replace('Text: ', '').replace('Prompt: ', ''),
      text: '',
      DateTime: (new Date()).toISOString()
    })

    setEssay(essay);
  }

  const markEssay = async () => {
    if (!essay) return;
    setShouldShowMark(true);
    setIsMarking(true);

    const response = await fetch('/api/writing/mark', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: essay.type,
        prompt: essay.prompt,
        essay: text
      }),
    });

    const data = await response.json();
    if (response.status !== 200) {
      throw data.error || new Error(`Request failed with status ${response.status}`);
    }

    console.log(data.result);
    const mark = data.result as string;
    setMark(mark.trim());
    setIsMarking(false);
  }

  const generateSample = async () => {
    if (!essay) return;
    setShouldShowMark(true);
    setIsMarking(true);

    const response = await fetch('/api/anything', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: essay.prompt
      }),
    });

    const data = await response.json();
    if (response.status !== 200) {
      throw data.error || new Error(`Request failed with status ${response.status}`);
    }

    console.log(data.result);
    const mark = data.result as string;
    setMark(mark.trim());
    setIsMarking(false);
  }

  const countWords = (str: string) => {
    const words = str.match(/\b\w+\b/g);
    return words ? words.length : 0;
  }

  const submitButtonClickedHandler = () => {
    if (!essay) return;

    setIsSubmitted(true);

    DataStore.save(Essay.copyOf(
      essay,
      updated => {
        updated.text = text
      }
    ));

    markEssay();
    onCloseAlert();
  }

  return (
    <>
      {essay ? (
        <>
          <IconButton
            rounded='full'
            variant='ghost'
            aria-label='Close'
            icon={<Icon as={MdClose} boxSize={6} />}
            onClick={onClose}
            zIndex={100}
            position='fixed'
            top={2} right={2}
          />
            <VStack
              maxW='5xl'
              mt={20} mx='auto'
              align='flex-start'
              spacing={4}
            >
              <HStack>
                <Text>{level} {type} essay</Text>
                {type == EssayType.Persuasive &&
                  <Tag variant='solid' rounded='full' colorScheme='teal'>{topic}</Tag>
                }
              </HStack>
              <Box>
                {essay && essay.prompt.split("\n").map((line, index) => (
                  <Fragment key={index}>
                    {line}
                    {index !== essay.prompt.split("\n").length - 1 && <br />}
                  </Fragment>
                ))}
              </Box>
              <Divider />
              <Textarea 
                as={ResizeTextarea}
                placeholder='Start to write here'
                minRows={10}
                isDisabled={isSubmitted}
                onChange={(e)=>setText(e.target.value)}
              />
              <HStack w='full' align='flex-start'>
                <Text fontSize='sm'>Words: {count}</Text>
                <Spacer />
                <Button
                  isDisabled={isSubmitted}
                  onClick={onOpenAlert}
                >
                  Submit
                </Button>
              </HStack>

              <Box as={Collapse} in={shouldShowMark} w='full' >
                <Divider />

                {isMarking ? (
                  <>
                    <Text>AI is working, please wait for a while...</Text>
                    <SkeletonText mt='4' noOfLines={8} spacing='4' skeletonHeight='2' />
                  </>
                ) : (
                  <>
                    <HStack alignItems='center' mt={4} w='full'>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={generateSample}
                      >
                        Ask the AI to generate a sample
                      </Button>
                      <Spacer />
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={markEssay}
                      >
                        Need more suggestion? Remark the essay
                      </Button>
                    </HStack>
                    {mark && mark.split("\n").map((line, index) => (
                      <Fragment key={index}>
                        {line}
                        {index !== mark.split("\n").length - 1 && <br />}
                      </Fragment>
                    ))}
                  </>
                )}
              </Box>
              <Box h={20} />
            </VStack>
          </>
        ) : (
        <Stack h='70vh'>
          <Spacer />
          <Center>
            <Spinner size='xl'/>
          </Center>
          <Spacer />
        </Stack>
      )}
      
      <AlertDialog
        isOpen={isOpenAlert}
        leastDestructiveRef={cancelRef}
        onClose={onCloseAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Submit?
            </AlertDialogHeader>

            <AlertDialogBody>
              You will not be allowed to change the essay again.
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
                onClick={submitButtonClickedHandler} 
                ml={3}
              >
                Submit
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default WritingBoard
