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
  useToast,
  PinInput,
  PinInputField,
  Progress,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { Auth } from 'aws-amplify';
import { GiFootprint } from 'react-icons/gi';
import { useRouter } from 'next/router';
import Logo from '@/components/Common/Logo';

function ForgotPassword() {
  const [ showPassword1, setShowPassword1 ] = useState(false);
  const [ showPassword2, setShowPassword2 ] = useState(false);
  const initFormState = {
    email: '',
    password1: '',
    password2: '',
    code: ''
  }
  const [ formState, setFormState ] = useState(initFormState);
  const [ isInProgress, setIsInProgress ] = useState(false);
  const [ hasCodeBeenSent, setHasCodeBeenSent ] = useState(false);

  const toast = useToast();
  const route = useRouter();

  const setInput = (key: string) => (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setFormState({ ...formState, [key]: target.value });
  }

  const sendCode = async () => {
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

    try {
      await Auth.forgotPassword(formState.email);
      setHasCodeBeenSent(true);

    } catch (error) {
      console.error('error send confirmation code:', error);
      toast({
        description: error instanceof Error ? error.message : String(error),
        status: 'error',
        duration: 10000,
        isClosable: true
      });
    }
  }

  const setCode = (value:string) => {
    setFormState({ ...formState, code: value });
  }

  const setPassword = async () => {
    if (!formState.code) {
      toast({
        description: 'Verification code is required!',
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

    setIsInProgress(true);
    
    try {
      await Auth.forgotPasswordSubmit(formState.email, formState.code, formState.password1);
      await Auth.signIn(formState.email, formState.password1);
      setIsInProgress(false);
      route.push('/');
      toast({
        description: 'Password has been set successfully',
        status: 'success',
        duration: 10000,
        isClosable: true
      });

    } catch (error) {
      console.error('error set password:', error);
      toast({
        description: error instanceof Error ? error.message : String(error),
        status: 'error',
        duration: 10000,
        isClosable: true
      });

      setIsInProgress(false);
      setHasCodeBeenSent(false);
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
            <Text fontSize='xl' align={'end'} >Reset your password </Text>
            <Link href='/'>
              <Logo />
            </Link>
          </HStack>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <Text>Please enter your email address</Text>
            
            <FormControl id="email" isRequired>
              <Input type="email" placeholder='Email address' onChange={setInput('email')}/>
            </FormControl>
            <Button
              loadingText="Submitting"
              onClick={sendCode}
              isDisabled={hasCodeBeenSent}
            >
              Send verification code
            </Button>
          </Stack>

          {hasCodeBeenSent ? (
            <Stack spacing={4} mt={8}>
              <Text fontSize='sm'>
                {`Verification code has been sent to email ${formState.email}. Please enter the code below.`}
              </Text>
              <HStack justify='center'>
                <PinInput 
                  otp 
                  onComplete={setCode}
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
              <Text>
                Please enter the new password
              </Text>
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

              <Button
                onClick={setPassword}
              >
                Set password
              </Button>

              {isInProgress ? (
                <Progress size='xs' isIndeterminate/>
              ) : (
                null
              )}

            </Stack>
          ) : (
            null
          )}
              
        </Box>
      </Stack>

    </Flex>
  )
}

export default ForgotPassword
