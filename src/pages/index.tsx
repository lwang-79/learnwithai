import { Auth } from 'aws-amplify';
import { useContext, useEffect, useState } from 'react';
import WithAuth from '@/components/Common/WithAuth';
import useStorage from '@/hooks/useStorage';
import MyHome from '@/components/Home/MyHome';
import { createUserIfNotExist } from '@/types/user';
import SharedComponents from '@/components/Common/SharedComponents';
import SpinnerOverlay from '@/components/Common/SpinnerOverlay';


export default function Home() {
  const { setItem } = useStorage();
  const [isLoading, setIsLoading] = useState(true);
  const { setCurrentUser } = useContext(SharedComponents);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
    .then( currentUser => {
      setItem('isAuthenticated', 'true', 'local');
      createUserIfNotExist(currentUser.attributes)
      .then(user=>setCurrentUser(user));
      setIsLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setItem('isAuthenticated', 'false', 'local');
      setIsLoading(false);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      { isLoading ? (
        <SpinnerOverlay />
      ) : (
        <WithAuth>
          <MyHome/>
        </WithAuth>
      )}
    </>
  )
}
