import {
  QuestionRunMode,
  QuestionSet as LocalQuestionSet,
  StemConcept,
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
  WrapItem,
} from "@chakra-ui/react";
import {
  Fragment,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { MdBookmarkBorder, MdClose, MdQuestionMark } from "react-icons/md";
import Latex from "react-latex";
import SharedComponents from "../Common/SharedComponents";
import Result from "./Result";
import { NotificationType } from "@/models";
import {
  getQuestionAnswer,
  getStemQuestionsFromDataset,
} from "@/types/questions";
import Timer from "../Common/Timer";
import { sesSendEmail } from "@/types/utils";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";

interface QuestionRunProps {
  level: "High School" | "College";
  concepts: StemConcept[];
  initMaxNum?: number;
  mode: QuestionRunMode;
  onClose: () => void;
}

const defaultNumber = 10;

function QuestionRun({
  level,
  concepts,
  mode,
  initMaxNum = defaultNumber,
  onClose,
}: QuestionRunProps) {
  const isTest = mode === QuestionRunMode.Test;
  const lastIndexRef = useRef(0);
  const currentIndexRef = useRef(0);
  const [maxNum, setMaxNum] = useState(initMaxNum);
  const [currentIndex, setCurrentIndex] = useState(0);
  const questionSetsRef = useRef<LocalQuestionSet[]>([]);

  const [currentQuestionSet, setCurrentQuestionSet] =
    useState<LocalQuestionSet>();

  // value is the user selected answer
  const [value, setValue] = useState("");

  // questionSets is used to list the questions on left
  const [questionSets, setQuestionSets] = useState<LocalQuestionSet[]>([]);

  const [shouldShowWorkout, setShouldShowWorkout] = useBoolean(false);
  const [result, setResult] = useState<{ total: number; correct: number }>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { dataStoreUser, apiName } = useContext(SharedComponents);
  const [isChallenging, setIsChallenging] = useState(false);
  const [timerStopped, setTimeStopped] = useState(false);
  const [duration, setDuration] = useState(0);
  const cancelRef = useRef(null);
  const toast = useToast();

  const {
    isOpen: isOpenResultModal,
    onOpen: onOpenResultModal,
    onClose: onCloseResultModal,
  } = useDisclosure();

  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();

  useEffect(() => {
    const getAndSetStemQuestions = async (num: number) => {
      const questionSets = await getStemQuestionsFromDataset(
        apiName,
        concepts,
        level,
        num,
      );

      if (questionSets.length === 0) {
        onClose();
        toast({
          description: `Failed to generate questions, please try again later.`,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }

      questionSetsRef.current = questionSets;
      lastIndexRef.current = maxNum - 1;
      setQuestionSets(questionSets);
      setCurrentQuestionSet(questionSets[0]);
    };

    getAndSetStemQuestions(maxNum);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setSelectedValue = (value: string) => {
    setValue(value);
    questionSetsRef.current[currentIndexRef.current].selected = value;
  };

  const nextButtonClickedHandler = async () => {
    if (currentIndexRef.current + 1 >= maxNum) return;

    setShouldShowWorkout.off();
    currentIndexRef.current += 1;
    setCurrentIndex(currentIndexRef.current);
    setValue(
      questionSetsRef.current[currentIndexRef.current]
        ? questionSetsRef.current[currentIndexRef.current].selected
        : "",
    );

    if (currentIndexRef.current > lastIndexRef.current && !isSubmitted) {
      lastIndexRef.current += 1;
    }

    setQuestionSets(questionSetsRef.current.slice(0, lastIndexRef.current + 1));

    if (!questionSetsRef.current[currentIndexRef.current]) {
      setCurrentQuestionSet(undefined);
      return;
    }

    setCurrentQuestionSet(questionSetsRef.current[currentIndexRef.current]);
  };

  const questionSetClickedHandler = (index: number) => {
    setShouldShowWorkout.off();
    setCurrentIndex(index);
    currentIndexRef.current = index;
    setValue(questionSetsRef.current[index].selected);
    setCurrentQuestionSet(questionSetsRef.current[currentIndexRef.current]);
  };

  const submitButtonClickedHandler = async () => {
    if (!dataStoreUser) return;
    onCloseAlert();
    setTimeStopped(true);

    let correct = 0;
    for (let i = 0; i <= lastIndexRef.current; i++) {
      if (
        questionSetsRef.current[i].selected ===
        questionSetsRef.current[i].answer
      ) {
        correct += 1;
      }
    }

    setResult({ total: lastIndexRef.current + 1, correct: correct });
    lastIndexRef.current = questionSets.length - 1;
    setIsSubmitted(true);
    onOpenResultModal();

    if (
      isTest &&
      dataStoreUser.notification &&
      dataStoreUser.notification.types.includes(NotificationType.INSTANT) &&
      dataStoreUser.notification.emails.length > 0
    ) {
      const message = `${dataStoreUser.username} just finished a math test.
Level: ${level}
Total questions: ${lastIndexRef.current + 1}
Correct: ${correct} (${((100 * correct) / (lastIndexRef.current + 1)).toFixed(0) + "%"})
      `;
      sesSendEmail(
        dataStoreUser.notification.emails as string[],
        "Learn with AI instant notification",
        message,
        "notification@jinpearl.com",
      );
    }
  };

  const getQuestionColor = (q: LocalQuestionSet, index: number) => {
    const isCurrent = index === currentIndexRef.current;

    if (!isSubmitted) {
      if (q.isMarked) return "yellow";
      if (!isCurrent) return "gray";
      if (isCurrent) return "teal";
    } else {
      if (q.answer !== q.selected) return "red";
      if (q.isMarked) return "yellow";
    }

    return "teal";
  };

  const markQuestionButtonClickedHandler = () => {
    if (!currentQuestionSet) return;
    questionSetsRef.current[currentIndexRef.current].isMarked =
      !questionSetsRef.current[currentIndexRef.current].isMarked;
    setCurrentQuestionSet({
      ...currentQuestionSet,
      isMarked: questionSetsRef.current[currentIndexRef.current].isMarked,
    });
  };

  const challengeButtonClickedHandler = async () => {
    if (!currentQuestionSet) return;

    setIsChallenging(true);

    let questionString = currentQuestionSet.question + ` Options: `;
    for (let i = 0; i < currentQuestionSet.options.length; i++) {
      questionString += `${String.fromCharCode(65 + i)}: ${currentQuestionSet.options[i]}`;
    }

    const newAnswer = await getQuestionAnswer(apiName, questionString);
    if (!newAnswer) {
      toast({
        description: `Failed to generate answer, please try again later.`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } else {
      setCurrentQuestionSet({
        ...currentQuestionSet,
        workout: newAnswer,
      });
    }
    setIsChallenging(false);
  };

  // For wrap auto scroll
  const wrapRef = useRef<HTMLDivElement>(null);

  const questionsWrap =
    questionSets &&
    questionSets.map((questionSet, index) => {
      return (
        <WrapItem key={`questionSet-${index}`}>
          {index === currentIndexRef.current ||
          (questionSets[index].isMarked && !isSubmitted) ? (
            <Button
              variant="solid"
              size="sm"
              w="35px"
              h="35px"
              colorScheme={getQuestionColor(questionSet, index)}
              onClick={() => questionSetClickedHandler(index)}
            >
              <Text fontWeight="extrabold">{index + 1}</Text>
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => questionSetClickedHandler(index)}
              colorScheme={getQuestionColor(questionSet, index)}
              w="35px"
              h="35px"
            >
              <Text fontWeight="extrabold">{index + 1}</Text>
            </Button>
          )}
        </WrapItem>
      );
    });

  useLayoutEffect(() => {
    const container = wrapRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  }, [questionSets.length]);
  ////

  return (
    <>
      <IconButton
        rounded="full"
        variant="ghost"
        aria-label="Close"
        icon={<Icon as={MdClose} boxSize={6} />}
        onClick={onClose}
        zIndex={100}
        position="fixed"
        top={2}
        right={2}
      />

      {questionSetsRef.current.length < 1 ? (
        <Stack h="70vh">
          <Spacer />
          <Center>
            <VStack>
              <Spinner size="xl" />
              <Text fontSize="lg">AI is generating questions</Text>
              <Text fontSize="lg">It may take a while, please wait...</Text>
            </VStack>
          </Center>
          <Spacer />
        </Stack>
      ) : (
        <>
          <VStack maxW="2xl" mt={20} mx="auto" align="flex-start" spacing={4}>
            <HStack w="full">
              <Text fontSize="sm">
                {currentQuestionSet ? currentQuestionSet.level : level}
              </Text>
              <Tag
                rounded="full"
                fontSize="sm"
                colorScheme={mode === QuestionRunMode.Test ? "red" : "teal"}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </Tag>
              <Spacer />
              {isTest && (
                <Timer
                  isStopped={timerStopped}
                  duration={duration}
                  setDuration={setDuration}
                />
              )}
            </HStack>

            <HStack
              spacing={4}
              minH="30vh"
              w="full"
              align="flex-start"
              alignItems="stretch"
            >
              <VStack align="flex-start" spacing={2} w="full" pe={4}>
                <HStack w="full">
                  <Text fontSize="lg" as="b">
                    Question {currentIndex + 1}
                  </Text>
                  <Spacer />

                  <Tooltip
                    label={
                      currentQuestionSet && currentQuestionSet.isMarked
                        ? "Remove the mark"
                        : "Mark the question"
                    }
                  >
                    <IconButton
                      rounded="full"
                      variant={
                        currentQuestionSet && currentQuestionSet.isMarked
                          ? "solid"
                          : "ghost"
                      }
                      aria-label="Mark the question"
                      colorScheme="yellow"
                      size="sm"
                      w="35px"
                      h="35px"
                      icon={<Icon as={MdBookmarkBorder} boxSize={6} />}
                      onClick={markQuestionButtonClickedHandler}
                      isDisabled={isSubmitted}
                    />
                  </Tooltip>
                </HStack>
                {currentQuestionSet ? (
                  <>
                    <Text as={Latex} textAlign="justify" overflow="auto">
                      {currentQuestionSet.question}
                    </Text>
                    <RadioGroup onChange={setSelectedValue} value={value}>
                      <VStack align="flex-start">
                        {currentQuestionSet.options.map((option, index) => {
                          return (
                            <Radio
                              value={String.fromCharCode(65 + index)}
                              key={index}
                              isDisabled={isSubmitted}
                            >
                              {!option.includes("$") &&
                              option.includes("\\") ? (
                                <HStack>
                                  <Text>
                                    {String.fromCharCode(65 + index)}:{" "}
                                  </Text>
                                  <InlineMath>{option}</InlineMath>
                                </HStack>
                              ) : (
                                <Latex>{`${String.fromCharCode(65 + index)}: ${option}`}</Latex>
                              )}
                            </Radio>
                          );
                        })}
                      </VStack>
                    </RadioGroup>
                  </>
                ) : (
                  <VStack w="full" minH="20vh">
                    <Spacer />
                    <Center w="full">
                      <Spinner size="xl" />
                    </Center>
                    <Text>Loading, please wait...</Text>
                    <Spacer />
                  </VStack>
                )}

                <Spacer />

                <Button
                  onClick={nextButtonClickedHandler}
                  isDisabled={
                    !value ||
                    !currentQuestionSet ||
                    (currentIndexRef.current >= lastIndexRef.current &&
                      isSubmitted) ||
                    currentIndexRef.current + 1 >= maxNum
                  }
                >
                  Next
                </Button>
              </VStack>

              <Center minH="full">
                <Divider orientation="vertical" />
              </Center>

              <VStack
                minW="105px"
                maxW="105px"
                align="flex-end"
                minH="full"
                maxH="50vh"
              >
                <IconButton
                  rounded="full"
                  aria-label="Show answer"
                  size="sm"
                  w="35px"
                  h="35px"
                  icon={<Icon as={MdQuestionMark} boxSize={6} />}
                  onClick={() => setShouldShowWorkout.toggle()}
                  isDisabled={(isTest && !isSubmitted) || !currentQuestionSet}
                />
                <Wrap
                  align="flex-end"
                  mt={8}
                  spacing={0}
                  flex={1}
                  overflowY="scroll"
                  scrollBehavior="smooth"
                  ref={wrapRef}
                >
                  {questionsWrap}
                  <Spacer />
                </Wrap>
                <Button
                  onClick={onOpenAlert}
                  isDisabled={questionSets.length === 0 || isSubmitted}
                >
                  Submit
                </Button>
              </VStack>
            </HStack>

            <Box as={Collapse} in={shouldShowWorkout} w="full">
              <Divider />
              <HStack alignItems="center" mt={4} w="full">
                <Text>
                  {currentQuestionSet &&
                    `Answer: ${currentQuestionSet.answer ?? ""}`}
                </Text>
                <Spacer />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={challengeButtonClickedHandler}
                  isDisabled={dataStoreUser!.membership!.current < 2}
                >
                  Can AI answer this question?
                </Button>
              </HStack>
              {isChallenging ? (
                <>
                  <SkeletonText
                    mt="4"
                    noOfLines={4}
                    spacing="4"
                    skeletonHeight="2"
                  />
                </>
              ) : (
                <>
                  {currentQuestionSet &&
                    currentQuestionSet.workout
                      .split("\n")
                      .map((line, index) => (
                        <Fragment key={index}>
                          <Latex>{line}</Latex>
                          {index !==
                            currentQuestionSet.workout.split("\n").length -
                              1 && <br />}
                        </Fragment>
                      ))}
                </>
              )}
            </Box>

            <Modal
              isOpen={isOpenResultModal}
              onClose={onCloseResultModal}
              scrollBehavior="inside"
            >
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton />
                <ModalBody>{result && <Result result={result} />}</ModalBody>
                <ModalFooter>
                  {/* <Button onClick={onCloseResultModal}>Exit</Button> */}
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
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Submit?
                </AlertDialogHeader>

                <AlertDialogBody>
                  You will not be allowed to change the answer.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button
                    ref={cancelRef}
                    onClick={onCloseAlert}
                    rounded={"full"}
                    px={6}
                  >
                    Cancel
                  </Button>
                  <Button
                    colorScheme="red"
                    rounded={"full"}
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
      )}
    </>
  );
}

export default QuestionRun;
