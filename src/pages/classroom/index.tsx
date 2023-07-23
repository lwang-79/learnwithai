import Introduction from '@/components/Classroom/Introduction';
import Layout from '@/components/Common/Layout'
import SharedComponents from '@/components/Common/SharedComponents';
import { getDialogue, getNextRole } from '@/types/classroom/dialogue';
import { Boys, Character, ChatMessage, Girls, Teachers } from '@/types/classroom/types'
import { 
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar, 
  Button, 
  HStack, 
  Icon,
  IconButton, 
  Input, 
  InputGroup, 
  InputLeftAddon, 
  NumberDecrementStepper, 
  NumberIncrementStepper, 
  NumberInput, 
  NumberInputField, 
  NumberInputStepper, 
  Select, 
  Spacer, 
  Tag, 
  Tooltip, 
  useBoolean, 
  useDisclosure, 
  useToast, 
  VStack 
} from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react'
import { MdPause, MdPlayArrow, MdStop } from 'react-icons/md';

const MAX_ROUND = 10;

function Classroom() {
  const [ level, setLevel ] = useState('year-4');
  const [ subject, setSubject ] = useState('math');
  const [ concept, setConcept ] = useState('ratio');
  const [ selectedTeacher, setSelectedTeacher ] = useState(Teachers[0]);
  const [ maxRound, setMaxRound ] = useState(MAX_ROUND);
  const charactersRef = useRef<Character[]>([Teachers[0]]); 
  const currentRoleRef = useRef('');
  const messagesRef = useRef<ChatMessage[]>([]);
  const dialoguesRef = useRef<ChatMessage[]>([]);
  const [ dialogues, setDialogues ] = useState(dialoguesRef.current);
  const { apiName } = useContext(SharedComponents);
  const isPlayingRef = useRef(false);
  const [ isPlaying, setIsPlaying ] = useState(isPlayingRef.current);
  const [ isFetchingFinished, setIsFetchingFinished ] = useState(true);
  const [ isPlayingFinished, setIsPlayingFinished ] = useState(true);
  const roundRef = useRef(0);
  const { dataStoreUser } = useContext(SharedComponents);
  const [ isTimedOut, setIsTimedOut ] = useBoolean(true);
  const toast = useToast();
  const cancelRef = useRef(null);

  const { 
    isOpen: isOpenStopAlert, 
    onOpen: onOpenStopAlert, 
    onClose: onCloseStopAlert 
  } = useDisclosure();

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTimedOut.toggle();
    }, 10000);
    return () => clearInterval(interval);
  }, [setIsTimedOut]);

  useEffect(() => {
    if (!isPlaying) return;
    
    const length = dialogues.length;

    if (length === maxRound) {
      isPlayingRef.current = false;
      setIsPlaying(isPlayingRef.current);
      setIsPlayingFinished(true);
    }

    if (dialoguesRef.current.length > length ) {
      const newDialogues = dialoguesRef.current.slice(-(length+1));
      setDialogues(newDialogues);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimedOut]);

  const selectedTeacherChangedHandler = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    
    const name = target.value;

    const teacher = Teachers.find(teacher => teacher.name === name);

    if (teacher) {
      setSelectedTeacher(teacher);
    }
  }
  

  const startButtonClickedHandler = async () => {
    if (isFetchingFinished && !isPlayingFinished) {
      isPlayingRef.current = true;
      setIsPlaying(isPlayingRef.current);
      return;
    }

    if (isFetchingFinished) {
      if (!dataStoreUser) return;

      if (maxRound > dataStoreUser.quota!.classroomRound) {
        toast({
          description: `The max round: ${maxRound} exceeded your current quota ${dataStoreUser.quota!.classroomRound}.`,
          status: 'error',
          duration: 5000,
          isClosable: true
        });
        return;
      }

      dialoguesRef.current = [];
      setDialogues(dialoguesRef.current);
      roundRef.current = 0;

      charactersRef.current = [selectedTeacher];

      charactersRef.current.push({
        role: 'student',
        name: dataStoreUser.username,
        gender: 'male',
        skill: Math.floor(Math.random() * 5),
        picture: dataStoreUser.picture
      })

      const randomBoy = Boys[Math.floor(Math.random() * Boys.length)];
      const randomGirl = Girls[Math.floor(Math.random() * Girls.length)];

      charactersRef.current.push(randomBoy);
      charactersRef.current.push(randomGirl);

      let content = `Let's play a role-playing game. The scene takes place in a small ${level} ${subject} class, where students are engaged in a lively discussion or learning session centered around ${concept}. The following characters are included: `;
      for (const character of charactersRef.current) {
        content += `\nrole: ${character.role} name: ${character.name} (${character.gender}) ${subject} skill: ${character.skill} characteristic: ${character.behavior}`;
      }
      content += `You will take on different roles, and I'll indicate your character each time. Remember the rules:
      1. Only speak as the character I indicate.
      2. Keep each response under 50 words.
      3. Exclude my instructions in your response.
      4. Introduce diverse topics or assign tasks to keep the conversation flowing.
      5. Avoid getting stuck in loops.
      6. Instead of naming a specific character, ask "who can" perform an action.
      7. You can incorporate classroom events as well.
      8. Don't generate multiple role's words in one reply.
      Alright, now you are ${charactersRef.current[0].name}. Please say something to start the class.`

      messagesRef.current = [{
        role: 'system',
        content: 'You are a helpful assistant. You role can be changed.'
      }, {
        role: 'user',
        content: content
      }];

      currentRoleRef.current = `${charactersRef.current[0].role}-${charactersRef.current[0].name}`;
  
      setIsFetchingFinished(false);
      setIsPlayingFinished(false);
    }

    isPlayingRef.current = true;
    setIsPlaying(isPlayingRef.current);

    while (isPlayingRef.current && roundRef.current < maxRound) {
      let words = '';
      let nextRole = '';
      let tryCount = 0;

      do {
        try {
          tryCount ++;
          ({ words, nextRole } = await getDialogue(messagesRef.current, apiName))
        } catch (error) {
          
        }
      } while (!words && tryCount < 3)

      if (!words) {
        isPlayingRef.current = false;
        setIsPlaying(isPlayingRef.current);
        toast({
          description: `Something wrong with the server or the server is too busy. Please try it again later!`,
          status: 'error',
          duration: 5000,
          isClosable: true
        });
        break;
      }

      dialoguesRef.current = [
        {
          role: currentRoleRef.current,
          content: words
        },
        ...dialoguesRef.current,
      ];
  
      nextRole = getNextRole(charactersRef.current, currentRoleRef.current, nextRole);
  
      messagesRef.current = [
        ...messagesRef.current, 
        ...[{
          role: 'assistant',
          content: `${currentRoleRef.current.split('-')[1]}: ${words}`
        }, {
          role: 'user',
          content: roundRef.current === maxRound - 2 ? 
            `Now you are ${charactersRef.current[0].name}, please say something to finish the class.` : 
            `Now you are ${nextRole.split('-')[1]}`
        }]
      ];

      currentRoleRef.current = roundRef.current === maxRound - 2 ?
        `${charactersRef.current[0].role}-${charactersRef.current[0].name}` :
        nextRole;

      roundRef.current ++;
      if (roundRef.current === maxRound) {
        dialoguesRef.current = [
          {
            role: 'System-System',
            content: dataStoreUser!.membership!.current < 3 ?
            'Class is finished! Thank you for your participation! Consider upgrading your plan to have more rounds in class.' :
            'Class is finished! Thank you for your participation!'
          },
          ...dialoguesRef.current,
        ];
        setIsFetchingFinished(true);
      }
    }
  }

  const stopButtonClickedHandler = () => {
    isPlayingRef.current = false;
    setIsPlaying(isPlayingRef.current);
    setIsFetchingFinished(true);
    setIsPlayingFinished(true);
    setDialogues([
      {
        role: 'System-System',
        content: 'Class is terminated! Thank you for your participation!'
      },
      ...dialogues,
    ]);
    onCloseStopAlert();
  }  

  const getPicture = (name: string) => {
    const character = charactersRef.current.find(character => character.name === name);
    if (character) {
      return character.picture;
    }
    return '';
  }

  return (
    <Layout>
      <HStack w='full'>
        <VStack align='flex-start' w='full' spacing={4}>
          <HStack w='full'>
            <InputGroup size='sm'>
              <InputLeftAddon>Subject</InputLeftAddon>
              <Input 
                placeholder='Math, Chemistry, English, etc.'
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                isDisabled={!isPlayingFinished}
              />
            </InputGroup>
            <InputGroup size='sm'>
              <InputLeftAddon>Topic</InputLeftAddon>
              <Input 
                placeholder='Optional'
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                isDisabled={!isPlayingFinished}
              />
            </InputGroup>
            <InputGroup size='sm' maxW='160px'>
              <InputLeftAddon>Level</InputLeftAddon>
              <Input 
                placeholder='Year-5, Graduate'
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                isDisabled={!isPlayingFinished}
              />
            </InputGroup>

            <InputGroup size='sm'>
              <InputLeftAddon>Teacher</InputLeftAddon>
              <Select 
                isDisabled={!isPlayingFinished}
                placeholder='Choose a teacher'
                value={selectedTeacher.name}
                onChange={selectedTeacherChangedHandler}
                focusBorderColor='teal.500'
              >
                {Teachers.map(teacher => 
                  <option value={teacher.name} key={teacher.name}>
                    {teacher.name}
                  </option>)}
              </Select>
            </InputGroup>

            <InputGroup size='sm' maxW='130px'>
              <InputLeftAddon>Round</InputLeftAddon>
              {dataStoreUser &&
              <NumberInput 
                value={maxRound}
                isDisabled={!isPlayingFinished}
                min={5} max={dataStoreUser.quota!.classroomRound} step={5}
                onChange={(valueAsString, valueAsNumber) => setMaxRound(valueAsNumber)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>}
            </InputGroup>
            
            <Spacer />
            {isPlaying ? 
              <Tooltip label='Pause' hasArrow>
                <IconButton
                  rounded='full'
                  variant='ghost'
                  aria-label='Start'
                  icon={<Icon as={MdPause} boxSize={6} />}
                  isDisabled={!isPlaying}
                  onClick={()=>{
                    isPlayingRef.current = false;
                    setIsPlaying(isPlayingRef.current);
                  }}              
                />
              </Tooltip> :
              <Tooltip label={isPlayingFinished? 'Start' : 'Continue'} hasArrow>
                <IconButton
                  rounded='full'
                  variant='ghost'
                  aria-label='Start'
                  icon={<Icon as={MdPlayArrow} boxSize={6} />}
                  isDisabled={isPlaying}
                  onClick={startButtonClickedHandler}
                />
              </Tooltip>
            }
            <Tooltip label='Terminate' hasArrow>
              <IconButton
                rounded='full'
                variant='ghost'
                aria-label='Start'
                icon={<Icon as={MdStop} boxSize={6} />}
                isDisabled={isPlayingFinished}
                onClick={onOpenStopAlert}
              />
            </Tooltip>
            
          </HStack>
          {!isPlayingFinished || dialogues.length > 0  ? 
            <>
              {dialogues.length > 0 ? 
              <>
                {dialogues.map((dialogue, index) => 
                  <HStack key={index} w='full'>
                  {dialogue.role.split('-')[0] === 'teacher' || dialogue.role.split('-')[0] === 'System' ? (
                    <>
                      <Tooltip label={dialogue.role.split('-')[1]} hasArrow>
                        <Avatar borderWidth='2px' borderColor='gray.200' name={dialogue.role.split('-')[1]} size='sm' mr={2} src={getPicture(dialogue.role.split('-')[1])} />
                      </Tooltip>
                      <Tag p={2} w='full' colorScheme='orange'>
                        {`${dialogue.content}`}
                      </Tag>
                    </>
                  ) : (
                    <>
                      <Tag p={2} w='full' colorScheme='blue'>
                        {`${dialogue.content}`}
                      </Tag>
                      <Tooltip label={dialogue.role.split('-')[1]} hasArrow>
                        <Avatar borderWidth='2px' borderColor='gray.200' name={dialogue.role.split('-')[1]} size='sm' mr={2} src={getPicture(dialogue.role.split('-')[1])} />
                      </Tooltip>
                    </>
                  )}
                  </HStack>
                )}
              </> : <Tag p={10} w='full' colorScheme='blue'>Class will start soon.</Tag>}
            </> : <Introduction />
          }
          
        </VStack>
      </HStack>

      <AlertDialog
        isOpen={isOpenStopAlert}
        leastDestructiveRef={cancelRef}
        onClose={onCloseStopAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Terminate?
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to terminate the class?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button 
                ref={cancelRef} 
                onClick={onCloseStopAlert}
                rounded={'full'}
                px={6}
              >
                Cancel
              </Button>
              <Button 
                colorScheme='red' 
                rounded={'full'}
                px={6}
                onClick={stopButtonClickedHandler} 
                ml={3}
              >
                Terminate
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      
    </Layout>
  )
}

export default Classroom