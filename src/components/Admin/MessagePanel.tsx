import { SystemMessage } from "@/models";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Card,
  FormControl,
  HStack,
  Icon,
  IconButton,
  Input,
  Text,
  useBoolean,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { DataStore, Predicates, SortDirection } from "aws-amplify";
import { useEffect, useRef, useState } from "react";
import { MdAddCircleOutline, MdClose, MdDeleteOutline } from "react-icons/md";

function MessagePanel() {
  const initFormState = {
    content: "",
    internalLink: "",
    externalLink: "",
  };

  const [formState, setFormState] = useState(initFormState);
  const [messages, setMessages] = useState<SystemMessage[]>([]);
  const [shouldRefresh, setShouldRefresh] = useBoolean(false);
  const [selectedMessageId, setSelectedMessageId] = useState("id");

  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();

  const cancelRef = useRef(null);

  const toast = useToast();

  useEffect(() => {
    DataStore.query(SystemMessage, Predicates.ALL, {
      sort: (m) => m.createdAt(SortDirection.ASCENDING),
    }).then((messages) => {
      setMessages(messages);
    });
  }, [shouldRefresh]);

  const setInput = (key: string) => (event: any) => {
    setFormState({
      ...formState,
      [key]: event.target.value,
    });
  };

  const addMessageClickedHandler = async () => {
    if (formState.content === "") {
      toast({
        description: `Content is required.`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    await DataStore.save(
      new SystemMessage({
        content: formState.content,
        internalLink: formState.internalLink,
        externalLink: formState.externalLink,
      }),
    );

    toast({
      description: `New system message added.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    setShouldRefresh.toggle();
    setFormState(initFormState);
  };

  const deleteMessageClickedHandler = async () => {
    onCloseAlert();
    const toDelete = await DataStore.query(SystemMessage, selectedMessageId);

    if (!toDelete) {
      return;
    }

    await DataStore.delete(toDelete);
    setShouldRefresh.toggle();

    toast({
      description: `System message deleted.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <VStack w="full" spacing={4}>
      <Card w="full">
        <VStack px={4} py={4}>
          <HStack w="full">
            <VStack w="full">
              <HStack w="full">
                <FormControl>
                  <Input
                    placeholder="Message"
                    value={formState.content}
                    onChange={setInput("content")}
                  />
                </FormControl>
              </HStack>
              <HStack w="full">
                <FormControl>
                  <Input
                    placeholder="Internal Link"
                    value={formState.internalLink}
                    onChange={setInput("internalLink")}
                  />
                </FormControl>
                <FormControl>
                  <Input
                    placeholder="External Link"
                    value={formState.externalLink}
                    onChange={setInput("externalLink")}
                  />
                </FormControl>
              </HStack>
            </VStack>

            <IconButton
              aria-label="Add Message"
              variant="ghost"
              icon={<Icon as={MdAddCircleOutline} boxSize={8} />}
              onClick={addMessageClickedHandler}
            />
          </HStack>
        </VStack>
      </Card>

      <VStack w="full">
        {messages.map((message, index) => (
          <Card key={`${message.id}-${index}`} w="full" p={4}>
            <HStack w="full">
              <VStack w="full" align="flex-start">
                <Text>{message.content}</Text>
                <HStack w="full" spacing={8}>
                  <Text fontSize="sm">{`Internal Link: ${message.internalLink}`}</Text>
                  <Text fontSize="sm">{`External Link: ${message.externalLink}`}</Text>
                </HStack>
              </VStack>
              <IconButton
                aria-label="Add Message"
                variant="ghost"
                icon={<Icon as={MdClose} boxSize={8} />}
                onClick={() => {
                  setSelectedMessageId(message.id);
                  onOpenAlert();
                }}
              />
            </HStack>
          </Card>
        ))}
      </VStack>

      <AlertDialog
        isOpen={isOpenAlert}
        leastDestructiveRef={cancelRef}
        onClose={onCloseAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete message?
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can not undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={onCloseAlert}
                rounded={"full"}
                px={6}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                rounded={"full"}
                px={6}
                onClick={deleteMessageClickedHandler}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </VStack>
  );
}

export default MessagePanel;
