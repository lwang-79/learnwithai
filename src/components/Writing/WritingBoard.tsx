import { Essay, NotificationType, Statistic } from "@/models"
import { APIOperation, EssayTopic, EssayType, QuestionLevel } from "@/types/types"
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
  Modal, 
  ModalBody, 
  ModalCloseButton, 
  ModalContent, 
  ModalFooter, 
  ModalHeader, 
  SkeletonText, 
  Spacer, 
  Spinner, 
  Stack, 
  Tag, 
  Text, 
  Textarea, 
  useDisclosure, 
  useToast, 
  VStack
} from "@chakra-ui/react"
import ResizeTextarea from "react-textarea-autosize";
import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { MdClose } from "react-icons/md"
import { API, DataStore } from "aws-amplify";
import { addStatisticData, InitStatistic } from "@/types/statistic";
import SharedComponents from "../Common/SharedComponents";
import { APIPost, sesSendEmail } from "@/types/utils";

export enum WritingMode {
  Essay = 'essay',
  Narrative = 'narrative'
}

interface WritingBoardProps {
  type: EssayType
  level: QuestionLevel
  topic: EssayTopic
  onClose: ()=>void
  initEssay?: Essay
}

function WritingBoard({ type, level, topic, onClose, initEssay}: WritingBoardProps) {
  const [ essay, setEssay ] = useState<Essay|undefined>(initEssay);
  const [ text, setText ] = useState(initEssay ? initEssay.text : '');
  const [ count, setCount ] = useState(initEssay ? countWords(initEssay.text) : 0);
  const [ mark, setMark ] = useState('');
  const [ prompt, setPrompt ] = useState('');
  const [ isSubmitted, setIsSubmitted ] = useState(initEssay ? true : false);
  const [ shouldShowMark, setShouldShowMark ] = useState(initEssay ? true : false);
  const [ isMarking, setIsMarking ] = useState(false);
  const { dataStoreUser, setDataStoreUser, apiName } = useContext(SharedComponents);

  const cancelRef = useRef(null);

  const toast = useToast();

  const { 
    isOpen: isOpenAlert, 
    onOpen: onOpenAlert, 
    onClose: onCloseAlert 
  } = useDisclosure();

  const { 
    isOpen: isOpenPromptModal, 
    onOpen: onOpenPromptModal, 
    onClose: onClosePromptModal
  } = useDisclosure();

  // generate writing topic
  useEffect(() => {
    if (essay) return;

    const request = {
      body: {
        operation: APIOperation.WritingPrompt,
        type: type,
        level: level,
        topic: topic
      }
    };

    APIPost(apiName, '/', request)
    .then(body => {
      if (!body.data) {
        toast({
          description: `Failed to generate prompt, please try again later.`,
          status: 'error',
          duration: 5000,
          position: 'top',
          isClosable: true
        });
        onClose();
      } else {
        const prompt = body.data as string;

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
    });
  },[apiName, essay, level, onClose, toast, topic, type]);

  useEffect(() => {
    setCount(countWords(text));
  },[text]);


  const markEssay = () => {
    if (!essay) return;
    setShouldShowMark(true);
    setIsMarking(true);

    const request = {
      body: {
        operation: APIOperation.WritingMark,
        level: essay.level,
        type: essay.type,
        prompt: essay.prompt,
        essay: text
      }
    };

    APIPost(apiName, '/', request)
    .then(body => {
      if (!body.data) {
        toast({
          description: `Failed to mark the essay, please try again later.`,
          status: 'error',
          duration: 5000,
          position: 'top',
          isClosable: true
        });
      } else {
        const mark = body.data as string;
        setMark(mark.trim());
      }
      setIsMarking(false);
    });
  }

  const polishWriting = () => {
    if (!essay) return;
    setShouldShowMark(true);
    setIsMarking(true);

    const request = {
      body: {
        operation: APIOperation.WritingPolish,
        level: essay.level,
        type: essay.type,
        prompt: essay.prompt,
        essay: text
      }
    };

    APIPost(apiName, '/', request)
    .then(body => {
      if (!body.data){
        toast({
          description: `Failed to polish the writing, please try again later.`,
          status: 'error',
          duration: 5000,
          position: 'top',
          isClosable: true
        });
      } else {
        const mark = body.data as string;
        setMark(mark.trim());
      }
      setIsMarking(false);
    });
  }

  const generateSample = () => {
    if (!essay) return;
    setShouldShowMark(true);
    setIsMarking(true);

    const request = {
      body: {
        operation: APIOperation.AskAnything,
        prompt: essay.prompt
      }
    };

    APIPost(apiName, '/', request)
    .then(body => {
      if (!body.data) {
        toast({
          description: `Failed to generate a sample, please try again later.`,
          status: 'error',
          duration: 5000,
          position: 'top',
          isClosable: true
        });
      } else {
        const mark = body.data as string;
        setMark(mark.trim());
      }
      setIsMarking(false);
    });
  }


  const submitButtonClickedHandler = async () => {
    if (!essay) return;

    setIsSubmitted(true);

    if (initEssay) {
      DataStore.save(Essay.copyOf(
        initEssay,
        updated => {
          updated.text = text
        }
      ));
    } else {
      if (dataStoreUser!.membership!.current >= 2) {
        DataStore.save(Essay.copyOf(
          essay,
          updated => {
            updated.text = text;
          }
        ));  
      }
    }

    const statistic: Statistic = {
      ...InitStatistic,
      writing: 1,
    };

    setDataStoreUser(await addStatisticData(statistic, dataStoreUser!.id));

    markEssay();
    onCloseAlert();

    if (
      dataStoreUser && 
      dataStoreUser.membership!.current > 2 &&
      dataStoreUser.notification && 
      dataStoreUser.notification.types.includes(NotificationType.INSTANT) &&
      dataStoreUser.notification.emails.length > 0
    ) {
      const message = `${dataStoreUser.username} just finished a writing.
Type: ${type}
Level: ${level}
Prompt: ${essay.prompt}
Total words: ${count}
      `;

      sesSendEmail(dataStoreUser.notification.emails as string[], 'Learn with AI instant notification', message, 'notification@jinpearl.com');
    }
  }

  return (
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

      {essay ? (
        <>
          <VStack
            maxW='5xl'
            mt={20} mx='auto'
            align='flex-start'
            spacing={4}
          >
            <HStack w='full'>
              <Text>{level} {type}</Text>
              {type == EssayType.Persuasive &&
                <Tag variant='solid' rounded='full' colorScheme='teal'>{topic}</Tag>
              }
              <Spacer />
              <Button 
                size='sm'
                variant='ghost'
                isDisabled={isSubmitted}
                onClick={onOpenPromptModal}
              >
                I have my own topic
              </Button>
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
              defaultValue={essay.text}
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
                  <Text mt={4}>AI is working, please wait for a while...</Text>
                  <SkeletonText mt='4' noOfLines={8} spacing='4' skeletonHeight='2' />
                </>
              ) : (
                <>
                  <HStack alignItems='center' my={4} w='full'>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={polishWriting}
                    >
                      Polish my writing
                    </Button>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={generateSample}
                    >
                      Generate a sample
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
            <VStack>
              <Spinner size='xl'/>
              <Text fontSize='lg'>AI is generating writing topic for you</Text>
              <Text fontSize='lg'>It may take a while, please wait...</Text>
            </VStack>
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
              You will not be allowed to change your writing again.
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

      <Modal
        isOpen={isOpenPromptModal}
        onClose={onClosePromptModal}
        size='xl'
      >
        <ModalContent>
          <ModalHeader textAlign='center'>
            Bring your own writing topic
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea 
              as={ResizeTextarea}
              placeholder='Paste your topic here'
              minRows={5}
              onChange={(e)=>setPrompt(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={
                ()=>{
                  setEssay(Essay.copyOf(
                    essay!,
                    updated => {
                      updated.prompt = prompt
                    }
                  ));
                  onClosePromptModal();
                }
              }
            >
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default WritingBoard

const countWords = (str: string) => {
  const words = str.match(/\b\w+\b/g);
  return words ? words.length : 0;
}

