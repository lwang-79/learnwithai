import { Box, Spinner, Text } from '@chakra-ui/react'

function SpinnerOverlay() {
  return (
    <Box
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
      {/* <Text>Loading...</Text> */}
    </Box>
  )
}

export default SpinnerOverlay
