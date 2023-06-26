import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import useStorage from '@/hooks/useStorage';
import SharedComponents from './SharedComponents';

interface pageProps {
  children: any,
  href?: string
}

const WithAuth: React.FC<pageProps> = ({ children, href }) => {
  const router = useRouter();
  const { getItem } = useStorage();
  const isAuthenticated = (getItem('isAuthenticated', 'local') === 'true');
  const { dataStoreUser } = useContext(SharedComponents);

  useEffect(() => {
    if (!isAuthenticated) {
      if (href) router.push(href);
      else router.push('/intro');
    } else if (!dataStoreUser) {
      router.push('/');
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [href, isAuthenticated, router]);

  return isAuthenticated && dataStoreUser && children
}

export default WithAuth;
