import Footer from '@/components/Common/Footer';
import Header from '@/components/Common/Header';
import SharedComponents from '@/components/Common/SharedComponents';
import WithAuth from '@/components/Common/WithAuth';
import WritingBoard, { WritingMode } from '@/components/Writing/WritingBoard';
import { EssayTopic, EssayType, QuestionLevel } from '@/types/types';
import { 
  Button, 
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
import { useContext, useState } from 'react'

function Writing() {
  const { 
    isOpen: isOpenExamModal, 
    onOpen: onOpenExamModal, 
    onClose: onCloseExamModal
  } = useDisclosure();

  const types = Object.values(EssayType)
  const topics = Object.values(EssayTopic);
  const levels = Object.values(QuestionLevel);
  const [ selectedType, setSelectedType ] = useState<string>(EssayType.Persuasive);
  const [ selectedTopic, setSelectedTopic ] = useState<string>(EssayTopic.Society);
  const [ selectedLevel, setSelectedLevel ] = useState<string>(QuestionLevel.Year6);
  // const [ mode, setMode ] = useState<string>(WritingMode.Essay);
  const { currentUser } = useContext(SharedComponents);

  // const setCheckedTopics = (value: MathConcept) => {
  //   let topics = selectedTopics;
  //   const index = topics.indexOf(value);

  //   if (index > -1) {
  //     topics.splice(index, 1);
  //     setSelectedTopics([...topics]);
  //   } else {
  //     setSelectedTopics([...topics, value]);
  //   }
  // }

  return (
    <WithAuth href='/login'>
      {currentUser &&
        <Flex
          minH='100vh'
          direction='column'
        >
          <Header />

          <VStack minW='lg' maxW='5xl' mx='auto' mt='24' px={10} spacing={4} align='flex-start'>
            <RadioGroup onChange={setSelectedType} value={selectedType}>
              <Heading size='sm'>Type</Heading>
              <Wrap spacing={4} mt={2}>
                {
                  types.map((type, index) => {
                    return (
                      <WrapItem key={`${type}-${index}`}>
                        <Radio value={type} >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </Radio>
                      </WrapItem>
                    )
                  })
                }
              </Wrap>
            </RadioGroup>
            <RadioGroup 
              onChange={setSelectedTopic} 
              value={selectedTopic} 
              isDisabled={selectedType===EssayType.Narrative}
            >
              <Heading size='sm'>Topic</Heading>
              <Wrap spacing={4} mt={2}>
                {
                  topics.map((topic, index) => {
                    return (
                      <WrapItem key={`${topic}-${index}`}>
                        <Radio value={topic} >
                          {topic.charAt(0).toUpperCase() + topic.slice(1)}
                        </Radio>
                      </WrapItem>
                    )
                  })
                }
              </Wrap>
            </RadioGroup>
            <RadioGroup onChange={setSelectedLevel} value={selectedLevel}>
              <Heading size='sm'>Level</Heading>
              <Wrap spacing={4} mt={2}>
                {
                  levels.slice(0,12).map((level, index) => {
                    return (
                      <WrapItem key={`${level}-${index}`}>
                        <Radio value={level} >
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </Radio>
                      </WrapItem>
                    )
                  })
                }
              </Wrap>
            </RadioGroup>


            <Divider />

            <HStack w='full' align='flex-start'>
              <Spacer />
              
            </HStack>
            <Spacer />

            <HStack justify='flex-end' w='full'>
              <Button
                onClick={onOpenExamModal}
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
                  <WritingBoard 
                    level={selectedLevel as QuestionLevel}
                    topic={selectedTopic as EssayTopic}
                    type={selectedType as EssayType}
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

export default Writing