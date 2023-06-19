import Footer from '@/components/Common/Footer';
import Header from '@/components/Common/Header';
import SharedComponents from '@/components/Common/SharedComponents';
import WithAuth from '@/components/Common/WithAuth';
import QuestionRun from '@/components/Math/QuestionRun';
import { Test, User } from '@/models';
import { getTodayStatistic } from '@/types/statistic';
import { 
  HendrycksConcept, 
  MathConcept, 
  QuestionCategory, 
  QuestionLevel, 
  QuestionRunMode, 
  QuestionSource, 
  QuestionType 
} from '@/types/types';
import { 
  Button, 
  Checkbox, 
  CheckboxGroup, 
  Divider, 
  Flex, 
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
  WrapItem
} from '@chakra-ui/react'
import { useContext, useEffect, useRef, useState } from 'react'
import TestList from '@/components/Math/TestList';
import { MdErrorOutline } from 'react-icons/md';
import { DataStore } from 'aws-amplify';

function MathExam() {
  const { 
    isOpen: isOpenExamModal, 
    onOpen: onOpenExamModal, 
    onClose: onCloseExamModal
  } = useDisclosure();

  const sources = Object.values(QuestionSource);
  const concepts = Object.values(MathConcept);
  const hendrycksConcepts = Object.values(HendrycksConcept);
  const levels = [
    ...Object.values(QuestionLevel).slice(0,6), 
  ];
  const competitionLevels = [ ...Object.values(QuestionLevel).slice(12, 17) ];
  const [ selectedSource, setSelectedSource ] = useState<string>(sources[0]);
  const [ selectedConcepts, setSelectedConcepts ] = useState<(MathConcept|HendrycksConcept)[]>([MathConcept.Arithmetic]);
  const [ selectedLevel, setSelectedLevel ] = useState<string>(QuestionLevel.Year4);
  const [ num, setNum ] = useState('10');
  const [ mode, setMode ] = useState(QuestionRunMode.Practice as string);
  const { dataStoreUser, setDataStoreUser } = useContext(SharedComponents);
  const [ allConceptsChecked, setAllConceptsChecked] = useState(false);
  const isConceptIndeterminate = selectedConcepts.length > 0 && selectedConcepts.length < concepts.length;
  const [ selectedTest, setSelectedTest ] = useState<Test>();
  const toast = useToast();
  const [ refreshTestList, setRefreshTestList ] = useBoolean(false);
  const ignoreTriggerRef = useRef(true);

  useEffect(() => {
    if (!dataStoreUser) return;
    if (!ignoreTriggerRef.current) return;

    if (dataStoreUser.optionStates?.mathMode) setMode(dataStoreUser.optionStates.mathMode);

    if (dataStoreUser.optionStates?.mathSource) setSelectedSource(dataStoreUser.optionStates.mathSource);

    if (dataStoreUser.optionStates?.mathConcepts) setSelectedConcepts(dataStoreUser.optionStates.mathConcepts as (MathConcept | HendrycksConcept)[]);

    if (dataStoreUser.optionStates?.mathLevel) setSelectedLevel(dataStoreUser.optionStates.mathLevel);

    if (dataStoreUser.optionStates?.mathNumber) setNum(dataStoreUser.optionStates.mathNumber.toString());

    setTimeout(() => {
      ignoreTriggerRef.current = false;
    }, 100);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dataStoreUser]);

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
    } else if (selectedSource === QuestionSource.ChatGPT) {
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
      setNum('10');
    } else {
      setNum('20');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[mode]);

  const setCheckedConcepts = (value: MathConcept) => {
    let sConcepts = [...selectedConcepts];
    const index = sConcepts.indexOf(value);
    console.log(sConcepts, index)

    if (index > -1) {
      if (sConcepts.length === 1 && index === 0) {
        sConcepts = [];
      } else {
        sConcepts.splice(index, 1);
      }
      setSelectedConcepts([...sConcepts]);
    } else {
      setSelectedConcepts([...sConcepts, value]);
    }

    if (
      selectedSource === QuestionSource.Hendrycks &&
      sConcepts.length >= hendrycksConcepts.length
    ) {
      setAllConceptsChecked(true);
      return
    }

    if (
      selectedSource === QuestionSource.ChatGPT &&
      sConcepts.length >= concepts.length
    ) {
      setAllConceptsChecked(true);
      return;
    }

    setAllConceptsChecked(false);
  }

  const setAllCheckedConcepts = () => {
    if (selectedConcepts.length === 0) {
      setSelectedConcepts(
        selectedSource === QuestionSource.ChatGPT ?
        concepts : hendrycksConcepts
      );
      setAllConceptsChecked(true);
    } else {
      setSelectedConcepts([]);
      setAllConceptsChecked(false);
    }
  }

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
        status: 'error',
        duration: 5000,
        isClosable: true
      });

      return;
    }

    setTimeout(()=>onOpenExamModal(), 100);

    const currentUser = await DataStore.query(User, dataStoreUser.id);
    setDataStoreUser(await DataStore.save(User.copyOf(currentUser!, updated => {
      updated.optionStates = {
        ...updated.optionStates,
        mathSource: selectedSource,
        mathConcepts: selectedConcepts,
        mathLevel: selectedLevel,
        mathNumber: Number(num),
        mathMode: mode
      };
    })));
  }

  const savedQuestionsButtonClickedHandler = () => {
    setSelectedSource(QuestionSource.SavedQuestions);
    setTimeout(()=>{
      onOpenExamModal();
    }, 100);
  }

  const openModalWithTest = (test: Test) => {
    setSelectedTest(test);
    setNum(test.questionSets.length.toString());
    setMode(QuestionRunMode.Review);
    setTimeout(()=>{
      onOpenExamModal();
    }, 100);
  }

  const modalClosedHandler = async () => {
    onCloseExamModal();
    if (mode === QuestionRunMode.Review) {
      setMode(QuestionRunMode.Practice);
      setNum('10');
    }
    if (selectedSource === QuestionSource.SavedQuestions) {
      setSelectedSource(sources[0]);
    }
    setRefreshTestList.toggle();
  }


  return (
    <WithAuth href='/login'>
      {dataStoreUser &&
        <Flex
          minH='100vh'
          direction='column'
        >
          <Header />
          {/* <Script async 
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8667628388061043"
            crossOrigin="anonymous">
          </Script> */}

          <VStack minW='lg' maxW='5xl' mx='auto' mt='24' pb={24} px={10} spacing={4} align='flex-start'>
            <HStack spacing={16}>
              <RadioGroup 
                onChange={setMode} 
                value={mode}
                isDisabled={selectedSource === QuestionSource.SavedQuestions}
              >
                <HStack spacing={4}>
                  <Heading size='sm'>Mode</Heading>
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
                  <Heading size='sm'>Question Number</Heading>
                  <Radio value='10'>10</Radio>
                  {
                    [20, 50].map((num, index) => {
                      return (
                        <Radio 
                          value={num.toString()} 
                          key={`${num}-${index}`}
                        >
                          {num}
                        </Radio>
                      )
                    })
                  }
                </HStack>
              </RadioGroup>
            </HStack>

            <Divider />

            <RadioGroup
              onChange={setSelectedSource}
              value={selectedSource}
            >
              <VStack align='flex-start'>
                <HStack align='flex-start'>
                  <Heading size='sm'>Source</Heading>
                  <Tooltip 
                    hasArrow
                    bg='teal'
                    placement='right'
                    label={`Due to the limitations of AI's capabilities, questions generated by ChatGPT may not be entirely accurate. On the other hand, public datasets used for AI training serve as alternative sources that offer significantly higher accuracy.`}
                  >
                    <span><Icon as={MdErrorOutline} boxSize={5} color='red.500' /></span>
                  </Tooltip>
                </HStack>
                <Wrap>
                  {sources.slice(0,5).map((source, index) => {
                    return (
                      <WrapItem key={`${source}-${index}`} minW='150px'>
                        <Radio value={source}>
                          {source}
                        </Radio>
                      </WrapItem>
                    )
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
              <VStack align='flex-start'>
                <HStack align='flex-start'>
                  <Heading size='sm'>Level</Heading>
                </HStack>
                <Wrap>
                  {levels.map((level, index) => {
                    return (
                      <WrapItem key={`${level}-${index}`} minW='150px'>
                        <Radio
                          value={level}
                          isDisabled={
                            selectedSource !== QuestionSource.ChatGPT
                          }
                        >
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </Radio>
                      </WrapItem>
                    )
                  })}
                  {competitionLevels.map((level, index) => {
                    return (
                      <WrapItem key={`${level}-${index}`} minW='150px'>
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
                    )
                  })}
                </Wrap>
              </VStack>
            </RadioGroup>

            <Divider />

            <CheckboxGroup
              value={selectedConcepts}
              isDisabled={
                selectedSource !== QuestionSource.ChatGPT &&
                selectedSource !== QuestionSource.Hendrycks
              }
            >
              <VStack align='flex-start'>
                <Checkbox
                  isChecked={allConceptsChecked}
                  isIndeterminate={isConceptIndeterminate}
                  onChange={setAllCheckedConcepts}
                >
                  <Heading size='sm'>Concepts</Heading>
                </Checkbox>
                <Wrap>
                  {concepts.map((concept, index) => {
                    return (
                      <WrapItem key={`${concept}-${index}`} minW='180px'>
                        <Checkbox
                          value={concept}
                          isDisabled={selectedSource !== QuestionSource.ChatGPT}
                          onChange={(e) => setCheckedConcepts(e.target.value as MathConcept)}
                        >
                          {concept.charAt(0).toUpperCase() + concept.slice(1)}
                        </Checkbox>
                      </WrapItem>
                    )
                  })}
                  {hendrycksConcepts.map((concept, index) => {
                    return (
                      <WrapItem key={`${concept}-${index}`} minW='180px'>
                        <Checkbox
                          value={concept}
                          isDisabled={selectedSource !== QuestionSource.Hendrycks}
                          onChange={(e) => setCheckedConcepts(e.target.value as MathConcept)}
                        >
                          {concept.charAt(0).toUpperCase() + concept.slice(1)}
                        </Checkbox>
                      </WrapItem>
                    )
                  })}
                </Wrap>
              </VStack>
            </CheckboxGroup>
            <HStack w='full' align='flex-start'>
              <Spacer />
              
            </HStack>
            <Spacer />

            <HStack w='full'>
              <Button
                variant='ghost'
                onClick={savedQuestionsButtonClickedHandler}
                isDisabled={dataStoreUser!.membership!.current < 2}
              >
                My saved questions
              </Button>
              <Spacer />
              <Button
                onClick={startButtonClickedHandler}
                isDisabled={
                  ((selectedSource === QuestionSource.ChatGPT ||
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
              title='Recent tests'
              defaultPageStep={10}
              refreshTrigger={refreshTestList}
            />


            <Modal
              isOpen={isOpenExamModal} 
              onClose={modalClosedHandler}
              scrollBehavior='inside'
              size='full'
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
          <Spacer />
          <Footer/>
        </Flex>
      }
    </WithAuth>
  )
}

export default MathExam