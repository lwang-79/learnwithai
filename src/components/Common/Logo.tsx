import { HStack, Icon, Text } from "@chakra-ui/react"
import { GiMoebiusStar } from "react-icons/gi"

function Logo() {
  return (
  <HStack color={'teal.400'}>
    <Icon as={GiMoebiusStar}  boxSize={10}/> 
    <Text as='b' fontSize='lg'>
      {process.env.NEXT_PUBLIC_APP_NAME}
    </Text>
  </HStack>  )
}

export default Logo
