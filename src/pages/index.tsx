import { Auth, DataStore } from 'aws-amplify';
import { useContext, useEffect } from 'react';
import WithAuth from '@/components/Common/WithAuth';
import useStorage from '@/hooks/useStorage';
import MyHome from '@/components/Home/MyHome';
import { getDataStoreUserOrCreateIfNotExist } from '@/types/user';
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

    Auth.currentAuthenticatedUser()
    .then( authUser => {
      setItem('isAuthenticated', 'true', 'local');
      getDataStoreUserOrCreateIfNotExist(authUser.attributes)
      .then(user => {
        if (!user) {
          console.error('Failed to create or fetch user');
          setItem('isAuthenticated', 'false', 'local');
          router.push('/intro');
          return;
        }
        setDataStoreUser(user);
      })
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
