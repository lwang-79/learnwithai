import { Flex, VStack } from '@chakra-ui/react'
import React from 'react'
import Footer from './Footer'
import Header from './Header'
import WithAuth from './WithAuth'

function Layout({ children }: any) {
  return (
    <>
      <WithAuth href='/login'>
        <Flex
          minH='100vh'
          direction='column'
        >
          <Header />
          <VStack 
            w='full' maxW='5xl' 
            mx='auto' mt={20}
            pb={24} px={4} spacing={4}
          >
            {children}
          </VStack>
          <Footer />
        </Flex>
      </WithAuth>
    </>
  )
}

export default Layout