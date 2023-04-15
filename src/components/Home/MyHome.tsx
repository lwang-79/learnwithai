import { Box, Center, Flex, Spacer, Spinner, Stack, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { User } from '@/models';
import Footer from '../Common/Footer';
import Header from '../Common/Header';
import { ZenObservable } from 'zen-observable-ts'
import { Auth, DataStore } from 'aws-amplify';
import Dashboard from '../Dashboard/Dashboard';

function MyHome() {
  const [user, setUser] = useState<User>();
  let userSub: ZenObservable.Subscription;

  useEffect(() => {
    Auth.currentAuthenticatedUser()
    .then( currentUser => {
      userSub = DataStore.observeQuery(
        User,
        u => u.sub.eq(currentUser.attributes.sub)
      ).subscribe(({ items }) => {
        if (items.length > 0) setUser(items[0]);
      });
    })
    .catch((err) => {
      console.error(err);
    });

    return () => userSub.unsubscribe();
  }, []);

  return (
    <Flex 
      bg={useColorModeValue('gray.50', 'gray.800')} 
      minH='100vh'
      direction='column'
    >
      {user ? (
        <>
          <Header/>
          <Flex 
            mt={16} 
            mx='auto' 
            w='full' 
            maxW='5xl' 
            direction='column'
            px={4}
          >
            <Dashboard user={user}/>
            <Spacer />
          </Flex>
          <Spacer />
          <Footer/>
        </>
      ) : (
        <Stack  h='70vh'>
          <Spacer />
          <Center>
            <Spinner size='xl'/>
          </Center>
          <Spacer />
        </Stack>
      )}
    </Flex>
  )
}

export default MyHome
