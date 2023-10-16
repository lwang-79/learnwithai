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
  Progress, 
  Select, 
  Spacer, 
  Tag, 
  Text, 
  Tooltip, 
  useBoolean, 
  useDisclosure, 
  useToast, 
  VStack 
} from '@chakra-ui/react';
import { Predictions } from 'aws-amplify';
import Script from 'next/script';
import { useContext, useEffect, useRef, useState } from 'react'
import { MdPause, MdPlayArrow, MdStop, MdVolumeOff, MdVolumeUp } from 'react-icons/md';
import { Player } from '@lottiefiles/react-lottie-player';

const MAX_ROUND = 10;

function Classroom() {
  const [ level, setLevel ] = useState('year-4');
  const [ subject, setSubject ] = useState('math');
  const [ concept, setConcept ] = useState('ratio');
  const [ selectedTeacher, setSelectedTeacher ] = useState(Teachers[0]);
  const maxRoundRef = useRef(MAX_ROUND);
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
  const [ isAudioEnabled, setIsAudioEnabled ] = useState(false);
  const [ isAudioPlaying, setIsAudioPlaying ] = useState(false);
  const [ audioPlayToggle, setAudioPlayToggle ] = useBoolean(false);
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
    }, 8000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isAudioPlaying || !isPlaying) return;

    const length = dialogues.length;

    if (length == maxRoundRef.current) {
      isPlayingRef.current = false;
      setIsPlaying(isPlayingRef.current);
      setIsPlayingFinished(true);
      maxRoundRef.current = maxRound;
    }

    const playSpeech = async (text: string, voice: string = "Joey") => {
      try {
        const result = await Predictions.convert({
          textToSpeech: {
            source: {
              text: text,
            },
            voiceId: voice,
          }
        });

        const audio = new Audio(result.speech.url);

        const playAudio = (audio: HTMLAudioElement) => {
          return new Promise(res=>{
            audio.play()
            audio.onended = res
          })
        }
        await playAudio(audio);

      } catch (error) {
        console.error(error);
      }
    }

    if (dialoguesRef.current.length > length ) {
      const newDialogues = dialoguesRef.current.slice(-(length+1));
      setDialogues(newDialogues);

      if (isAudioEnabled) {
        setIsAudioPlaying(true);
        const voice = charactersRef.current.find(character => character.name === newDialogues[0].role.split('-')[1])?.voice;
        playSpeech(newDialogues[0].content, voice).then(() => {
          setIsAudioPlaying(false);
          setTimeout(() => {setAudioPlayToggle.toggle()},1000);
        });
      }
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioPlayToggle, isTimedOut]);

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

      if (maxRoundRef.current > dataStoreUser.quota!.classroomRound) {
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
        gender: 'female',
        skill: Math.floor(Math.random() * 5),
        picture: dataStoreUser.picture,
        voice: 'Ivy'
      })

      const randomBoy = Boys[Math.floor(Math.random() * Boys.length)];
      const randomGirl = Girls[Math.floor(Math.random() * Girls.length)];

      charactersRef.current.push({...randomBoy, voice: 'Justin'});
      charactersRef.current.push({...randomGirl, voice: 'Salli'});

      let content = `Let's play a role-playing game. The scene takes place in a small ${level} ${subject} class, where students are engaged in a lively discussion or learning session centered around ${concept}. The following characters are included: `;
      for (const character of charactersRef.current) {
        content += `\nrole: ${character.role} name: ${character.name} (${character.gender}) ${subject} skill: ${character.skill} characteristic: ${character.behavior}`;
      }
      content += `You will take on different roles, and I'll indicate your character each time. Remember the rules:
      1. Only speak as the character I indicate.
      2. Don't generate multiple role's words in one reply.
      3. Keep each response under 50 words.
      4. Exclude my instructions in your response.
      5. Introduce diverse questions or practices to keep the conversation flowing.
      6. Don't finish the class unless I ask you to do that.
      7. Avoid getting stuck in question loops.
      8. Instead of naming a specific character, ask "who can" perform an action.
      9. If ask specific character to action, indicate the character's name in the nextRole of the function.
      Alright, now you are ${charactersRef.current[0].name}. Please start the class by explaining ${concept}.`

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
    if (isAudioEnabled) { setAudioPlayToggle.toggle() }

    while (
      isPlayingRef.current && 
      roundRef.current < maxRoundRef.current
    ) {
      let words = '';
      let nextRole = '';
      let tryCount = 0;

      do {
        try {
          tryCount ++;
          ({ words, nextRole } = await getDialogue(messagesRef.current, apiName))
        } catch (error) {
          console.error(error);
        }
      } while (!words && tryCount < 3)

      console.log(`nextRole from function: ${nextRole}`)

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

      if (words.includes('nextRole: ')) {
        if (!nextRole) {
          nextRole = words.split('nextRole: ')[1];
        }
        words = words.split('nextRole: ')[0];
      }

      console.log(`nextRole from words: ${nextRole}`)

      dialoguesRef.current = [
        {
          role: currentRoleRef.current,
          content: words
        },
        ...dialoguesRef.current,
      ];
  
      nextRole = getNextRole(charactersRef.current, currentRoleRef.current, nextRole);
  
      console.log(`Final nextRole: ${nextRole}`)

      const currentRole = currentRoleRef.current;
      const assistantContent = `${currentRoleRef.current.split('-')[1]}: ${words}`;
      let userContent = `Now you are ${nextRole.split('-')[1]}`;
      currentRoleRef.current = nextRole;

      if (roundRef.current >= maxRoundRef.current - 2) {
        if (!currentRole.includes('teacher')) {

          currentRoleRef.current = `${charactersRef.current[0].role}-${charactersRef.current[0].name}`;
          userContent = `Now you are ${charactersRef.current[0].name}, please answer the last question if have and say something to finish the class.`;
        
        } else if (roundRef.current === maxRoundRef.current - 2){
          // add one more round to avoid teacher finish the class as soon as he/she asked a new question.
          maxRoundRef.current += 1;
        }
      }
        
      messagesRef.current = [
        ...messagesRef.current, 
        ...[{
          role: 'assistant',
          content: assistantContent
        }, {
          role: 'user',
          content: userContent
        }]
      ];

      roundRef.current ++;
      if (isAudioEnabled) { setAudioPlayToggle.toggle() }

      if (roundRef.current === maxRoundRef.current) {
        dialoguesRef.current = [
          {
            role: 'System-System',
            content: dataStoreUser!.membership!.current < 3 ?
            'Class is finished! Thank you! Consider upgrading your plan to have more rounds in class.' :
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
    setIsAudioPlaying(false);
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
    return '/classroom/system.png';
  }

  return (
    <Layout>
      <Script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" />
      <VStack align='flex-start' w='full' spacing={4}>
        <VStack spacing={1}>
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
                onChange={(valueAsString, valueAsNumber) => {
                  maxRoundRef.current = valueAsNumber;
                  setMaxRound(maxRoundRef.current);
                }}
                focusBorderColor='teal.500'
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
                  size='sm'
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
                  size='sm'
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
                size='sm'
                icon={<Icon as={MdStop} boxSize={6} />}
                isDisabled={isPlayingFinished}
                onClick={onOpenStopAlert}
              />
            </Tooltip>
            {dataStoreUser && isAudioEnabled ? 
              <Tooltip label='Mute from next' hasArrow>
                <IconButton
                  rounded='full'
                  variant='ghost'
                  aria-label='Start'
                  size='sm'
                  icon={<Icon as={MdVolumeUp} boxSize={6} />}
                  onClick={()=>setIsAudioEnabled(false)}              
                />
              </Tooltip> : dataStoreUser &&
              <Tooltip label={dataStoreUser.membership!.current > 1 ? 'Unmute from next' : 'No available for your current plan'} hasArrow>
                <IconButton
                  rounded='full'
                  variant='ghost'
                  aria-label='Start'
                  size='sm'
                  icon={<Icon as={MdVolumeOff} boxSize={6} />}
                  isDisabled={dataStoreUser.membership!.current < 2}
                  onClick={()=>setIsAudioEnabled(true)}
                />
              </Tooltip>
            }
            
          </HStack>
          <Progress size='xs' colorScheme='teal' w='full' hasStripe isAnimated={isPlaying} value={isPlaying? 100: 0}/>
        </VStack>
        {!isPlayingFinished || dialogues.length > 0  ? 
          <>
            {dialogues.length > 0 ? 
            <>
              {dialogues.map((dialogue, index) => 
                <HStack key={index} w='full'>
                {dialogue.role.split('-')[0] === 'teacher' || dialogue.role.split('-')[0] === 'System' ? (
                  <>
                    <Tooltip label={dialogue.role.split('-')[1]} hasArrow>
                      <HStack spacing={0}>
                        <Avatar borderWidth='2px' borderColor='gray.200' name={dialogue.role.split('-')[1]} size='sm' mr={2} src={getPicture(dialogue.role.split('-')[1])} />
                        {index === 0 && isAudioPlaying && <Player src='/classroom/sound.json' autoplay loop style={{ height: '30px', width: '30px' }} />}
                      </HStack>
                    </Tooltip>
                    <Tag p={2} w='full' colorScheme='orange'>
                        {dialogue.content}                        
                    </Tag>
                  </>
                ) : (
                  <>
                    <Tag p={2} w='full' colorScheme='blue'>
                      <Text as='span'>
                        {dialogue.content}
                      </Text>
                      
                    </Tag>
                    <Tooltip label={dialogue.role.split('-')[1]} hasArrow>
                      <HStack>
                        {index === 0 && isAudioPlaying && <Player src='/classroom/sound.json' autoplay loop style={{ height: '30px', width: '30px' }} />}
                        <Avatar borderWidth='2px' borderColor='gray.200' name={dialogue.role.split('-')[1]} size='sm' mr={2} src={getPicture(dialogue.role.split('-')[1])} />
                      </HStack>
                    </Tooltip>
                  </>
                )}
                </HStack>
              )}
            </> : <Tag p={4} w='full' colorScheme='blue'>Class will start soon.</Tag>}
          </> : <Introduction />
        }
        
      </VStack>

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