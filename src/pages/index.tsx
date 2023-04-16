import { Auth } from 'aws-amplify';
import { useContext, useEffect, useState } from 'react';
import WithAuth from '@/components/Common/WithAuth';
import useStorage from '@/hooks/useStorage';
import MyHome from '@/components/Home/MyHome';
import { Center, Spacer, Spinner, Stack } from '@chakra-ui/react';
import { createUserIfNotExist } from '@/types/user';
import SharedComponents from '@/components/Common/SharedComponents';

export default function Home() {
  const { setItem } = useStorage();
  const [isLoading, setIsLoading] = useState(true);
  const { setCurrentUser } = useContext(SharedComponents);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
    .then( currentUser => {
      setItem('isAuthenticated', 'true', 'local');
      createUserIfNotExist(currentUser.attributes)
      .then(user=>setCurrentUser(user))
      setTimeout(()=>setIsLoading(false),500);
    })
    .catch((err) => {
      console.error(err);
      setItem('isAuthenticated', 'false', 'local');
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      { isLoading ? (
        <Stack  h='70vh'>
          <Spacer />
          <Center>
            <Spinner size='xl'/>
          </Center>
          <Spacer />
        </Stack>
      ) : (
        <WithAuth>
          <MyHome/>
        </WithAuth>
      )}
    </>
  )
}
