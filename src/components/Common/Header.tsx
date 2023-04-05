import { ReactNode, useContext, useEffect, useState } from 'react';
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
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
} from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { 
  MdClose, 
  MdDarkMode, 
  MdLightMode, 
  MdLogout, 
  MdMenu, 
  MdOutlineHelp, 
  MdOutlineSchool, 
  MdPerson, 
} from 'react-icons/md';
import { GiFootprint } from 'react-icons/gi';
import { Auth, DataStore } from 'aws-amplify';
import { useRouter } from 'next/router';
import useStorage from '@/hooks/useStorage';
import Support from './Support';
import SharedComponents from './SharedComponents';

const Links = ['/intro', '/math', '/writing'];
const LinkNames = ['Introduction', 'Math', 'Writing']

const NavLink = ({ children, href }: { children: ReactNode, href: string }) => (
  <Link
    _hover={{
      textDecoration: 'none',
      color: 'gray.500',
    }}
    href={href}>
    {children}
  </Link>
);

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ lastScrollY, setLastScrollY ] = useState(0);
  const [ show, setShow ] = useState(true);

  const router = useRouter();
  const { setItem } = useStorage();
  const width = 'full';
  const { currentUser } = useContext(SharedComponents);
  const user = currentUser!;

  const { 
    isOpen: isOpenSupportModal, 
    onOpen: onOpenSupportModal, 
    onClose: onCloseSupportModal
  } = useDisclosure();

  const controlNavbar = () => {
    if (typeof window !== 'undefined') { 
      if (window.scrollY > lastScrollY) { // if scroll down hide the navbar
        setShow(false); 
      } else { // if scroll up show the navbar
        setShow(true);  
      }

      // remember current page location to use in the next move
      setLastScrollY(window.scrollY); 
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  const signOut = async () => {
    try {
      console.log('tst')
      setItem('isAuthenticated', 'false', 'local');
      DataStore.clear();        // must before signOut
      await Auth.signOut();     // for Social SignIn signOut will not return
      router.push('/intro');
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  return (
    <>
      <Flex 
        bg={useColorModeValue('gray.100', 'gray.900')} 
        px={4} 
        w={width}
        position='fixed'
        as='header'
        zIndex={100}
        hidden={!show}
        shadow='lg'
      >
        <Container maxW="5xl">
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <IconButton
              size={'md'}
              icon={isOpen ? <Icon as={MdClose} boxSize={6} /> : <Icon as={MdMenu} boxSize={6} />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8} alignItems={'flex-end'}>
              <Link href='/' style={{ textDecoration: 'none' }}>
                <Box color={'teal.400'}>
                  <Icon as={MdOutlineSchool}  boxSize={8}/> 
                  <Text as='b'>
                    LearnWithAI
                  </Text>
                </Box>
              </Link>
              <HStack
                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}
              >
                {Links.map((link, index) => (
                  <NavLink 
                    key={link} 
                    href={link}
                  >
                    {LinkNames[index]}
                  </NavLink>
                ))}
              </HStack>
            </HStack>
            <Flex alignItems={'center'}>
              {user.membership!.current < 3 ? (
                <Button 
                  size='sm' 
                  mr={{base: 1, md: 2}}
                  onClick={()=>router.push('/profile')}
                  variant='unstyled'
                >
                  {user.membership!.current < 2 ? (
                    <Box className='shine'>
                      Upgrade
                    </Box>
                  ) : (
                    <Box>
                      Upgrade
                    </Box>
                  )}
                </Button>
              ) : null}
              <Menu isLazy>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant='unstyled'
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'md'}
                    name={user.username}
                    src={user.picture}
                    showBorder
                    borderWidth='2px'
                    borderColor='gray.200'
                    // src='/avatars/1.png'
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => {router.push('/profile')}}>
                    <HStack justifyContent={'center'}>
                      <Icon as={MdPerson} boxSize={6} color='gray.400' />
                      <span>Profile</span>
                    </HStack>
                  </MenuItem>
                  <MenuItem onClick={toggleColorMode}>
                    <HStack justifyContent={'center'}>
                      {colorMode === 'light' ? <Icon as={MdDarkMode} boxSize={6} color='gray.400' /> : <Icon as={MdLightMode} boxSize={6} color='gray.400' />}
                      <span>Change color</span>
                    </HStack>
                  </MenuItem>
                  <MenuItem onClick={onOpenSupportModal}>
                    <HStack justifyContent={'center'}>
                      <Icon as={MdOutlineHelp} boxSize={6} color='gray.400' />
                      <span>Support</span>
                    </HStack>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={() => signOut()}>
                    <HStack justifyContent={'center'}>
                      <Icon as={MdLogout} boxSize={6} color='gray.400' />
                      <span>Log out</span>
                    </HStack>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>

          {isOpen ? (
            <Box pb={4} display={{ md: 'none' }}>
              <Stack as={'nav'} spacing={4}>
                {Links.map((link, index) => (
                  <NavLink key={link} href={link}>{LinkNames[index]}</NavLink>
                ))}
              </Stack>
            </Box>
          ) : null}
        </Container>
      </Flex>

      <Modal
        isOpen={isOpenSupportModal}
        onClose={onCloseSupportModal}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign='center'>
            Please leave a message
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Support onClose={onCloseSupportModal} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}