import { 
    Flex, 
    Modal, 
    ModalBody, 
    ModalCloseButton, 
    ModalContent, 
    ModalHeader, 
    ModalOverlay, 
    Text, 
    useColorModeValue, 
    useDisclosure 
  } from "@chakra-ui/react"
  import Support from "./Support";
  
  function Footer() {
    const { 
      isOpen: isOpenSupportModal, 
      onOpen: onOpenSupportModal, 
      onClose: onCloseSupportModal
    } = useDisclosure();
  
    return (
      <Flex 
        align='center' 
        direction='column' 
        w='full'
        p={4}
        bg={useColorModeValue('gray.100', 'gray.900')} 
      >
        <Text fontSize='sm'>Need help or have suggestions?</Text>
        <Text 
          fontSize='sm'
          cursor='pointer'
          onClick={onOpenSupportModal}
        >
          Leave a message
        </Text>
      
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
      </Flex>
    )
  }
  
  export default Footer  