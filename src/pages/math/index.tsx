import Footer from '@/components/Common/Footer';
import Header from '@/components/Common/Header';
import SharedComponents from '@/components/Common/SharedComponents';
import WithAuth from '@/components/Common/WithAuth';
import QuestionRun, { QuestionRunMode } from '@/components/Math/QuestionRun';
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
  useDisclosure, 
  VStack, 
  Wrap,
  WrapItem
} from '@chakra-ui/react'
import Script from 'next/script';
import { useContext, useState } from 'react'

function MathExam() {
  const { 
    isOpen: isOpenExamModal, 
    onOpen: onOpenExamModal, 
    onClose: onCloseExamModal
  } = useDisclosure();

  const concepts = Object.values(MathConcept);
  const levels = Object.values(QuestionLevel);
  const [ selectedConcepts, setSelectedConcepts ] = useState<MathConcept[]>([]);
  const [ selectedLevels, setSelectedLevels ] = useState<QuestionLevel[]>([]);
  const [ num, setNum ] = useState('10');
  const [ mode, setMode ] = useState(QuestionRunMode.Practice as string);
  const { currentUser } = useContext(SharedComponents);
  const allConceptsChecked = concepts.length === selectedConcepts.length;
  const isConceptIndeterminate = selectedConcepts.length > 0 && selectedConcepts.length < concepts.length;
  const allLevelsChecked = levels.length === selectedLevels.length;
  const isLevelIndeterminate = selectedLevels.length > 0 && selectedLevels.length < levels.length;

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

  const setCheckedLevels = (level: QuestionLevel) => {
    let levels = selectedLevels;
    const index = levels.indexOf(level);

    if (index > -1) {
      levels.splice(index, 1);
      setSelectedLevels([...levels]);
    } else {
      setSelectedLevels([...levels, level]);

      const concepts = getConcepts(level);
      let toAddConcepts: MathConcept[] = [];
      for (const concept of concepts) {
        if (!selectedConcepts.includes(concept)) {
          toAddConcepts.push(concept);
        }
      }
      setSelectedConcepts([...selectedConcepts, ...toAddConcepts]);
    }
  }

  const setAllCheckedLevels = () => {
    if (selectedLevels.length === 0) {
      setSelectedLevels(levels);
    } else {
      setSelectedLevels([]);
    }
  }

  return (
    <WithAuth href='/login'>
      {currentUser &&
        <Flex
          minH='100vh'
          direction='column'
        >
          <Script src="https://polyfill.io/v3/polyfill.min.js?features=es6" />
          <Script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" />

          <Header />

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
              </HStack>
            </RadioGroup>
            <RadioGroup onChange={setNum} value={num}>
              <HStack spacing={4}>
                <Heading size='sm'>Question Number</Heading>
                <Radio value='10'>10</Radio>
                {
                  [20, 50].map((num, index) => {
                    return (
                      <Radio 
                        value={num.toString()} 
                        key={`${num}-${index}`}
                        isDisabled={currentUser!.membership.current < 2}
                      >
                        {num}
                      </Radio>
                    )
                  })
                }
              </HStack>
            </RadioGroup>

            <Divider />

            <CheckboxGroup
              value={selectedLevels}
            >
              <VStack align='flex-start'>
                <Checkbox
                  isChecked={allLevelsChecked}
                  isIndeterminate={isLevelIndeterminate}
                  onChange={setAllCheckedLevels}
                >
                  <Heading size='sm'>Level</Heading>
                </Checkbox>
                <Wrap>
                  {levels.map((level, index) => {
                    return (
                      <WrapItem key={`${level}-${index}`} minW='150px'>
                        <Checkbox
                          value={level}
                          isDisabled={
                            currentUser!.membership.current < 2 && 
                            ((index > 8 && index < 12) || index === 14)
                          }
                          onChange={(e) => setCheckedLevels(e.target.value as QuestionLevel)}
                        >
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </Checkbox>
                      </WrapItem>
                    )
                  })}
                </Wrap>
              </VStack>
            </CheckboxGroup>

            <Divider />

            <CheckboxGroup
              value={selectedConcepts}
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
                          isDisabled={index > 17 && currentUser!.membership.current < 2}
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
                onClick={onOpenExamModal}
                isDisabled={!selectedConcepts.length || !selectedLevels.length}
              >
                Start
              </Button>
            </HStack>

            <Modal
              isOpen={isOpenExamModal} 
              onClose={onCloseExamModal}
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
                    levels={selectedLevels}
                    concepts={selectedConcepts}
                    maxNum={Number(num)}
                    mode={mode as QuestionRunMode}
                    onClose={onCloseExamModal}
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