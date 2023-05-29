import { Flex, Spacer, useColorModeValue } from '@chakra-ui/react';
import Footer from '../Common/Footer';
import Header from '../Common/Header';
import Dashboard from '../Dashboard/Dashboard';

function MyHome() {
  return (
    <Flex 
      bg={useColorModeValue('gray.50', 'gray.800')} 
      minH='100vh'
      direction='column'
    >
      <Header/>
      <Flex 
        mt={16} 
        mx='auto' 
        w='full' 
        maxW='5xl' 
        direction='column'
        px={4}
      >
        <Dashboard/>
        <Spacer />
      </Flex>
      <Spacer />
      <Footer/>
    </Flex>
  )
}

export default MyHome
