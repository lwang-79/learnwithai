import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import Support from "./Support";

function Footer() {
  const {
    isOpen: isOpenSupportModal,
    onOpen: onOpenSupportModal,
    onClose: onCloseSupportModal,
  } = useDisclosure();

  const bg = useColorModeValue("gray.100", "gray.900");

  return (
    <Flex
      align="center"
      direction="column"
      w="full"
      p={4}
      bg={bg}
      position="fixed"
      bottom={0}
    >
      <Text fontSize="sm" cursor="pointer" onClick={onOpenSupportModal}>
        Need help or have suggestions?
      </Text>
      <Text fontSize="sm" cursor="pointer" onClick={onOpenSupportModal}>
        Leave a message
      </Text>

      <Box position="absolute" zIndex={10} bottom={0} right={0} color={bg}>
        <Link href="/anything">Anything</Link>
      </Box>

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
    </Flex>
  );
}

export default Footer;
