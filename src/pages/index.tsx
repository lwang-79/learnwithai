import { Auth, DataStore } from 'aws-amplify';
import { useContext, useEffect } from 'react';
import WithAuth from '@/components/Common/WithAuth';
import useStorage from '@/hooks/useStorage';
import MyHome from '@/components/Home/MyHome';
import { createUserIfNotExist } from '@/types/user';
import SharedComponents from '@/components/Common/SharedComponents';
import SpinnerOverlay from '@/components/Common/SpinnerOverlay';
import { User } from '@/models';
import { useRouter } from 'next/router';


export default function Home() {
  const { setItem } = useStorage();
  const { dataStoreUser, setDataStoreUser } = useContext(SharedComponents);
  const router = useRouter();

  useEffect(() => {
    console.log('index')
    if (dataStoreUser) {
      setItem('isAuthenticated', 'true', 'local');
      return;
    }

    const getAndSetDataStoreUser = async (userId: string) => {
      let retryCount = 0;
      let user: User | undefined;

      while (retryCount < 50) {
        user = await DataStore.query(User, userId);

        if (user !== undefined) {
          setDataStoreUser(user);
          console.log(`User is in DataStore. ${retryCount} tries`)
          return;
        }

        await new Promise(resolve => setTimeout(resolve, 100));
        retryCount++;
      }

      console.error('User is not in DataStore');
      router.push('/intro');    
    }

    Auth.currentAuthenticatedUser()
    .then( authUser => {
      setItem('isAuthenticated', 'true', 'local');
      createUserIfNotExist(authUser.attributes)
      .then(user=>getAndSetDataStoreUser(user.id))
      .catch(err => {
        console.error(`Failed to create or fetch user: ${err}`);
        setItem('isAuthenticated', 'false', 'local');
        router.push('/intro');
      });
    })
    .catch((err) => {
      console.error(err);
      setItem('isAuthenticated', 'false', 'local');
      router.push('/intro');
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataStoreUser]);

  return (
    <>
      { !dataStoreUser ? (
        <SpinnerOverlay />
      ) : (
        <WithAuth>
          <MyHome/>
        </WithAuth>
      )}
    </>
  )
}
