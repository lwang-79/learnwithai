import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Stack,
  Button,
  useColorModeValue,
  Text,
  HStack,
  Center,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  VStack,
  PinInput,
  PinInputField,
  Progress,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { Auth } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { createUserIfNotExist } from '../../types/user';
import useStorage from '../../hooks/useStorage';
import { MdOutlineSchool } from 'react-icons/md';

export default function Login() {
  const { 
    isOpen: isOpenModal, 
    onOpen: onOpenModal, 
    onClose: onCloseModal
  } = useDisclosure();
    
  const initFormState = {username: '', password: ''}
  const [ formState, setFormState ] = useState(initFormState);
  const [ isInProgress, setIsInProgress ] = useState(false);
  const [ isSigning, setIsSigning ] = useState(false);

  const toast = useToast();
  const route = useRouter();
  const { setItem } = useStorage();

  const setInput = (key: string) => (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setFormState({ ...formState, [key]: target.value });
  }

  const signIn = async () => {
    setIsSigning(true);
    try {
      await Auth.signIn(formState.username, formState.password);
      route.push('/');
    } catch (error) {
      const err = error instanceof Error ? error.message : String(error);
      if (err.includes('is not confirmed')) {
        await Auth.resendSignUp(formState.username);
        onOpenModal();
        return;
      }

      console.error('error signing in', error);
      toast({
        description: err,
        status: 'error',
        duration: 10000,
        isClosable: true
      });
    }
  }

  const sendVerificationCode = async (value: string) => {
    setIsInProgress(true);
    try {
      await Auth.confirmSignUp(formState.username, value);

      const user = await Auth.signIn(formState.username, formState.password);
      setItem('isAuthenticated', 'true', 'local');
      await createUserIfNotExist(user.attributes);
      onCloseModal();
      setIsInProgress(false);
      route.push('/');
      
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
        <HStack align={'flex-end'} justify={'center'}>
          <Text fontSize='xl' align={'end'} >Login to </Text>
          <Link href='/'>
            <Box color={'teal.400'}>
              <Icon as={MdOutlineSchool} boxSize={10}/> 
              <Text as='b' fontSize='xl'>
                {process.env.NEXT_PUBLIC_APP_NAME}
              </Text>
            </Box>
          </Link>
        </HStack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Button 
            w={'full'} 
            leftIcon={<Icon as={FcGoogle} boxSize={6} />} 
            mb={4}
            onClick={() => Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google})}
          >
            <Center>
              <Text>Sign in with Google</Text>
            </Center>
          </Button>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={setInput('username')} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" onChange={setInput('password')} />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Link href='/signup'><Text color={'teal.400'}>Need an account?</Text></Link>
                <Link href='/forgot-password'><Text color={'teal.400'}>Forgot password?</Text></Link>
              </Stack>
              <Button
                onClick={signIn}
                isLoading = {isSigning}
                loadingText='Signing in'
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
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
              {`Verification code has been sent to email ${formState.username}. Please enter the code below.`}
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