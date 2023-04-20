import { 
  Button, 
  Flex, 
  FormControl, 
  FormLabel, 
  Icon,
  Input, 
  InputGroup, 
  InputLeftElement, 
  Progress, 
  Textarea, 
  useToast, 
  VStack 
} from "@chakra-ui/react"
import { useState } from "react";
import { MdOutlineEmail, MdPerson } from "react-icons/md";
import { isValidEmail, sesSendEmail } from "@/types/utils";

function Support({ onClose }: {onClose: ()=>void}) {
  const [ formState, setFormState ] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [ isInProgress, setIsInProgress ] = useState(false);

  const toast = useToast();

  const setInput = (key: string) => (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setFormState({ ...formState, [key]: target.value });
  }

  const sendEmail = async () => {
    if (!formState.name) {
      toast({
        description: 'Name is required, please type your name!',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top'
      });

      return;
    }

    if (!isValidEmail(formState.email)) {
      toast({
        description: 'Email is invalid, please type a valid email address!',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top'
      });

      return;
    }

    if (formState.message.length < 20) {
      toast({
        description: 'Message is empty or too short, please give enough information!',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top'
      });

      return;
    }

    setIsInProgress(true);
    try {
      await sesSendEmail(
        ['lwang79@gmail.com'], 
        `Message from ${formState.name} - ${formState.email}`,
        formState.message 
      );

      toast({
        description: 'Email has been sent. Thank you!',
        status: 'success',
        duration: 50000,
        isClosable: true
      });
    } catch (error) {
      console.error(error);
      toast({
        description: 'Something wrong, please try again later.',
        status: 'error',
        duration: 100000,
        isClosable: true
      });
    }

    setFormState({
      name: '',
      email: '',
      message: ''
    })

    setIsInProgress(false);
    onClose();
  }

  return (
    <>
      <VStack spacing={5}>
        <FormControl id="name">
          <FormLabel>Your Name</FormLabel>
          <InputGroup>
            <InputLeftElement>
              <Icon as={MdPerson} boxSize={6} />
            </InputLeftElement>
            <Input value={formState.name} onChange={setInput('name')} />
          </InputGroup>
        </FormControl>
        <FormControl id="mail">
          <FormLabel>Your Email</FormLabel>
          <InputGroup>
            <InputLeftElement>
              <Icon as={MdOutlineEmail} boxSize={6} />
            </InputLeftElement>
            <Input value={formState.email} onChange={setInput('email')} />
          </InputGroup>
        </FormControl>
        <FormControl id="message">
          <FormLabel>Message</FormLabel>
          <Textarea value={formState.message} placeholder="message" onChange={setInput('message')} />
        </FormControl>
        <Flex w='full' justify='end' >
          <Button
            w='full'
            onClick={sendEmail}
          >
            Send Message
          </Button>
        </Flex>
        {isInProgress ? (
          <Progress size='xs' isIndeterminate w='full'/>
        ) : null}
      </VStack>
    </>
  )
}

export default Support  