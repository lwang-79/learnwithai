import SharedComponents from "@/components/Common/SharedComponents";
import QuestionRun from "@/components/Math/QuestionRun";
import { OptionStates, Test } from "@/models";
import { getTodayStatistic } from "@/types/statistic";
import {
  HendrycksConcept,
  MathConcept,
  QuestionCategory,
  QuestionLevel,
  QuestionRunMode,
  QuestionSource,
  QuestionType,
} from "@/types/types";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  Heading,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Radio,
  RadioGroup,
  Spacer,
  Tooltip,
  useBoolean,
  useDisclosure,
  useToast,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import TestList from "@/components/Math/TestList";
import { MdErrorOutline } from "react-icons/md";
import { Cache } from "aws-amplify";
import Layout from "@/components/Common/Layout";

function MathExam() {
  const {
    isOpen: isOpenExamModal,
    onOpen: onOpenExamModal,
    onClose: onCloseExamModal,
  } = useDisclosure();
  const optionStatesRef = useRef(Cache.getItem("optionStates") as OptionStates);

  const sources = Object.values(QuestionSource);
  const concepts = Object.values(MathConcept);
  const hendrycksConcepts = Object.values(HendrycksConcept);
  const levels = [...Object.values(QuestionLevel).slice(0, 6)];
  const competitionLevels = [...Object.values(QuestionLevel).slice(12, 17)];
  const [selectedSource, setSelectedSource] = useState<string>(sources[0]);
  const [selectedConcepts, setSelectedConcepts] = useState<
    (MathConcept | HendrycksConcept)[]
  >([MathConcept.Arithmetic]);
  const [selectedLevel, setSelectedLevel] = useState<string>(
    QuestionLevel.Year4,
  );
  const [num, setNum] = useState("10");
  const [mode, setMode] = useState(QuestionRunMode.Practice as string);
  const { dataStoreUser } = useContext(SharedComponents);
  const [allConceptsChecked, setAllConceptsChecked] = useState(false);
  const isConceptIndeterminate =
    selectedConcepts.length > 0 && selectedConcepts.length < concepts.length;
  const [selectedTest, setSelectedTest] = useState<Test>();
  const toast = useToast();
  const [refreshTestList, setRefreshTestList] = useBoolean(false);
  const ignoreTriggerRef = useRef(true);

  useEffect(() => {
    if (!optionStatesRef.current) return;

    if (optionStatesRef.current.mathSource) {
      setSelectedSource(optionStatesRef.current.mathSource);
    }

    if (optionStatesRef.current.mathLevel) {
      setSelectedLevel(optionStatesRef.current.mathLevel);
    }

    if (optionStatesRef.current.mathNumber) {
      setNum(optionStatesRef.current.mathNumber.toString());
    }

    if (optionStatesRef.current.mathMode) {
      setMode(optionStatesRef.current.mathMode);
    }

    if (optionStatesRef.current.mathConcepts) {
      setSelectedConcepts(
        optionStatesRef.current.mathConcepts as (
          | MathConcept
          | HendrycksConcept
        )[],
      );
    }

    setTimeout(() => {
      ignoreTriggerRef.current = false;
    }, 100);
  }, []);

  useEffect(() => {
    if (ignoreTriggerRef.current) return;

    if (selectedSource === QuestionSource.SavedQuestions) {
      setMode(QuestionRunMode.Practice);
      return;
    }

    if (mode === QuestionRunMode.Review) {
      setMode(QuestionRunMode.Practice);
    }

    if (selectedSource === QuestionSource.Hendrycks) {
      setSelectedLevel(QuestionLevel.Level1);
      setSelectedConcepts(hendrycksConcepts);
      setAllConceptsChecked(true);
    } else if (selectedSource.includes("ChatGPT")) {
      setSelectedLevel(QuestionLevel.Year4);
      setSelectedConcepts(concepts);
      setAllConceptsChecked(true);
    } else {
      setSelectedLevel(QuestionLevel.Level1);
      setSelectedConcepts([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSource]);

  useEffect(() => {
    if (ignoreTriggerRef.current) return;

    if (mode === QuestionRunMode.Practice) {
      setNum("10");
    } else {
      setNum("20");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const setCheckedConcepts = (value: MathConcept) => {
    let sConcepts = [...selectedConcepts];
    const index = sConcepts.indexOf(value);

    if (index > -1) {
      if (sConcepts.length === 1 && index === 0) {
        sConcepts = [];
      } else {
        sConcepts.splice(index, 1);
      }
      setSelectedConcepts([...sConcepts]);
    } else {
      sConcepts = [...sConcepts, value];
      setSelectedConcepts([...sConcepts]);
    }

    if (
      selectedSource === QuestionSource.Hendrycks &&
      sConcepts.length >= hendrycksConcepts.length
    ) {
      setAllConceptsChecked(true);
      return;
    }

    if (
      selectedSource.includes("ChatGPT") &&
      sConcepts.length >= concepts.length
    ) {
      setAllConceptsChecked(true);
      return;
    }

    setAllConceptsChecked(false);
  };

  const setAllCheckedConcepts = () => {
    if (selectedConcepts.length === 0) {
      setSelectedConcepts(
        selectedSource.includes("ChatGPT") ? concepts : hendrycksConcepts,
      );
      setAllConceptsChecked(true);
    } else {
      setSelectedConcepts([]);
      setAllConceptsChecked(false);
    }
  };

  const startButtonClickedHandler = async () => {
    setSelectedTest(undefined);
    const user = dataStoreUser;
    if (!user) return;

    const todayStatistic = await getTodayStatistic(user);

    if (
      todayStatistic &&
      user.quota &&
      user.quota.mathPerDay - todayStatistic.mathRequest < Number(num)
    ) {
      toast({
        description: `The number of questions you generated today exceeded your current quota.`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });

      return;
    }

    setTimeout(() => onOpenExamModal(), 100);

    optionStatesRef.current = {
      ...optionStatesRef.current,
      mathSource: selectedSource,
      mathConcepts: selectedConcepts,
      mathLevel: selectedLevel,
      mathNumber: Number(num),
      mathMode: mode,
    };

    Cache.setItem("optionStates", optionStatesRef.current, {
      expires: new Date().getTime() + 1000 * 60 * 60 * 24 * 31,
    });
  };

  const savedQuestionsButtonClickedHandler = () => {
    setSelectedSource(QuestionSource.SavedQuestions);
    setTimeout(() => {
      onOpenExamModal();
    }, 100);
  };

  const openModalWithTest = (test: Test) => {
    setSelectedTest(test);
    setNum(test.questionSets.length.toString());
    setMode(QuestionRunMode.Review);
    setTimeout(() => {
      onOpenExamModal();
    }, 100);
  };

  const modalClosedHandler = async () => {
    onCloseExamModal();
    if (mode === QuestionRunMode.Review) {
      setMode(QuestionRunMode.Practice);
      setNum("10");
    }
    if (selectedSource === QuestionSource.SavedQuestions) {
      setSelectedSource(sources[0]);
    }
    setRefreshTestList.toggle();
  };

  return (
    <Layout>
      {dataStoreUser && (
        <VStack spacing={4} align="flex-start">
          <HStack spacing={16}>
            <RadioGroup
              onChange={setMode}
              value={mode}
              isDisabled={selectedSource === QuestionSource.SavedQuestions}
            >
              <HStack spacing={4}>
                <Heading size="sm">Mode</Heading>
                <Radio value={QuestionRunMode.Practice}>Practice</Radio>
                <Radio
                  value={QuestionRunMode.Test}
                  isDisabled={
                    dataStoreUser!.membership!.current < 2 ||
                    selectedSource === QuestionSource.SavedQuestions
                  }
                >
                  Test
                </Radio>
              </HStack>
            </RadioGroup>

            <RadioGroup
              onChange={setNum}
              value={num}
              isDisabled={
                dataStoreUser!.membership!.current < 2 ||
                // mode === QuestionRunMode.Competition ||
                selectedSource === QuestionSource.SavedQuestions
              }
            >
              <HStack spacing={4}>
                <Heading size="sm">Question Number</Heading>
                <Radio value="10">10</Radio>
                {[20, 50].map((num, index) => {
                  return (
                    <Radio value={num.toString()} key={`${num}-${index}`}>
                      {num}
                    </Radio>
                  );
                })}
              </HStack>
            </RadioGroup>
          </HStack>

          <Divider />

          <RadioGroup onChange={setSelectedSource} value={selectedSource}>
            <VStack align="flex-start">
              <HStack align="flex-start">
                <Heading size="sm">Source</Heading>
                <Tooltip
                  hasArrow
                  bg="teal"
                  placement="right"
                  label={`Due to the limitations of AI's capabilities, questions generated by ChatGPT may not be entirely accurate. On the other hand, public datasets used for AI training serve as alternative sources that offer significantly higher accuracy.`}
                >
                  <span>
                    <Icon as={MdErrorOutline} boxSize={5} color="red.500" />
                  </span>
                </Tooltip>
              </HStack>
              <Wrap>
                {sources.slice(0, 6).map((source, index) => {
                  return (
                    <WrapItem key={`${source}-${index}`} minW="150px">
                      <Radio
                        value={source}
                        isDisabled={
                          source === QuestionSource.ChatGPT4 &&
                          dataStoreUser.membership?.current! < 5
                        }
                      >
                        {source}
                      </Radio>
                    </WrapItem>
                  );
                })}
              </Wrap>
            </VStack>
          </RadioGroup>

          <Divider />

          <RadioGroup
            onChange={setSelectedLevel}
            value={selectedLevel}
            isDisabled={selectedSource === QuestionSource.SavedQuestions}
          >
            <VStack align="flex-start">
              <HStack align="flex-start">
                <Heading size="sm">Level</Heading>
              </HStack>
              <Wrap>
                {levels.map((level, index) => {
                  return (
                    <WrapItem key={`${level}-${index}`} minW="150px">
                      <Radio
                        value={level}
                        isDisabled={!selectedSource.includes("ChatGPT")}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </Radio>
                    </WrapItem>
                  );
                })}
                {competitionLevels.map((level, index) => {
                  return (
                    <WrapItem key={`${level}-${index}`} minW="150px">
                      <Radio
                        value={level}
                        isDisabled={
                          selectedSource !== QuestionSource.Competition &&
                          selectedSource !== QuestionSource.Hendrycks
                        }
                      >
                        {level}
                      </Radio>
                    </WrapItem>
                  );
                })}
              </Wrap>
            </VStack>
          </RadioGroup>

          <Divider />

          <CheckboxGroup
            value={selectedConcepts}
            isDisabled={
              !selectedSource.includes("ChatGPT") &&
              selectedSource !== QuestionSource.Hendrycks
            }
          >
            <VStack align="flex-start">
              <Checkbox
                isChecked={allConceptsChecked}
                isIndeterminate={isConceptIndeterminate}
                onChange={setAllCheckedConcepts}
              >
                <Heading size="sm">Concepts</Heading>
              </Checkbox>
              <Wrap>
                {concepts.map((concept, index) => {
                  return (
                    <WrapItem key={`${concept}-${index}`} minW="180px">
                      <Checkbox
                        value={concept}
                        isDisabled={!selectedSource.includes("ChatGPT")}
                        onChange={(e) =>
                          setCheckedConcepts(e.target.value as MathConcept)
                        }
                      >
                        {concept.charAt(0).toUpperCase() + concept.slice(1)}
                      </Checkbox>
                    </WrapItem>
                  );
                })}
                {hendrycksConcepts.map((concept, index) => {
                  return (
                    <WrapItem key={`${concept}-${index}`} minW="180px">
                      <Checkbox
                        value={concept}
                        isDisabled={selectedSource !== QuestionSource.Hendrycks}
                        onChange={(e) =>
                          setCheckedConcepts(e.target.value as MathConcept)
                        }
                      >
                        {concept.charAt(0).toUpperCase() + concept.slice(1)}
                      </Checkbox>
                    </WrapItem>
                  );
                })}
              </Wrap>
            </VStack>
          </CheckboxGroup>
          <HStack w="full" align="flex-start">
            <Spacer />
          </HStack>
          <Spacer />

          <HStack w="full">
            <Button
              variant="ghost"
              onClick={savedQuestionsButtonClickedHandler}
              isDisabled={dataStoreUser!.membership!.current < 2}
            >
              My saved questions
            </Button>
            <Spacer />
            <Button
              onClick={startButtonClickedHandler}
              isDisabled={
                ((selectedSource.includes("ChatGPT") ||
                  selectedSource === QuestionSource.Hendrycks) &&
                  !selectedConcepts.length) ||
                !selectedLevel
              }
            >
              Start
            </Button>
          </HStack>

          <TestList
            selectCallback={openModalWithTest}
            title="Recent tests"
            defaultPageStep={10}
            refreshTrigger={refreshTestList}
          />

          <Modal
            isOpen={isOpenExamModal}
            onClose={modalClosedHandler}
            scrollBehavior="inside"
            size="full"
            closeOnEsc={false}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalBody mt={-6}>
                <QuestionRun
                  source={selectedSource as QuestionSource}
                  category={QuestionCategory.Math}
                  type={QuestionType.MultiChoice}
                  level={selectedLevel as QuestionLevel}
                  concepts={selectedConcepts}
                  initMaxNum={Number(num)}
                  mode={mode as QuestionRunMode}
                  onClose={modalClosedHandler}
                  initialTest={selectedTest}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        </VStack>
      )}
    </Layout>
  );
}

export default MathExam;
