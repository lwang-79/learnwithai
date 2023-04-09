import { 
  MathConcept, 
  QuestionCategory, 
  QuestionLevel, 
  QuestionSet as LocalQuestionSet,
  QuestionType 
} from "@/types/types";
import { 
  Box,
  Button, 
  Center, 
  CloseButton, 
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
import { MdBookmarkBorder, MdClose, MdQuestionMark, MdThumbDownOffAlt } from "react-icons/md";
import { SlTarget } from "react-icons/sl";
import SharedComponents from "../Common/SharedComponents";
import Result from "./Result";
import { Statistic, Test } from "@/models";
import { InitStatistic, addStatisticData } from "@/types/statistic";
import { addNewMathQuestions } from "@/types/questions";

export enum QuestionRunMode {
  Practice = 'practice',
  Test = 'test',
  Review = 'review'
}

interface QuestionRunProps {
  category: QuestionCategory
  type: QuestionType
  levels: QuestionLevel[]
  concepts: MathConcept[]
  maxNum?: number
  mode: QuestionRunMode
  onClose: ()=>void
  test?: Test
}

const cacheNumber = 3;
const defaultNumber = 10

function QuestionRun({ category, type, levels, concepts, mode, maxNum = defaultNumber, onClose, test }: QuestionRunProps) {
  const isTest = mode === QuestionRunMode.Test;
  const isReview = mode === QuestionRunMode.Review;
  const lastIndexRef = useRef(0);
  const currentIndexRef = useRef(0);
  const [ currentIndex, setCurrentIndex ] = useState(0);
  const questionSetsRef = useRef<LocalQuestionSet[]>([]);

  const [ currentQuestionSet, setCurrentQuestionSet ] = useState<LocalQuestionSet>();

  // value is the user selected answer
  const [ value, setValue ] = useState('');

  // questionSets is used to list the questions on left
  const [ questionSets, setQuestionSets ] = useState<LocalQuestionSet[]>([]);

  // fetchingStatus is used to detect new set and resume from waiting status
  const [ fetchingStatus, setFetchingStatus ] = useBoolean(false);

  // how many fetching is running, used to avoid querying too much.
  const addingQuestionCountRef = useRef(0);

  const [ shouldShowWorkout, setShouldShowWorkout ] = useBoolean(false);
  const [ result, setResult ] = useState<{ total: number, correct: number }>();
  const [ isSubmitted, setIsSubmitted ] = useState(false);
  const { currentUser, setIsProcessing } = useContext(SharedComponents);
  const [ isChallenging, setIsChallenging ] = useState(false);

  const toast = useToast();

  const { 
    isOpen: isOpenResultModal, 
    onOpen: onOpenResultModal, 
    onClose: onCloseResultModal
  } = useDisclosure();



  useEffect(() => {
    if (isReview && test) {
      questionSetsRef.current = test.questionSets;
      lastIndexRef.current = maxNum;
      setQuestionSets(test.questionSets);
      setCurrentQuestionSet(test.questionSets[0]);
      setValue(test.questionSets[0].selected)
      return;
    }
    AddQuestionSets(cacheNumber);
  },[]);

  useEffect(() => {
    if (!currentQuestionSet && questionSetsRef.current[currentIndexRef.current]) {
      setCurrentQuestionSet(questionSetsRef.current[currentIndexRef.current]);
    }
    if (questionSets.length < lastIndexRef.current + 1) {
      setQuestionSets(questionSetsRef.current.slice(0, lastIndexRef.current + 1));
    }
  },[fetchingStatus]);

  const AddQuestionSets = async (num: number) => {
    addingQuestionCountRef.current += num;

    for (let i = 0; i < num; i++) {
      let questionSet: LocalQuestionSet | undefined;
      let tryCount = 0;
      let err: any;
      do {
        try {
          tryCount++;
          questionSet = await generateQuestionSet();
        } catch (error: any) {
          err = error;
          console.error(`${tryCount} try failed: ${error.message}`);
        }
      } while (!questionSet && tryCount < 3)

      if (!questionSet) {
        if ( err && err.type && err.type === 'insufficient_quota' ) {
          toast({
            title: 'Insufficient quota',
            description: `You OpenAI API key exceeded your current quota, please check your OpenAI plan and billing details. You can also join our membership.`,
            status: 'error',
            duration: 20000,
            isClosable: true,
            position: 'top'
          });    
        }
        return;
      }
      // console.log(questionSet)
      questionSetsRef.current = [...questionSetsRef.current, questionSet];
      setFetchingStatus.toggle();
    }

    addingQuestionCountRef.current -= num;
  }

  const generateQuestionSet = async (): Promise<LocalQuestionSet> => {
    let c = concepts[Math.floor(Math.random() * concepts.length)];
    let l = levels[Math.floor(Math.random() * levels.length)];

    const response = await fetch('/api/math/question', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: category,
        type: type,
        level: l,
        concept: c
      }),
    });

    const data = await response.json();
    if (response.status !== 200) {
      throw data.error || new Error(`Request failed with status ${response.status}`);
    }

    console.log(data.result);
    const questionString = data.result as string;
    if (
      !questionString.includes('Question:') ||
      !questionString.includes('Workout:') ||
      !questionString.includes('Options:') ||
      !questionString.includes('Answer:')
    ) throw new Error('Bad return.');

    // get question
    const question = questionString.split('Workout:')[0].replace('Question:','').trim();

    // get workout
    let regex = /(?<=Workout:).*?(?=Options:)/s;
    let matches = questionString.match(regex);

    if (!matches) throw new Error('No workout.');
    const workout = matches[0];

    // get answer
    const answer = questionString.split("Answer:")[1].trim()[0].toUpperCase();
    if (!['A', 'B', 'C', 'D'].includes(answer)) throw new Error('Answer in wrong format');

    // get options
    regex = /^[A-D]:\s(.+)$/gm;
    matches = questionString.match(regex);

    if (!matches) throw new Error('No options.');

    const options = matches.map(match => match.slice(3));

    const questionSet: LocalQuestionSet = {
      type: QuestionType.MultiChoice,
      category: QuestionCategory.Math,
      level: l,
      concept: c,
      question: question,
      options: options,
      answer: answer,
      selected: '',
      workout: workout,
      isBad: false,
      isTarget: false
    };

    return questionSet;
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

    if (currentIndexRef.current > lastIndexRef.current) {
      console.log(currentIndexRef.current, lastIndexRef.current, questionSetsRef.current.length)
      lastIndexRef.current += 1;
      if(questionSetsRef.current.length + addingQuestionCountRef.current < maxNum) AddQuestionSets(1);
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
    if (!currentUser) return;

    let correct = 0;
    for (let i = 0; i <= lastIndexRef.current; i++) {
      if (questionSetsRef.current[i].selected === questionSetsRef.current[i].answer) {
        correct += 1;
      }
    }

    const statistic: Statistic = {
      ...InitStatistic,
      mathCorrect: correct,
      mathWrong: lastIndexRef.current + 1 - correct
    };

    addStatisticData(statistic, currentUser.id);

    setResult({ total: lastIndexRef.current + 1, correct: correct });
    setIsSubmitted(true);
    onOpenResultModal();
  }

  const getQuestionColor = (q: LocalQuestionSet, index: number) => {
    const isCurrent = index === currentIndexRef.current;

    if (!(isSubmitted || isReview)) {
      if (q.isTarget) return 'yellow';
      if (!isCurrent) return 'gray';
      if (isCurrent) return 'teal';
    }

    if (q.answer === q.selected) return 'teal';
    
    return 'red';
  }

  const targetButtonClickedHandler = () => {
    if (!currentQuestionSet) return;
    questionSetsRef.current[currentIndexRef.current].isTarget = !questionSetsRef.current[currentIndexRef.current].isTarget;
    setCurrentQuestionSet({
      ...currentQuestionSet,
      isTarget: questionSetsRef.current[currentIndexRef.current].isTarget
    });
  }

  const badButtonClickedHandler = () => {
    if (!currentQuestionSet) return;
    questionSetsRef.current[currentIndexRef.current].isBad = !questionSetsRef.current[currentIndexRef.current].isBad;
    setCurrentQuestionSet({
      ...currentQuestionSet,
      isBad: questionSetsRef.current[currentIndexRef.current].isBad
    });
  }

  const closeButtonClickedHandler = async () => {
    setIsProcessing(true);
    if (!isReview) await addNewMathQuestions(currentUser!.id, isTest, questionSetsRef.current);
    onClose();
    setIsProcessing(false);
  }

  const challengeButtonClickedHandler = async () => {
    if (!currentQuestionSet) return;

    setIsChallenging(true);

    let questionString = currentQuestionSet.question + ` Options: `;
    for (let i = 0; i < currentQuestionSet.options.length; i++) {
      questionString += `${String.fromCharCode(65 + i)}: ${currentQuestionSet.options[i]}`;
    }

    const response = await fetch('/api/math/answer', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: questionString,
      }),
    });

    const data = await response.json();
    if (response.status !== 200) {
      throw data.error || new Error(`Request failed with status ${response.status}`);
    }

    setCurrentQuestionSet({
      ...currentQuestionSet,
      workout: data.result
    });
    console.log(data.result);

    setIsChallenging(false);
  }
  
  // For wrap auto scroll 
  const wrapRef = useRef<HTMLDivElement>(null);

  const questionsWrap = questionSets &&
    questionSets.map((questionSet, index) => {
      return (
        <WrapItem key={`questionSet-${index}`}>
          {index === currentIndexRef.current ? (
            <Button 
              variant='solid'
              size='sm'
              // as='b'
              w='35px' h='35px'
              colorScheme={getQuestionColor(questionSet, index)}
            >
              <Text fontWeight='extrabold'>{index + 1}</Text>
            </Button>
          ) : (
            <Button 
              variant='ghost'
              size='sm'
              onClick={()=>questionSetClickedHandler(index)}
              colorScheme={getQuestionColor(questionSet, index)}
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
  }, [questionsWrap]);
  ////

  return (
    <>
      {questionSetsRef.current.length < 1 ? (
        <Stack h='70vh'>
          <Spacer />
          <Center>
            <Spinner size='xl'/>
          </Center>
          <Spacer />
        </Stack>
      ) : (
        <>
          <IconButton
            rounded='full'
            variant='ghost'
            aria-label='Close'
            icon={<Icon as={MdClose} boxSize={6} />}
            onClick={closeButtonClickedHandler}
            zIndex={100}
            position='fixed'
            top={2} right={2}
          />
           <VStack 
            maxW='2xl'
            mt={20} mx='auto'
            align='flex-start'
            spacing={4}
          >
            <HStack>
              {levels.map((level, index)=> {
                return <Text fontSize='sm' key={`${level}-${index}`}>{level}</Text>
              })}
              <Tag rounded='full' fontSize='sm'>{mode.charAt(0).toUpperCase() + mode.slice(1)}</Tag>
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
                  <Spacer />

                  <Tooltip label='Add to my questions'>
                    <IconButton
                      rounded='full'
                      variant='ghost'
                      aria-label='Add to my questions'
                      colorScheme='teal'
                      size='sm'
                      w='35px' h='35px'
                      icon={<Icon as={SlTarget} boxSize={6} />}
                      // onClick={targetButtonClickedHandler}
                      // isDisabled={!currentQuestionSet || currentUser!.membership.current < 2 || isReview}
                    />
                  </Tooltip>

                  <Tooltip
                    label={
                      currentQuestionSet && currentQuestionSet.isTarget ?
                      'Remove the mark' : 'Mark the question'
                    }
                  >
                    <IconButton
                      rounded='full'
                      variant={
                        currentQuestionSet && currentQuestionSet.isTarget ? 'solid' : 'ghost'
                      }
                      aria-label='Mark the question'
                      colorScheme='yellow'
                      size='sm'
                      w='35px' h='35px'
                      icon={<Icon as={MdBookmarkBorder} boxSize={6} />}
                      onClick={targetButtonClickedHandler}
                      isDisabled={!currentQuestionSet || currentUser!.membership.current < 2 || isReview}
                    />
                  </Tooltip>

                  <Tooltip
                    label={
                      currentQuestionSet && currentQuestionSet.isBad ?
                      'Not bad' : 'Bad question'
                    }
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
                      isDisabled={!currentQuestionSet || isReview}
                    />
                  </Tooltip>
                </HStack>
                {currentQuestionSet ? (
                  <>
                    <Text 
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
                                {`${String.fromCharCode(65 + index)}: ${option}`}
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
                    !value || !currentQuestionSet || 
                    currentIndexRef.current + 1 >= maxNum ||
                    isSubmitted
                  }
                >
                  Next
                </Button>
              </VStack>

              <Center minH='full'>
                <Divider orientation='vertical' />
              </Center>

              <VStack 
                minW='105px' 
                maxW='105px' 
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
                    !currentQuestionSet
                  }
                />
                <Wrap 
                  align='flex-end' 
                  mt={8} spacing={0} flex={1}  
                  overflowY='scroll'
                  scrollBehavior='smooth'
                  ref={wrapRef}
                >
                  {questionsWrap}
                  <Spacer />
                </Wrap>
                <Button
                  onClick={submitButtonClickedHandler}
                  isDisabled={
                    questionSets.length === 0 ||
                    isSubmitted || isReview ||
                    addingQuestionCountRef.current !== 0
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
                      {line}
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
                  {result &&
                    <Result result={result}/>
                  }
                </ModalBody>
                <ModalFooter>
                  {/* <Button onClick={onCloseResultModal}>Exit</Button> */}
                </ModalFooter>
              </ModalContent>
            </Modal>

          </VStack>
        </>
      )}

     
    </>
    
  )
}

export default QuestionRun
