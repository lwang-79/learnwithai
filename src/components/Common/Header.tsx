import { ReactNode, useContext, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Container,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  useToast,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import {
  MdClose,
  MdLogout,
  MdMenu,
  MdOutlineAdminPanelSettings,
  MdOutlineDarkMode,
  MdOutlineDownload,
  MdOutlineHelp,
  MdOutlineLightMode,
  MdOutlinePerson,
  MdOutlineUpload,
} from "react-icons/md";
import NextLink from "next/link";
import { Auth, DataStore, Predicates, SortDirection } from "aws-amplify";
import { useRouter } from "next/router";
import useStorage from "@/hooks/useStorage";
import Support from "./Support";
import SharedComponents from "./SharedComponents";
import { downloadData, importData } from "@/types/utils";
import Logo from "./Logo";
import { SystemMessage } from "@/models";
import MessagePopover from "./MessagePopover";
import { SWACoins } from "./Icons";

const Links = ["/math", "/writing", "/stem", "/classroom"];
const LinkNames = ["Math", "Writing", "STEM", "MiniClass"];

const NavLink = ({ children, href }: { children: ReactNode; href: string }) => (
  <Link
    as={NextLink}
    _hover={{
      textDecoration: "none",
      color: "gray.500",
    }}
    href={href}
  >
    {children}
  </Link>
);

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();
  const { setItem } = useStorage();
  const width = "full";
  const {
    dataStoreUser,
    setDataStoreUser,
    setIsProcessing,
    setIsDataStoreReady,
  } = useContext(SharedComponents);
  const user = dataStoreUser;
  const toast = useToast();

  const [messages, setMessages] = useState<SystemMessage[]>([]);

  const {
    isOpen: isOpenSupportModal,
    onOpen: onOpenSupportModal,
    onClose: onCloseSupportModal,
  } = useDisclosure();

  useEffect(() => {
    const subscription = DataStore.observeQuery(SystemMessage, Predicates.ALL, {
      sort: (m) => m.createdAt(SortDirection.DESCENDING),
    }).subscribe((snapshot) => {
      const { items } = snapshot;
      setMessages(items);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      setItem("isAuthenticated", "false", "local");
      DataStore.clear(); // must before signOut
      setIsDataStoreReady(false);
      await Auth.signOut(); // for Social SignIn signOut will not return
      setDataStoreUser(undefined);
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  const downloadClicked = () => {
    if (user && user.membership!.current < 2) {
      toast({
        description: `The feature is not available for your current plan, please upgrade your plan in profile.`,
        status: "warning",
        duration: 5000,
        isClosable: true,
      });

      return;
    }

    downloadData();
  };

  const uploadClicked = async () => {
    if (!user) return;

    if (user.membership!.current < 2) {
      toast({
        description: `The feature is not available for your current plan, please upgrade your plan in profile.`,
        status: "warning",
        duration: 5000,
        isClosable: true,
      });

      return;
    }

    setIsProcessing(true);
    await importData(user.owner!);
    setIsProcessing(false);
  };

  const bg = useColorModeValue("gray.100", "gray.900");

  return (
    <>
      <Flex
        bg={bg}
        px={4}
        w={width}
        position="fixed"
        as="header"
        zIndex={5}
        shadow="sm"
      >
        <Container maxW="5xl">
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <IconButton
              size={"md"}
              icon={
                isOpen ? (
                  <Icon as={MdClose} boxSize={6} />
                ) : (
                  <Icon as={MdMenu} boxSize={6} />
                )
              }
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8}>
              <Link as={NextLink} href="/" style={{ textDecoration: "none" }}>
                <Logo />
              </Link>
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
              >
                {Links.map((link, index) => (
                  <NavLink key={link} href={link}>
                    {LinkNames[index]}
                  </NavLink>
                ))}
              </HStack>
            </HStack>
            <Flex align="center">
              {user && user.membership!.current < 3 ? (
                <Button
                  size="sm"
                  onClick={() => router.push("/account")}
                  variant="unstyled"
                >
                  {user.membership!.current < 2 ? (
                    <Box className="shine">Upgrade</Box>
                  ) : (
                    <Box>Upgrade</Box>
                  )}
                </Button>
              ) : null}

              <Button
                variant="ghost"
                colorScheme="orange"
                onClick={() => {
                  if (user!.membership!.current < 2) {
                    toast({
                      description: `The feature is not available for your current plan, please upgrade your plan in profile.`,
                      status: "warning",
                      duration: 5000,
                      isClosable: true,
                    });
                    return;
                  }
                  router.push("/store");
                }}
              >
                <HStack>
                  <Icon as={SWACoins} boxSize={6} />
                  <span>{user?.gameData?.coins ?? 0}</span>
                </HStack>
              </Button>

              {messages.length > 0 && (
                <Box ms={{ base: 1, md: 2 }}>
                  <MessagePopover messages={messages} />
                </Box>
              )}
              <Menu isLazy>
                <MenuButton cursor={"pointer"} ms={{ base: 1, md: 2 }}>
                  <Avatar
                    name={user?.username}
                    src={user?.picture}
                    showBorder
                    borderWidth="2px"
                    borderColor="gray.200"
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      router.push("/account");
                    }}
                  >
                    <HStack justifyContent={"center"}>
                      <Icon as={MdOutlinePerson} boxSize={6} color="gray.400" />
                      <span>Account</span>
                    </HStack>
                  </MenuItem>
                  {user && user.membership!.current > 50 && (
                    <MenuItem
                      onClick={() => {
                        router.push("/admin");
                      }}
                    >
                      <HStack justifyContent={"center"}>
                        <Icon
                          as={MdOutlineAdminPanelSettings}
                          boxSize={6}
                          color="gray.400"
                        />
                        <span>Administrator</span>
                      </HStack>
                    </MenuItem>
                  )}
                  <MenuItem onClick={toggleColorMode}>
                    <HStack justifyContent={"center"}>
                      {colorMode === "light" ? (
                        <Icon
                          as={MdOutlineDarkMode}
                          boxSize={6}
                          color="gray.400"
                        />
                      ) : (
                        <Icon
                          as={MdOutlineLightMode}
                          boxSize={6}
                          color="gray.400"
                        />
                      )}
                      <span>Change color</span>
                    </HStack>
                  </MenuItem>
                  {user && user.membership!.current > 9 && (
                    <>
                      <MenuItem onClick={downloadClicked}>
                        <HStack justifyContent={"center"}>
                          <Icon
                            as={MdOutlineDownload}
                            boxSize={6}
                            color="gray.400"
                          />
                          <span>Export data</span>
                        </HStack>
                      </MenuItem>
                      <MenuItem onClick={uploadClicked}>
                        <HStack justifyContent={"center"}>
                          <Icon
                            as={MdOutlineUpload}
                            boxSize={6}
                            color="gray.400"
                          />
                          <span>Import data</span>
                        </HStack>
                      </MenuItem>
                    </>
                  )}
                  <MenuItem onClick={onOpenSupportModal}>
                    <HStack justifyContent={"center"}>
                      <Icon as={MdOutlineHelp} boxSize={6} color="gray.400" />
                      <span>Support</span>
                    </HStack>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={() => signOut()}>
                    <HStack justifyContent={"center"}>
                      <Icon as={MdLogout} boxSize={6} color="gray.400" />
                      <span>Log out</span>
                    </HStack>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>

          {isOpen ? (
            <Box pb={4} display={{ md: "none" }}>
              <Stack as={"nav"} spacing={4}>
                {Links.map((link, index) => (
                  <NavLink key={link} href={link}>
                    {LinkNames[index]}
                  </NavLink>
                ))}
              </Stack>
            </Box>
          ) : null}
        </Container>
      </Flex>

      <Modal isOpen={isOpenSupportModal} onClose={onCloseSupportModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Please leave a message</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Support onClose={onCloseSupportModal} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
