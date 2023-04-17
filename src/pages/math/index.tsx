import Footer from '@/components/Common/Footer';
import Header from '@/components/Common/Header';
import SharedComponents from '@/components/Common/SharedComponents';
import WithAuth from '@/components/Common/WithAuth';
import QuestionRun, { QuestionRunMode } from '@/components/Math/QuestionRun';
import { Statistic, Test, User } from '@/models';
import { InitStatistic, addStatisticData, getTodayStatistic } from '@/types/statistic';
import { getConcepts } from '@/types/math';
import { MathConcept, QuestionCategory, QuestionLevel, QuestionType } from '@/types/types';
import { 
  Button, 
  Checkbox, 
  CheckboxGroup, 
  Divider, 
  Flex, 
  Heading, 
  HStack, 
  Modal, 
  ModalBody, 
  ModalContent, 
  ModalOverlay, 
  Radio, 
  RadioGroup, 
  Spacer, 
  Text, 
  useDisclosure, 
  useToast, 
  VStack, 
  Wrap,
  WrapItem
} from '@chakra-ui/react'
import { DataStore } from 'aws-amplify';
import Script from 'next/script';
import { useContext, useEffect, useState } from 'react'
import TestList from '@/components/Math/TestList';

function MathExam() {
  const { 
    isOpen: isOpenExamModal, 
    onOpen: onOpenExamModal, 
    onClose: onCloseExamModal
  } = useDisclosure();

  const concepts = Object.values(MathConcept);
  const levels = [
    ...Object.values(QuestionLevel).slice(0,6), 
    ...Object.values(QuestionLevel).slice(12,15)
  ];
  const competitionLevels = [ ...Object.values(QuestionLevel).slice(15, 20) ];
  const [ selectedConcepts, setSelectedConcepts ] = useState<MathConcept[]>([MathConcept.Arithmetic]);
  const [ selectedLevel, setSelectedLevel ] = useState<string>(QuestionLevel.GSM8K);
  const [ num, setNum ] = useState('10');
  const [ mode, setMode ] = useState(QuestionRunMode.Practice as string);
  const { currentUser } = useContext(SharedComponents);
  const allConceptsChecked = concepts.length === selectedConcepts.length;
  const isConceptIndeterminate = selectedConcepts.length > 0 && selectedConcepts.length < concepts.length;
  const [ selectedTest, setSelectedTest ] = useState<Test>();
  const toast = useToast();

  useEffect(() => {
    if (mode === QuestionRunMode.Competition) {
      setSelectedLevel(QuestionLevel.Level1);
      setNum('50');
    } else {
      setSelectedLevel(QuestionLevel.GSM8K);
      if (mode === QuestionRunMode.Test) setNum('20');
      else setNum('10');
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
    if (!currentUser) return;

    const user = await DataStore.query(User, currentUser.id);
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

    const statistic: Statistic = {
      ...InitStatistic,
      mathRequest: Number(num)
    }

    await addStatisticData(statistic, undefined, user);
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
  }


  return (
    <WithAuth href='/login'>
      {currentUser &&
        <Flex
          minH='100vh'
          direction='column'
        >
          <Header />
          {/* <Script async 
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8667628388061043"
            crossOrigin="anonymous">
          </Script> */}

          <VStack minW='lg' maxW='5xl' mx='auto' mt='24' px={10} spacing={4} align='flex-start'>
            <RadioGroup onChange={setMode} value={mode}>
              <HStack spacing={4}>
                <Heading size='sm'>Mode</Heading>
                <Radio value={QuestionRunMode.Practice}>Practice</Radio>
                <Radio 
                  value={QuestionRunMode.Test}
                  isDisabled={currentUser!.membership.current < 2}
                >
                  Test
                </Radio>
                <Radio 
                  value={QuestionRunMode.Competition}
                  isDisabled={currentUser!.membership.current < 2}
                >
                  Competition
                </Radio>
              </HStack>
            </RadioGroup>
            <RadioGroup 
              onChange={setNum} 
              value={num} 
              isDisabled={
                currentUser!.membership.current < 2 ||
                mode === QuestionRunMode.Competition
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
            >
              <VStack align='flex-start'>
                <Heading size='sm'>Level</Heading>
                <Text fontSize='xs' color='red'>
                  {`Year level questions are generated by AI. Due to the limitation of AI's capability questions generated by AI maybe not accurate. Others are public dataset for AI training which can also be used to practice. The difficulty level is GSM8K < MathQA = AQuA.`}
                </Text>
                <Wrap>
                  {levels.map((level, index) => {
                    return (
                      <WrapItem key={`${level}-${index}`} minW='150px'>
                        <Radio
                          value={level}
                          isDisabled={
                            currentUser.membership.current < 2 ||
                            mode === QuestionRunMode.Competition
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

            <Divider />
            
            <TestList 
              selectCallback={openModalWithTest}
              title='Recent tests'
              defaultPageStep={10}
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
                    maxNum={Number(num)}
                    mode={mode as QuestionRunMode}
                    onClose={modalClosedHandler}
                    test={selectedTest}
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