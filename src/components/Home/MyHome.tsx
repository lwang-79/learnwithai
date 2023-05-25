import { Flex, Spacer, useColorModeValue } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { User } from '@/models';
import Footer from '../Common/Footer';
import Header from '../Common/Header';
import { DataStore } from 'aws-amplify';
import Dashboard from '../Dashboard/Dashboard';
import SharedComponents from '../Common/SharedComponents';
import SpinnerOverlay from '../Common/SpinnerOverlay';

function MyHome() {
  const [user, setUser] = useState<User>();
  const { currentUser } = useContext(SharedComponents)

  useEffect(() => {
    if (!currentUser) return;
    const userSub = DataStore.observeQuery(
        User,
        u => u.id.eq(currentUser!.id)
      ).subscribe(({ items }) => {
        if (items.length > 0) setUser(items[0]);
      });

    return () => userSub.unsubscribe();
  }, [currentUser]);

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
        <SpinnerOverlay />
      )}
    </Flex>
  )
}

export default MyHome
