import Footer from '@/components/Common/Footer';
import Header from '@/components/Common/Header';
import SharedComponents from '@/components/Common/SharedComponents';
import WithAuth from '@/components/Common/WithAuth';
import EssayList from '@/components/Writing/EssayList';
import WritingBoard, { WritingMode } from '@/components/Writing/WritingBoard';
import { Essay, Statistic, User } from '@/models';
import { InitStatistic, addStatisticData, getTodayStatistic } from '@/types/statistic';
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
  Text, 
  useDisclosure, 
  useToast, 
  VStack, 
  Wrap,
  WrapItem
} from '@chakra-ui/react'
import { DataStore } from 'aws-amplify';
import { useContext, useState } from 'react'

function Writing() {
  const { 
    isOpen: isOpenExamModal, 
    onOpen: onOpenExamModal, 
    onClose: onCloseExamModal
  } = useDisclosure();

  const types = Object.values(EssayType)
  const topics = Object.values(EssayTopic);
  const levels = Object.values(QuestionLevel).filter(l => l.includes('Year'));
  const [ selectedType, setSelectedType ] = useState<string>(EssayType.Narrative);
  const [ selectedTopic, setSelectedTopic ] = useState<string>(EssayTopic.Society);
  const [ selectedLevel, setSelectedLevel ] = useState<string>(QuestionLevel.Year6);
  const [ selectedEssay, setSelectedEssay ] = useState<Essay>();
  const { currentUser } = useContext(SharedComponents);
  const toast = useToast();

  const startButtonClickedHandler = async () => {
    setSelectedEssay(undefined);
    if (!currentUser) return;

    const user = await DataStore.query(User, currentUser.id);
    if (!user) return;

    const todayStatistic = await getTodayStatistic(user);

    if (
      todayStatistic &&
      user.quota &&
      user.quota.writingPerDay - todayStatistic.writingRequest < 1
    ) {
      toast({
        description: `The number of writing topic you generated today exceeded your current quota.`,
        status: 'error',
        duration: 5000,
        isClosable: true
      });

      return;
    }

    setTimeout(()=>onOpenExamModal(), 100);

    const statistic: Statistic = {
      ...InitStatistic,
      writingRequest: 1
    }

    await addStatisticData(statistic, undefined, user);
  }

  const openModalWithEssay = (essay: Essay) => {
    setSelectedEssay(essay);
    setSelectedLevel(essay.level);
    setSelectedTopic(essay.topic);
    setSelectedType(essay.type);
    setTimeout(()=>onOpenExamModal(), 100);
  }

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
              <VStack align='flex-start'>
                <Heading size='sm'>Level</Heading>
                <Wrap>
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
              </VStack>
            </RadioGroup>

            <Divider />
              
            <HStack justify='flex-end' w='full'>
              <Button
                onClick={startButtonClickedHandler}
              >
                Start
              </Button>
            </HStack>

            <Divider />

            <EssayList 
              selectCallback={openModalWithEssay}
              title='Recent Essays'
              defaultPageStep={10}
            />

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
                    initEssay={selectedEssay}
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