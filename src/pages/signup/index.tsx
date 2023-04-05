import {
  Flex,
  Box,
  FormControl,
  Icon,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Text,
  useColorModeValue,
  Center,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  PinInput,
  PinInputField,
  Progress,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';
import { MdOutlineSchool, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { Auth } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { useRouter } from 'next/router';
import { createUserIfNotExist } from '../../types/user';
import useStorage from '../../hooks/useStorage';

export default function SignupCard() {
  const { 
    isOpen: isOpenModal, 
    onOpen: onOpenModal, 
    onClose: onCloseModal
  } = useDisclosure();

  const [ showPassword1, setShowPassword1 ] = useState(false);
  const [ showPassword2, setShowPassword2 ] = useState(false);
  const initFormState = {
    email: '',
    password1: '',
    password2: '',
    name: ''
  }
  const [ formState, setFormState ] = useState(initFormState);
  const [ isInProgress, setIsInProgress ] = useState(false);

  const toast = useToast();
  const router = useRouter();
  const { setItem } = useStorage();

  const setInput = (key: string) => (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setFormState({ ...formState, [key]: target.value });
  }

  const signUp = async () => {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (!formState.email.match(validRegex)) {
      toast({
        description: 'Email address is invalid!',
        status: 'error',
        duration: 10000,
        isClosable: true
      });
      return;
    }

    if (!formState.password1 || !formState.password2) {
      toast({
        description: 'Password is required!',
        status: 'error',
        duration: 10000,
        isClosable: true
      });
      return;
    }

    if (formState.password1 !== formState.password2) {
      toast({
        description: 'Password is not matched!',
        status: 'error',
        duration: 10000,
        isClosable: true
      });
      return;
    }

    if (!formState.name) {
      toast({
        description: 'Name is required!',
        status: 'error',
        duration: 10000,
        isClosable: true
      });
      return;
    }

    try {
      const { user } = await Auth.signUp({
        username: formState.email,
        password: formState.password1,
        attributes: {
            email: formState.email,
            name: formState.name,
        },
        autoSignIn: {
            enabled: true,
        }
      });
      onOpenModal();
    } catch (error) {
      console.error('error signing up:', error);
      toast({
        description: error instanceof Error ? error.message : String(error),
        status: 'error',
        duration: 10000,
        isClosable: true
      });
    }
  }

  const sendVerificationCode = async (value: string) => {
    setIsInProgress(true);
    try {
      await Auth.confirmSignUp(formState.email, value);

      const user = await Auth.signIn(formState.email, formState.password1);
      setItem('isAuthenticated', 'true', 'local');
      await createUserIfNotExist(user.attributes);
      onCloseModal();
      setIsInProgress(false);
      router.push('/');
      
    } catch (error) {
      console.log('error confirming sign up', error);
      toast({
        description: error instanceof Error ? error.message : String(error),
        status: 'error',
        duration: 10000,
        isClosable: true
      });
      setIsInProgress(false);
    }
  }

  return (
    <Flex
      minH={'100vh'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} w={'full'} maxW='lg' py={12} px={6}>
        <Stack align={'center'}>
          <HStack align={'flex-end'} justify={'center'}>
            <Text fontSize='xl' align={'end'} >Free sign up to </Text>
            <Link href='/'>
              <Box color={'teal.400'}>
                <Icon as={MdOutlineSchool} boxSize={10}/> 
                <Text as='b' fontSize='xl'>
                  LearnWithAI
                </Text>
              </Box>
            </Link>
          </HStack>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={10} >
            <Stack spacing={4}>
              <Button 
                w={'full'} 
                leftIcon={<Icon as={FcGoogle} boxSize={6} />} 
                onClick={() => Auth.federatedSignIn({
                    provider: CognitoHostedUIIdentityProvider.Google
                })}
              >
                <Center>
                  <Text>Sign in with Google</Text>
                </Center>
              </Button>

              <FormControl id="email" isRequired>
                <Input type="email" placeholder='Email address' onChange={setInput('email')}/>
              </FormControl>
              <FormControl id="password1" isRequired>
                <InputGroup>
                  <Input type={showPassword1 ? 'text' : 'password'} placeholder='Password' onChange={setInput('password1')}/>
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword1(!showPassword1)
                      }>
                      {showPassword1 ? <Icon as={MdVisibility} /> : <Icon as={MdVisibilityOff} />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="password2" isRequired>
                <InputGroup>
                  <Input type={showPassword2 ? 'text' : 'password'} placeholder='Confirm Password' onChange={setInput('password2')} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword2(!showPassword2)
                      }>
                      {showPassword2 ? <Icon as={MdVisibility} /> : <Icon as={MdVisibilityOff} />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="name" isRequired>
                <Input type="text" placeholder='Name' onChange={setInput('name')} />
              </FormControl>
            </Stack>

            <Button
              loadingText="Submitting"
              variant='solid'
              onClick={signUp}
            >
              Sign up
            </Button>
          </Stack>
          <HStack pt={2} align={'center'} justify={'center'}>
            <Text>
              Already a user? 
            </Text>
            <Link href='/login'>
              <Text color={'teal.400'}>Login</Text>
            </Link>
          </HStack>
        </Box>
      </Stack>

      <Modal
        isOpen={isOpenModal}
        onClose={onCloseModal}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody py={6}>
            <VStack spacing={4}>
              <Text fontSize='sm'>
              {`Verification code has been sent to email ${formState.email}. Please enter the code below.`}
              </Text>

              <HStack justify='center'>
                <PinInput 
                  otp 
                  onComplete={sendVerificationCode}
                  isDisabled={isInProgress}
                >
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
              {isInProgress ? (
                <Progress size='xs' isIndeterminate/>
              ) : (
                null
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}