import Footer from '@/components/Common/Footer';
import Header from '@/components/Common/Header';
import SharedComponents from '@/components/Common/SharedComponents';
import WithAuth from '@/components/Common/WithAuth';
import QuestionRun, { QuestionRunMode } from '@/components/Math/QuestionRun';
import { Statistic, Test } from '@/models';
import { InitStatistic, addStatisticData, getTodayStatistic } from '@/types/statistic';
import { MathConcept, QuestionCategory, QuestionLevel, QuestionType } from '@/types/types';
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
import { useContext, useEffect, useState } from 'react'
import TestList from '@/components/Math/TestList';
import { MdHelpOutline } from 'react-icons/md';

function MathExam() {
  const { 
    isOpen: isOpenExamModal, 
    onOpen: onOpenExamModal, 
    onClose: onCloseExamModal
  } = useDisclosure();

  const concepts = Object.values(MathConcept);
  const levels = [
    ...Object.values(QuestionLevel).slice(0,15), 
  ];
  const competitionLevels = [ ...Object.values(QuestionLevel).slice(15, 20) ];
  const [ selectedConcepts, setSelectedConcepts ] = useState<MathConcept[]>([MathConcept.Arithmetic]);
  const [ selectedLevel, setSelectedLevel ] = useState<string>(QuestionLevel.GSM8K);
  const [ num, setNum ] = useState('10');
  const [ mode, setMode ] = useState(QuestionRunMode.Practice as string);
  const { dataStoreUser, setDataStoreUser } = useContext(SharedComponents);
  const allConceptsChecked = concepts.length === selectedConcepts.length;
  const isConceptIndeterminate = selectedConcepts.length > 0 && selectedConcepts.length < concepts.length;
  const [ selectedTest, setSelectedTest ] = useState<Test>();
  const toast = useToast();
  const [ refreshTestList, setRefreshTestList ] = useBoolean(false);

  useEffect(() => {
    if (mode === QuestionRunMode.Competition) {
      setSelectedLevel(QuestionLevel.Level1);
      setNum('50');
    } else {
      setSelectedLevel(QuestionLevel.GSM8K);
      if (mode === QuestionRunMode.Test) setNum('20');
      else if (mode === QuestionRunMode.Practice) setNum('10');
    }

  }, [mode]);

  const setCheckedConcepts = (value: MathConcept) => {
    let concepts = selectedConcepts;
    const index = concepts.indexOf(value);

    if (index > -1) {
      concepts.splice(index, 1);
      setSelectedConcepts([...concepts]);
    } else {
      setSelectedConcepts([...concepts, value]);
    }
  }

  const setAllCheckedConcepts = () => {
    if (selectedConcepts.length === 0) {
      setSelectedConcepts(concepts);
    } else {
      setSelectedConcepts([]);
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

    if (mode === QuestionRunMode.SavedQuestions) return; // Saved question doesn't consume quota

    const statistic: Statistic = {
      ...InitStatistic,
      mathRequest: Number(num)
    }

    setDataStoreUser(await addStatisticData(statistic, user.id));
  }

  const openModalWithTest = (test: Test) => {
    setSelectedTest(test);
    setNum(test.questionSets.length.toString());
    setMode(QuestionRunMode.Review);
    setTimeout(()=>{
      onOpenExamModal();
    }, 100);
  }

  const modalClosedHandler = () => {
    onCloseExamModal();
    setMode(QuestionRunMode.Practice);
    setNum('10');
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
            <RadioGroup onChange={setMode} value={mode}>
              <HStack spacing={4}>
                <Heading size='sm'>Mode</Heading>
                <Radio value={QuestionRunMode.Practice}>Practice</Radio>
                <Radio 
                  value={QuestionRunMode.Test}
                  isDisabled={dataStoreUser!.membership!.current < 2}
                >
                  Test
                </Radio>
                <Radio 
                  value={QuestionRunMode.Competition}
                  isDisabled={dataStoreUser!.membership!.current < 2}
                >
                  Competition
                </Radio>
                <Radio 
                  value={QuestionRunMode.SavedQuestions}
                  isDisabled={dataStoreUser!.membership!.current < 2}
                >
                  Saved Questions
                </Radio>
              </HStack>
            </RadioGroup>
            <RadioGroup 
              onChange={setNum} 
              value={num} 
              isDisabled={
                dataStoreUser!.membership!.current < 2 ||
                mode === QuestionRunMode.Competition ||
                mode === QuestionRunMode.SavedQuestions
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

            <Divider />

            <RadioGroup
              onChange={setSelectedLevel}
              value={selectedLevel}
              isDisabled={mode === QuestionRunMode.SavedQuestions}
            >
              <VStack align='flex-start'>
                <HStack align='flex-start'>
                  <Heading size='sm'>Level</Heading>
                  <Tooltip 
                    hasArrow
                    bg='teal'
                    placement='right'
                    label={`Year level questions are generated by AI. Due to the limitation of AI's capability questions generated by AI maybe not accurate. Others are public dataset for AI training which can also be used to practice. The difficulty level is GSM8K < MathQA = AQuA < Competition Levels.`}
                  >
                    <span><Icon as={MdHelpOutline} boxSize={5} /></span>
                  </Tooltip>
                </HStack>
                <Wrap>
                  {levels.map((level, index) => {
                    return (
                      <WrapItem key={`${level}-${index}`} minW='150px'>
                        <Radio
                          value={level}
                          isDisabled={
                            // currentUser.membership.current < 2 ||
                            mode === QuestionRunMode.Competition ||
                            mode === QuestionRunMode.SavedQuestions
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
                          isDisabled={mode !== QuestionRunMode.Competition}
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
              isDisabled={!selectedLevel.includes('Year')}
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
                          isDisabled={!selectedLevel.includes('Year')}
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

            <HStack justify='flex-end' w='full'>
              <Button
                onClick={startButtonClickedHandler}
                isDisabled={!selectedConcepts.length || !selectedLevel}
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