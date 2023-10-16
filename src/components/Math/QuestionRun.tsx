import { 
  HendrycksConcept,
  MathConcept, 
  QuestionCategory, 
  QuestionLevel, 
  QuestionRunMode, 
  QuestionSet as LocalQuestionSet,
  QuestionSource,
  QuestionType 
} from "@/types/types";
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
  ModalOverlay, 
  Radio, 
  RadioGroup, 
  SkeletonText, 
  Spacer, 
  Spinner, 
  Stack, 
  Tag, 
  Text, 
  Tooltip, 
  useBoolean, 
  useDisclosure, 
  useToast, 
  VStack, 
  Wrap,
  WrapItem
} from "@chakra-ui/react";
import { Fragment, useContext, useEffect, useLayoutEffect, useRef, useState } from "react"
import { MdBookmarkBorder, MdClose, MdOutlineArticle, MdOutlineDelete, MdQuestionMark, MdThumbDownOffAlt } from "react-icons/md";
import Latex from "react-latex";
import SharedComponents from "../Common/SharedComponents";
import Result from "./Result";
import { BadQuestionSet, NotificationType, QuestionSet, Statistic, Test } from "@/models";
import { InitStatistic, addStatisticData } from "@/types/statistic";
import { addMyMathQuestion, generateQuestionSet, getQuestionAnswer, getQuestionsFromDataset, saveTest } from "@/types/questions";
import Timer from "../Common/Timer";
import { sesSendEmail } from "@/types/utils";
import { DataStore } from "aws-amplify";
import { InlineMath } from "react-katex";
import { Target } from "../Common/Icons";

interface QuestionRunProps {
  source: QuestionSource
  category: QuestionCategory
  type: QuestionType
  level: QuestionLevel
  concepts: (MathConcept|HendrycksConcept)[]
  initMaxNum?: number
  mode: QuestionRunMode
  onClose: ()=>void
  initialTest?: Test
}

const cacheNumber = 3;
const defaultNumber = 10

function QuestionRun({ source, category, type, level, concepts, mode, initMaxNum = defaultNumber, onClose, initialTest }: QuestionRunProps) {
  const isTest = mode === QuestionRunMode.Test;
  const isCompetition = source === QuestionSource.Competition;
  const isReview = mode === QuestionRunMode.Review;
  const isSavedQuestions = source === QuestionSource.SavedQuestions;
  const lastIndexRef = useRef(0);
  const currentIndexRef = useRef(0);
  const [ maxNum, setMaxNum ] = useState(initMaxNum);
  const [ currentIndex, setCurrentIndex ] = useState(0);
  const questionSetsRef = useRef<LocalQuestionSet[]>([]);

  const [ currentQuestionSet, setCurrentQuestionSet ] = useState<LocalQuestionSet>();

  // value is the user selected answer
  const [ value, setValue ] = useState('');

  // questionSets is used to list the questions on right
  const [ questionSets, setQuestionSets ] = useState<LocalQuestionSet[]>([]);

  // fetchingStatus is used to detect new set and resume from waiting status
  const [ fetchingStatus, setFetchingStatus ] = useBoolean(false);

  // how many fetching is running, used to avoid querying too much.
  const addingQuestionCountRef = useRef(0);

  // store the saved question sets state
  const savedQuestionSetsRef = useRef<QuestionSet[]>(); 

  const [ shouldShowWorkout, setShouldShowWorkout ] = useBoolean(false);
  // const [ result, setResult ] = useState<{ total: number, correct: number }>();
  const [ isSubmitted, setIsSubmitted ] = useState(false);
  const { dataStoreUser, setDataStoreUser, setIsProcessing, apiName } = useContext(SharedComponents);
  const [ isChallenging, setIsChallenging ] = useState(false);
  const [ timerStopped, setTimeStopped ] = useState(false);
  const [ duration, setDuration ] = useState(initialTest?.duration || 0);
  const testRef = useRef(initialTest);
  const cancelRef = useRef(null);
  const toast = useToast();

  const { 
    isOpen: isOpenResultModal, 
    onOpen: onOpenResultModal, 
    onClose: onCloseResultModal
  } = useDisclosure();

  const { 
    isOpen: isOpenAlert, 
    onOpen: onOpenAlert, 
    onClose: onCloseAlert 
  } = useDisclosure();

  const { 
    isOpen: isOpenDeleteAlert, 
    onOpen: onOpenDeleteAlert, 
    onClose: onCloseDeleteAlert 
  } = useDisclosure();

  const { 
    isOpen: isOpenExitAlert, 
    onOpen: onOpenExitAlert, 
    onClose: onCloseExitAlert 
  } = useDisclosure();

  useEffect(() => {
    if (isReview && initialTest) {
      questionSetsRef.current = [...initialTest.questionSets] as LocalQuestionSet[];
      lastIndexRef.current = maxNum - 1;
      setQuestionSets([...initialTest.questionSets]);
      setCurrentQuestionSet({...initialTest.questionSets[0]});
      setValue(initialTest.questionSets[0].selected);
      setTimeStopped(true);
      return;
    }

    if (isTest) {
      testRef.current = new Test({
        category: QuestionCategory.Math,
        dateTime: (new Date()).toISOString(),
        total: 0,
        wrong: 0,
        correct: 0,
        source: source,
        questionSets: []
      });
    }

    if (source === QuestionSource.SavedQuestions) {
      addSavedQuestionSets();
      return;
    }

    if (
      source.includes('ChatGPT') ||
      source === QuestionSource.Hendrycks    
    ) {
      addGeneratedQuestionSets(cacheNumber);
      return;
    }

    getAndSetDatasetQuestions(maxNum);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(() => {
    if (!currentQuestionSet && questionSetsRef.current[currentIndexRef.current]) {
      setCurrentQuestionSet(questionSetsRef.current[currentIndexRef.current]);
    }
    if (questionSets.length < lastIndexRef.current + 1) {
      setQuestionSets(questionSetsRef.current.slice(0, lastIndexRef.current + 1));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[fetchingStatus]);

  const addSavedQuestionSets = async () => {
    const allSavedQuestionSets = await DataStore.query(QuestionSet);
    
    if (allSavedQuestionSets.length === 0) {
      onClose();
      toast({
        description: `No questions, please add some questions`,
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
    }

    savedQuestionSetsRef.current = allSavedQuestionSets.sort((a, b) => a.createdAt! < b.createdAt! ? 1 : -1);
    
    for (const qs of savedQuestionSetsRef.current) {
      const localQS: LocalQuestionSet = {
        ...qs,
        selected: '',
        isBad: false,
        isTarget: false,
        isMarked: false,
        options: qs.options!,
        workout: qs.workout?? ''
      }

      questionSetsRef.current = [
        ...questionSetsRef.current,
        localQS
      ];
    }

    lastIndexRef.current = savedQuestionSetsRef.current.length - 1;
    setQuestionSets(questionSetsRef.current);
    setCurrentQuestionSet(questionSetsRef.current[0]);
    setMaxNum(savedQuestionSetsRef.current.length);
  }

  const getAndSetDatasetQuestions = async (num: number, concept?: HendrycksConcept) => {
    const questionSets = await getQuestionsFromDataset(apiName, source, num, level, concept);
    
    if (questionSets.length === 0) {
      onClose();
      toast({
        description: `Failed to generate questions, please try again later.`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      }); 
    }

    questionSetsRef.current = questionSets;
    lastIndexRef.current = maxNum - 1;
    setQuestionSets(questionSets);
    setCurrentQuestionSet(questionSets[0]);
  }

  const addGeneratedQuestionSets = async (num: number) => {
    addingQuestionCountRef.current += num;

    let questionSet: LocalQuestionSet | undefined;

    for (let i = 0; i < num; i++) {
      const c = concepts[Math.floor(Math.random() * concepts.length)] as MathConcept;
      let tryCount = 0;
      do {
        try {
          tryCount++;
          questionSet = source.includes('ChatGPT') ? 
            await generateQuestionSet(apiName, c, category, type, level, source) :
            (await getQuestionsFromDataset(apiName, source, 1, level, c))[0]
        } catch (error) {
          console.error(`${tryCount} try failed: ${error}`);
        }
      } while (!questionSet && tryCount < 3)

      addingQuestionCountRef.current -= 1;

      if (!questionSet) {
        if (
          addingQuestionCountRef.current === 0 &&
          questionSetsRef.current.length === 0
        ){
          onClose();
          toast({
            description: `Failed to generate questions, please try again later.`,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top'
          });
          return;
        }
        
        continue;
      }

      questionSetsRef.current = [...questionSetsRef.current, questionSet];
      setFetchingStatus.toggle();
    }

    if (
      !questionSet && 
      currentIndexRef.current > 0 &&
      questionSets.length === questionSetsRef.current.length &&
      addingQuestionCountRef.current === 0
    ) {
      currentIndexRef.current -= 1;
      lastIndexRef.current -= 1;
      setCurrentIndex(currentIndexRef.current);
      setQuestionSets(questionSetsRef.current.slice(0, lastIndexRef.current + 1));
      setCurrentQuestionSet(questionSetsRef.current[currentIndexRef.current]);
      setValue(questionSetsRef.current[currentIndexRef.current].selected);

      toast({
        description: `Failed to generate question, please try again later.`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
    }

  }

  const setSelectedValue = (value: string) => {
    setValue(value);
    questionSetsRef.current[currentIndexRef.current].selected = value;
  }

  const nextButtonClickedHandler = async () => {
    if (currentIndexRef.current + 1 >= maxNum) return;

    setShouldShowWorkout.off();
    currentIndexRef.current += 1;
    setCurrentIndex(currentIndexRef.current);
    setValue(
      questionSetsRef.current[currentIndexRef.current] ?
      questionSetsRef.current[currentIndexRef.current].selected : ''
    );

    if (currentIndexRef.current > lastIndexRef.current && !isSubmitted) {
      lastIndexRef.current += 1;

      if(questionSetsRef.current.length + addingQuestionCountRef.current < maxNum) {
        addGeneratedQuestionSets(1);
      }
    }

    setQuestionSets(questionSetsRef.current.slice(0, lastIndexRef.current + 1));

    if (!questionSetsRef.current[currentIndexRef.current]) {
      setCurrentQuestionSet(undefined);
      return;
    }

    setCurrentQuestionSet(questionSetsRef.current[currentIndexRef.current]);
  }

  const questionSetClickedHandler = (index: number) => {
    setShouldShowWorkout.off();
    setCurrentIndex(index);
    currentIndexRef.current = index;
    setValue(questionSetsRef.current[index].selected);
    setCurrentQuestionSet(questionSetsRef.current[currentIndexRef.current]);
  }

  const submitButtonClickedHandler = async () => {
    if (!dataStoreUser) return;
    onCloseAlert();
    setTimeStopped(true);

    let correct = 0;
    for (let i = 0; i <= lastIndexRef.current; i++) {
      if (questionSetsRef.current[i].selected === questionSetsRef.current[i].answer) {
        correct += 1;
      }
    }

    const statistic: Statistic = {
      ...InitStatistic,
      mathCorrect: correct,
      mathWrong: lastIndexRef.current + 1 - correct,
      mathExam: isTest ? 1 : 0
    };

    setDataStoreUser(await addStatisticData(statistic, dataStoreUser.id));

    lastIndexRef.current = questionSets.length - 1;
    setIsSubmitted(true);
    onOpenResultModal();

    // save test
    if (isTest) {
      const returnMessage = await saveTest(
        testRef.current!, 
        duration, 
        questionSetsRef.current.slice(0, questionSets.length),
        dataStoreUser!
      );

      if (returnMessage) {
        toast({
          description: returnMessage,
          status: 'warning',
          duration: 10000,
          isClosable: true,
          position: 'top'
        });
      }
    }

    // sent notification
    if (
      isTest && 
      dataStoreUser.notification && 
      dataStoreUser.notification.types.includes(NotificationType.INSTANT) &&
      dataStoreUser.notification.emails.length > 0
    ) {
      const message = `${dataStoreUser.username} just finished a math test.
Level: ${level}
Total questions: ${lastIndexRef.current + 1}
Correct: ${correct} (${(100 * correct / (lastIndexRef.current + 1)).toFixed(0) + '%'})
      `
      sesSendEmail(
        dataStoreUser.notification.emails as string[], 
        `${process.env.NEXT_PUBLIC_APP_NAME} instant notification`, 
        message, 
        'notification@studywithai.pro'
      );
    }
  }

  const getQuestionColor = (q: LocalQuestionSet, index: number) => {
    const isCurrent = index === currentIndexRef.current;

    if (!(isSubmitted || isReview)) {
      if (q.isMarked) return 'yellow';
      if (!isCurrent) return 'gray';
      if (isCurrent) return 'teal';
    } else {
      if (q.answer !== q.selected) return 'red';
      if (q.isMarked) return 'yellow';
    }

    return 'teal';
  }

  const targetButtonClickedHandler = async () => {
    if (!currentQuestionSet) return;
    try {
      const returnedMessage =await addMyMathQuestion(
        dataStoreUser!,
        currentQuestionSet, 
        testRef.current?.id, 
        currentIndexRef.current
      );

      if (returnedMessage) {
        toast({
          description: returnedMessage,
          status: 'warning',
          duration: 10000,
          isClosable: true,
          position: 'top'
        });
        return;
      }
      
      questionSetsRef.current[currentIndexRef.current] = {
        ...questionSetsRef.current[currentIndexRef.current],
        isTarget: !questionSetsRef.current[currentIndexRef.current].isTarget
      }
      setCurrentQuestionSet({
        ...currentQuestionSet,
        isTarget: questionSetsRef.current[currentIndexRef.current].isTarget
      });
      
      toast({
        description: `Question is added successfully`,
        status: 'success',
        duration: 3000,
        isClosable: true
      });   
    } catch (error) {
      console.error(error);
      toast({
        description: `Failed to add the question: ${error}`,
        status: 'error',
        duration: 10000,
        isClosable: true,
        position: 'top'
      });   
    }
  }

  const markQuestionButtonClickedHandler = () => {
    if (!currentQuestionSet) return;
    const q = {...questionSetsRef.current[currentIndexRef.current]};
    q.isMarked = !q.isMarked;
    questionSetsRef.current[currentIndexRef.current] = q;
    setQuestionSets(questionSetsRef.current.slice(0, lastIndexRef.current + 1));
    setCurrentQuestionSet({
      ...currentQuestionSet,
      isMarked: q.isMarked
    });
  }

  const badButtonClickedHandler = () => {
    if (!currentQuestionSet) return;
    const q = {...questionSetsRef.current[currentIndexRef.current]};
    q.isBad = !q.isBad;
    questionSetsRef.current[currentIndexRef.current] = q;
    setCurrentQuestionSet({
      ...currentQuestionSet,
      isBad: q.isBad
    });

    // save bad question set
    const badQuestionSet = new BadQuestionSet({
      ...q,
      source: source
    });
    DataStore.save(badQuestionSet);
  }

  const closeButtonClickedHandler = async () => {
    setIsProcessing(true);
    if (isReview) {
      const returnMessage = await saveTest(
        testRef.current!, 
        duration, 
        questionSetsRef.current.slice(0, questionSets.length),
        dataStoreUser!
      );

      if (returnMessage) {
        toast({
          description: returnMessage,
          status: 'warning',
          duration: 10000,
          isClosable: true,
          position: 'top'
        });
      }
    }

    if (!isSavedQuestions) { // Saved question doesn't consume quota

      const statistic: Statistic = {
        ...InitStatistic,
        mathRequest: Number(maxNum)
      }

      setDataStoreUser(await addStatisticData(statistic, dataStoreUser!.id));
    }

    onClose();
    setIsProcessing(false);
  }
  

  const challengeButtonClickedHandler = async () => {
    if (!currentQuestionSet) return;

    setIsChallenging(true);

    let questionString = currentQuestionSet.question; // + ` Options: `;
    // for (let i = 0; i < currentQuestionSet.options.length; i++) {
    //   questionString += `${String.fromCharCode(65 + i)}: ${currentQuestionSet.options[i]}`;
    // }

    const newAnswer = await getQuestionAnswer(apiName, questionString, source);
    if (!newAnswer) {
      toast({
        description: `Failed to generate answer, please try again later.`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
    } else {
      setCurrentQuestionSet({
        ...currentQuestionSet,
        workout: newAnswer
      });
    }
    setIsChallenging(false);
  }

  const deleteButtonClickedHandler = async () => {
    if (!savedQuestionSetsRef.current || savedQuestionSetsRef.current.length === 0) {
      return;
    }

    try {
      const {testId, indexInTest} = savedQuestionSetsRef.current[currentIndexRef.current];
      await DataStore.delete(savedQuestionSetsRef.current[currentIndexRef.current]);

      if (testId) {
        const test = await DataStore.query(Test, testId);
        if (test) {
          let qs = [...test.questionSets];
          qs[indexInTest!] = {
            ...qs[indexInTest!],
            isTarget: false
          };

          DataStore.save(Test.copyOf(test, updated => {
            updated.questionSets = qs;
          }));
        }
      }
      
      savedQuestionSetsRef.current.splice(currentIndexRef.current, 1);
      questionSetsRef.current.splice(currentIndexRef.current, 1);

      lastIndexRef.current -= 1;
      if (lastIndexRef.current < 0) {
        onClose();
        toast({
          description: `No questions`,
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: 'top'
        });
      }

      if (currentIndexRef.current > lastIndexRef.current) {
        currentIndexRef.current = lastIndexRef.current;
      }

      setQuestionSets(questionSetsRef.current);
      setCurrentQuestionSet(questionSetsRef.current[currentIndexRef.current]);

      onCloseDeleteAlert();
    } catch (error) {
      console.error(`Failed to delete the question: ${error}`);
      toast({
        description: `Failed to delete the question, please try again later.`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });  
    }
  }
  
  // For wrap auto scroll 
  const wrapRef = useRef<HTMLDivElement>(null);

  const questionsWrap = questionSets &&
    questionSets.map((questionSet, index) => {
      return (
        <WrapItem key={`questionSet-${index}`}>
          {index === currentIndexRef.current || (questionSets[index].isMarked && !isSubmitted) ? (
            <Button 
              variant='solid'
              size='sm'
              w='35px' h='35px'
              colorScheme={getQuestionColor(questionSet, index)}
              isDisabled={isCompetition && !isSubmitted}
              onClick={()=>questionSetClickedHandler(index)}
            >
              <Text fontWeight='extrabold'>{index + 1}</Text>
            </Button>
          ) : (
            <Button 
              variant='ghost'
              size='sm'
              onClick={()=>questionSetClickedHandler(index)}
              colorScheme={getQuestionColor(questionSet, index)}
              isDisabled={isCompetition && !isSubmitted}
              w='35px' h='35px'
            >
              <Text fontWeight='extrabold'>{index + 1}</Text>
            </Button>
          )}
        </WrapItem>
      )
    });

  useLayoutEffect(() => {
    const container = wrapRef.current;
    if (container)
    container.scrollTop = container.scrollHeight;
  }, [questionSets.length]);
  ////

  return (
    <>
      <IconButton
        rounded='full'
        variant='ghost'
        aria-label='Close'
        icon={<Icon as={MdClose} boxSize={6} />}
        onClick={isTest && !isSubmitted ? onOpenExitAlert : closeButtonClickedHandler}
        zIndex={100}
        position='fixed'
        top={2} right={2}
      />

      {questionSetsRef.current.length < 1 ? (
        <Stack h='70vh'>
          <Spacer />
          <Center>
            <VStack>
              <Spinner size='xl'/>
              <Text fontSize='lg'>AI is generating questions</Text>
              <Text fontSize='lg'>It may take a while, please wait...</Text>
            </VStack>
          </Center>
          <Spacer />
        </Stack>
      ) : (
        <>
           <VStack 
            maxW='2xl'
            mt={20} mx='auto'
            align='flex-start'
            spacing={4}
          >
            <HStack w='full'>
              <Text fontSize='sm'>{currentQuestionSet ? currentQuestionSet.level : level}</Text>
              <Tag 
                rounded='full' 
                fontSize='sm'
                colorScheme={mode === QuestionRunMode.Test ? 'red' : 'teal'}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </Tag>
              {(isReview || isSubmitted) &&
                <Tooltip label='Show result' hasArrow>
                  <IconButton
                    rounded='full'
                    variant='ghost'
                    aria-label='Show report'
                    colorScheme='teal'
                    size='sm'
                    w='35px' h='35px'
                    icon={<Icon as={MdOutlineArticle} boxSize={6} />}
                    onClick={onOpenResultModal}
                  />
                </Tooltip>
              }

              <Spacer />
              {(isTest || isReview) && <Timer isStopped={timerStopped} duration={duration} setDuration={setDuration} />}
            </HStack>
            
            <HStack 
              spacing={4} 
              minH='30vh'
              w='full' 
              align='flex-start' 
              alignItems='stretch'
            >
              <VStack 
                align='flex-start' 
                spacing={2} 
                w='full'
                pe={4}
              >
                <HStack w='full'>
                  <Text fontSize='lg' as='b' >
                    Question {currentIndex + 1}
                  </Text>
                  {currentQuestionSet && currentQuestionSet.concept && 
                    <Tag rounded='full' fontSize='xs'>{currentQuestionSet.concept.charAt(0).toUpperCase() + currentQuestionSet.concept.slice(1)}</Tag>
                  }
                  <Spacer />
                  {isSavedQuestions && !isReview ? (
                    <>
                      <Tooltip label='Delete from my questions' hasArrow>
                        <IconButton
                          rounded='full'
                          variant='ghost'
                          aria-label='Delete from my questions'
                          colorScheme='red'
                          size='sm'
                          w='35px' h='35px'
                          icon={<Icon as={MdOutlineDelete} boxSize={6} />}
                          onClick={onOpenDeleteAlert}
                        />
                      </Tooltip>
                    </>
                  ) : (
                    <>
                      <Tooltip hasArrow label={
                          dataStoreUser!.membership!.current < 2 ?
                          'The feature is not available' : 'Save the question'
                        }
                      >
                        <IconButton
                          rounded='full'
                          variant={
                            currentQuestionSet && currentQuestionSet.isTarget ? 'solid' : 'ghost'
                          }
                          aria-label='Add to my questions'
                          colorScheme='teal'
                          size='sm'
                          w='35px' h='35px'
                          icon={<Icon as={Target} boxSize={6} />}
                          onClick={targetButtonClickedHandler}
                          isDisabled={
                            !currentQuestionSet || 
                            dataStoreUser!.membership!.current < 2 || 
                            currentQuestionSet.isTarget
                          }
                        />
                      </Tooltip>

                      <Tooltip
                        hasArrow
                        label={
                          currentQuestionSet && currentQuestionSet.isMarked ?
                          'Remove the mark' : 'Mark the question'
                        }
                      >
                        <IconButton
                          rounded='full'
                          variant={
                            currentQuestionSet && currentQuestionSet.isMarked ? 'solid' : 'ghost'
                          }
                          aria-label='Mark the question'
                          colorScheme='yellow'
                          size='sm'
                          w='35px' h='35px'
                          icon={<Icon as={MdBookmarkBorder} boxSize={6} />}
                          onClick={markQuestionButtonClickedHandler}
                          isDisabled={
                            !currentQuestionSet || 
                            isReview || isSubmitted
                          }
                        />
                      </Tooltip>

                      {(source.includes('ChatGPT') || source === QuestionSource.Hendrycks) &&
                        dataStoreUser!.membership!.current > 2 &&
                        <Tooltip
                          hasArrow
                          label='Report bad question'
                        >
                          <IconButton
                            rounded='full'
                            variant={
                              currentQuestionSet && currentQuestionSet.isBad ? 'solid' : 'ghost'
                            }
                            aria-label='Bac question'
                            colorScheme='yellow'
                            size='sm'
                            w='35px' h='35px'
                            icon={<Icon as={MdThumbDownOffAlt} boxSize={6} />}
                            onClick={badButtonClickedHandler}
                            isDisabled={!currentQuestionSet || currentQuestionSet.isBad}
                          />
                        </Tooltip>
                      }
                    </>
                  )}
                  
                </HStack>
                {currentQuestionSet ? (
                  <>
                    <Text 
                      as={
                        currentQuestionSet.level.includes('Level') ?
                        Latex : Text
                      }
                      textAlign='justify'
                      overflow='auto'
                    >
                      {currentQuestionSet.question}
                    </Text>
                    <RadioGroup onChange={setSelectedValue} value={value}>
                      <VStack align='flex-start' >
                        {
                          currentQuestionSet.options.map((option, index) => {
                            return (
                              <Radio 
                                value={String.fromCharCode(65 + index)} 
                                key={index}
                                isDisabled={isSubmitted || isReview}
                              >
                                {!option.includes('$') && option.includes('\\') ?
                                  <HStack>
                                    <Text>{String.fromCharCode(65 + index)}: </Text>
                                    <InlineMath>{option}</InlineMath>
                                  </HStack> :
                                  <Latex>{`${String.fromCharCode(65 + index)}: ${option}`}</Latex> 
                                }
                              </Radio>
                            )
                          })
                        }
                      </VStack>
                    </RadioGroup>
                  </>
                ) : (
                  <VStack w='full' minH='20vh'>
                    <Spacer />
                    <Center w='full'>
                      <Spinner size='xl'/>
                    </Center>
                    <Text>Loading, please wait...</Text>
                    <Spacer />
                  </VStack>
                )}

                <Spacer />

                <Button
                  onClick={nextButtonClickedHandler}
                  isDisabled={
                    (!value && !isSavedQuestions) || !currentQuestionSet || 
                    (currentIndexRef.current >= lastIndexRef.current && (isSubmitted || isSavedQuestions)) ||
                    currentIndexRef.current + 1 >= maxNum
                  }
                >
                  Next
                </Button>
              </VStack>

              <Center minH='full'>
                <Divider orientation='vertical' />
              </Center>

              <VStack 
                minW='110px' 
                maxW='110px' 
                align='flex-end'
                minH='full'
                maxH='50vh'
              >
                <IconButton
                  rounded='full'
                  aria-label='Show answer'
                  size='sm'
                  w='35px' h='35px'
                  icon={<Icon as={MdQuestionMark} boxSize={6} />}
                  onClick={()=>setShouldShowWorkout.toggle()}
                  isDisabled={
                    (isTest && !isSubmitted) ||
                    (isCompetition && !isSubmitted) ||
                    !currentQuestionSet
                  }
                />
                <Wrap 
                  align='flex-end' 
                  mt={8} spacing='2px' flex={1}  
                  overflowY='scroll'
                  scrollBehavior='smooth'
                  ref={wrapRef}
                >
                  {questionsWrap}
                  <Spacer />
                </Wrap>
                <Button
                  onClick={onOpenAlert}
                  isDisabled={
                    questionSets.length === 0 ||
                    isSubmitted || isReview
                    // addingQuestionCountRef.current !== 0
                  }
                >
                  Submit
                </Button>
              </VStack>
            </HStack>

            <Box as={Collapse} in={shouldShowWorkout} w='full'>
              <Divider />
              <HStack alignItems='center' mt={4} w='full'>
                <Text>
                  {currentQuestionSet && `Answer: ${currentQuestionSet.answer??''}`}
                </Text>
                <Spacer />
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={challengeButtonClickedHandler}
                >
                  Wrong answer? Challenge AI
                </Button>
              </HStack>
              {isChallenging ? (
                <>
                  <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
                </>
              ) : (
                <>
                  {currentQuestionSet && currentQuestionSet.workout.split("\n").map((line, index) => (
                    <Fragment key={index}>
                      <Latex>{line}</Latex>
                      {index !== currentQuestionSet.workout.split("\n").length - 1 && <br />}
                    </Fragment>
                  ))}
                </>
              )}
            </Box>

            <Modal
              isOpen={isOpenResultModal} 
              onClose={onCloseResultModal}
              scrollBehavior='inside'
            >
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                    <Result questionSets={questionSets}/>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
              </ModalContent>
            </Modal>

          </VStack>

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
                  You will not be allowed to change the answer.
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

          <AlertDialog
            isOpen={isOpenDeleteAlert}
            leastDestructiveRef={cancelRef}
            onClose={onCloseDeleteAlert}
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
                    onClick={onCloseDeleteAlert}
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

          <AlertDialog
            isOpen={isOpenExitAlert}
            leastDestructiveRef={cancelRef}
            onClose={onCloseExitAlert}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                  Exit?
                </AlertDialogHeader>

                <AlertDialogBody>
                  You have not submitted your answers. Are you sure you want to exit?
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button 
                    ref={cancelRef} 
                    onClick={onCloseExitAlert}
                    rounded={'full'}
                    px={6}
                  >
                    Cancel
                  </Button>
                  <Button 
                    colorScheme='red' 
                    rounded={'full'}
                    px={6}
                    onClick={closeButtonClickedHandler} 
                    ml={3}
                  >
                    Exit
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>

        </>
      )}
    </>
  )
}

export default QuestionRun
