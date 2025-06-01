import Layout from "@/components/Common/Layout";
import SharedComponents from "@/components/Common/SharedComponents";
import QuestionRun from "@/components/Stem/QuestionRun";
import { OptionStates } from "@/models";
import { QuestionRunMode, StemConcept } from "@/types/types";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Radio,
  RadioGroup,
  Spacer,
  Tag,
  useDisclosure,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Cache } from "aws-amplify";
import { useContext, useEffect, useRef, useState } from "react";

function Stem() {
  const {
    isOpen: isOpenExamModal,
    onOpen: onOpenExamModal,
    onClose: onCloseExamModal,
  } = useDisclosure();
  const optionStatesRef = useRef(Cache.getItem("optionStates") as OptionStates);

  const concepts = Object.values(StemConcept).slice(1, 11);
  const levels = ["Primary School", "Middle School", "High School", "College"];
  const [selectedConcepts, setSelectedConcepts] = useState<StemConcept[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>(levels[0]);
  const [num, setNum] = useState("10");
  const [mode, setMode] = useState(QuestionRunMode.Practice as string);
  const { dataStoreUser } = useContext(SharedComponents);
  const allConceptsChecked = concepts.length === selectedConcepts.length;
  const isConceptIndeterminate =
    selectedConcepts.length > 0 && selectedConcepts.length < concepts.length;
  const ignoreTriggerRef = useRef(true);

  useEffect(() => {
    if (!optionStatesRef.current) return;
    if (optionStatesRef.current?.stemMode)
      setMode(optionStatesRef.current.stemMode);
    if (optionStatesRef.current?.stemConcepts)
      setSelectedConcepts(
        optionStatesRef.current.stemConcepts as StemConcept[],
      );
    if (optionStatesRef.current?.stemLevel)
      setSelectedLevel(optionStatesRef.current.stemLevel);
    if (optionStatesRef.current?.stemNumber)
      setNum(optionStatesRef.current.stemNumber.toString());

    setTimeout(() => {
      ignoreTriggerRef.current = false;
    }, 100);
  }, []);

  useEffect(() => {
    if (ignoreTriggerRef.current) return;

    if (
      selectedLevel === "Primary School" ||
      selectedLevel === "Middle School"
    ) {
      setSelectedConcepts([StemConcept.Science]);
      return;
    }

    if (selectedLevel === "High School") {
      const highSchoolConcepts = concepts.filter(
        (concept) =>
          concept !== StemConcept.Medicine &&
          concept !== StemConcept.Electrical &&
          concept !== StemConcept.Science,
      );
      setSelectedConcepts([...highSchoolConcepts]);
      return;
    }

    const collegeConcepts = concepts.filter(
      (concept) =>
        concept !== StemConcept.Statistics && concept !== StemConcept.Science,
    );
    setSelectedConcepts([...collegeConcepts]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLevel]);

  const setCheckedConcepts = (value: StemConcept) => {
    let concepts = selectedConcepts;
    const index = concepts.indexOf(value);

    if (index > -1) {
      concepts.splice(index, 1);
      setSelectedConcepts([...concepts]);
    } else {
      setSelectedConcepts([...concepts, value]);
    }
  };

  const setAllCheckedConcepts = () => {
    if (selectedConcepts.length === 0) {
      if (selectedLevel === "High School") {
        const highSchoolConcepts = concepts.filter(
          (concept) =>
            concept !== StemConcept.Medicine &&
            concept !== StemConcept.Electrical,
        );
        setSelectedConcepts([...highSchoolConcepts]);
      } else {
        const collegeConcepts = concepts.filter(
          (concept) => concept !== StemConcept.Statistics,
        );
        setSelectedConcepts([...collegeConcepts]);
      }
    } else {
      setSelectedConcepts([]);
    }
  };

  const startButtonClickedHandler = async () => {
    if (!dataStoreUser) return;
    onOpenExamModal();

    optionStatesRef.current = {
      ...optionStatesRef.current,
      stemConcepts: selectedConcepts,
      stemLevel: selectedLevel,
      stemNumber: Number(num),
      stemMode: mode,
    };

    Cache.setItem("optionStates", optionStatesRef.current, {
      expires: new Date().getTime() + 1000 * 60 * 60 * 24 * 31,
    });
  };

  return (
    <Layout>
      {dataStoreUser && (
        <VStack spacing={4} align="flex-start">
          <Tag w="full" p={2} colorScheme="blue">
            STEM questions are from the public MMLU dataset. It is a free
            feature for all members. No quotas!
          </Tag>

          <RadioGroup onChange={setMode} value={mode}>
            <HStack spacing={4}>
              <Heading size="sm">Mode</Heading>
              <Radio value={QuestionRunMode.Practice}>Practice</Radio>
              <Radio value={QuestionRunMode.Test}>Test</Radio>
            </HStack>
          </RadioGroup>
          <RadioGroup onChange={setNum} value={num}>
            <HStack spacing={4}>
              <Heading size="sm">Question Number</Heading>
              {[10, 20, 50].map((num, index) => {
                return (
                  <Radio value={num.toString()} key={`${num}-${index}`}>
                    {num}
                  </Radio>
                );
              })}
            </HStack>
          </RadioGroup>

          <Divider />

          <RadioGroup onChange={setSelectedLevel} value={selectedLevel}>
            <VStack align="flex-start">
              <HStack align="flex-start">
                <Heading size="sm">Level</Heading>
              </HStack>
              <Wrap>
                {levels.map((level, index) => {
                  return (
                    <WrapItem key={`${level}-${index}`} minW="150px">
                      <Radio value={level}>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
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
              selectedLevel === "Primary School" ||
              selectedLevel === "Middle School"
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
                        onChange={(e) =>
                          setCheckedConcepts(e.target.value as StemConcept)
                        }
                        isDisabled={
                          selectedLevel === "Primary School" ||
                          selectedLevel === "Middle School" ||
                          (concept === StemConcept.Medicine &&
                            selectedLevel !== "College") ||
                          (concept === StemConcept.Electrical &&
                            selectedLevel !== "College") ||
                          (concept === StemConcept.Statistics &&
                            selectedLevel !== "High School")
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

          <HStack justify="flex-end" w="full">
            <Button
              onClick={startButtonClickedHandler}
              isDisabled={
                ((selectedLevel === "High School" ||
                  selectedLevel === "College") &&
                  !selectedConcepts.length) ||
                !selectedLevel
              }
            >
              Start
            </Button>
          </HStack>

          <Modal
            isOpen={isOpenExamModal}
            onClose={onCloseExamModal}
            scrollBehavior="inside"
            size="full"
            closeOnEsc={false}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalBody mt={-6}>
                <QuestionRun
                  level={selectedLevel as "High School" | "College"}
                  concepts={selectedConcepts}
                  initMaxNum={Number(num)}
                  mode={mode as QuestionRunMode}
                  onClose={onCloseExamModal}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        </VStack>
      )}
    </Layout>
  );
}

export default Stem;
