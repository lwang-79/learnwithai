import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  HStack,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  PinInput,
  PinInputField,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  Stack,
  Text,
  Tooltip,
  useBoolean,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Auth, DataStore } from "aws-amplify";
import React, { useContext, useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
import { User } from "@/models";
import AvatarForm from "./AvataForm";
import SharedComponents from "../Common/SharedComponents";

interface ProfileCardProps {
  user: User;
}

function ProfileCard({ user }: ProfileCardProps) {
  const [isPopOpen, setIsPopOpen] = useBoolean();
  const [username, setUsername] = useState(user.username);
  const [picture, setPicture] = useState(user.picture);
  const [emailVerified, setEmailVerified] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);
  const { setDataStoreUser } = useContext(SharedComponents);
  const toast = useToast();

  const {
    isOpen: isOpenPictureModal,
    onOpen: onOpenPictureModal,
    onClose: onClosePictureModal,
  } = useDisclosure();
  const {
    isOpen: isOpenPinModal,
    onOpen: onOpenPinModal,
    onClose: onClosePinModal,
  } = useDisclosure();

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((user) =>
      setEmailVerified(user.attributes.email_verified),
    );
  }, []);

  const saveUser = async () => {
    try {
      const currentUser = await DataStore.query(User, user.id);
      if (!currentUser) return;
      const updatedUser = await DataStore.save(
        User.copyOf(currentUser, (updated) => {
          (updated.username = username), (updated.picture = picture);
        }),
      );

      setDataStoreUser(updatedUser);

      setIsPopOpen.off();
      onClosePictureModal();
    } catch (error) {
      toast({
        description: `Something wrong, please try again later!`,
        status: "error",
        duration: 20000,
        isClosable: true,
      });

      console.error(`Failed to save the user. userId: ${user.id}`);
    }
  };

  const verifyEmailClicked = () => {
    Auth.verifyCurrentUserAttribute("email")
      .then(() => onOpenPinModal())
      .catch((error) => {
        console.error("Failed to send the verification code", error);
        toast({
          description: error instanceof Error ? error.message : String(error),
          status: "error",
          duration: 10000,
          isClosable: true,
        });
      });
  };

  const sendVerificationCode = async (value: string) => {
    setIsInProgress(true);

    try {
      await Auth.verifyCurrentUserAttributeSubmit("email", value);

      const user = await Auth.currentAuthenticatedUser();

      await Auth.updateUserAttributes(user, {
        email_verified: true,
      });

      setEmailVerified(true);
      toast({
        description: "Email address has been verified successfully!",
        status: "success",
        duration: 10000,
        isClosable: true,
      });
    } catch (error) {
      console.log("Failed to verify the email", error);
      toast({
        description: error instanceof Error ? error.message : String(error),
        status: "error",
        duration: 10000,
        isClosable: true,
      });
    }

    setIsInProgress(false);
    onClosePinModal();
  };

  return (
    <Box
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"md"}
      p={8}
      w="full"
    >
      <Stack align="center">
        <Avatar
          name={username}
          src={picture}
          showBorder
          borderWidth="2px"
          borderColor="gray.200"
          size="xl"
          cursor="pointer"
          onClick={onOpenPictureModal}
        />

        <Box>
          <Popover
            isOpen={isPopOpen}
            onOpen={setIsPopOpen.on}
            onClose={setIsPopOpen.off}
            isLazy
            lazyBehavior="keepMounted"
          >
            <PopoverTrigger>
              <Button variant="ghost" rounded="full">
                {user.username ? user.username : "Input your name here"}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Flex align="flex-end">
                <FormControl>
                  <Input
                    variant="unstyle"
                    defaultValue={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormControl>
                <Button
                  colorScheme={"orange"}
                  variant="ghost"
                  rounded="md"
                  ml={2}
                  onClick={() => saveUser()}
                >
                  OK
                </Button>
              </Flex>
            </PopoverContent>
          </Popover>
        </Box>

        <Flex>
          <Box mr={1}>
            <Text fontSize="sm">{user.email}</Text>
          </Box>
          {emailVerified ? (
            <Tooltip label="Email verified" hasArrow bg="teal">
              <Box>
                <Icon as={MdVerified} color="green.500" />
              </Box>
            </Tooltip>
          ) : (
            <Button
              rounded="full"
              size="xs"
              colorScheme="red"
              onClick={verifyEmailClicked}
            >
              Verify email
            </Button>
          )}
        </Flex>
      </Stack>

      <Modal
        isOpen={isOpenPictureModal}
        onClose={() => {
          setPicture(user.picture);
          onClosePictureModal();
        }}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <AvatarForm user={user} avatar={picture} setAvatar={setPicture} />
          </ModalBody>
          <ModalFooter>
            <Button px={6} onClick={saveUser}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenPinModal} onClose={onClosePinModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody py={6}>
            <VStack spacing={4}>
              <Text fontSize="sm">
                {`Verification code has been sent to email ${user.email}. Please enter the code below.`}
              </Text>

              <HStack justify="center">
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
              {isInProgress ? <Progress size="xs" isIndeterminate /> : null}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default ProfileCard;
