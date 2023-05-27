import { Spinner, Text, VStack } from '@chakra-ui/react'

function SpinnerOverlay() {
  return (
    <VStack
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height="100%"
      backgroundColor="rgba(0, 0, 0, 0.6)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      zIndex="99999"
    >
      <Spinner color="white" size="xl" />
      <Text color="white">Loading please waite...</Text>
    </VStack>
  )
}

export default SpinnerOverlay
