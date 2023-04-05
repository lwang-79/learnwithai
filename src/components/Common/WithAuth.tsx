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
  const { currentUser } = useContext(SharedComponents);

  const { getItem } = useStorage();

  const isAuthenticated = (getItem('isAuthenticated', 'local') === 'true');

  useEffect(() => {
    if (!isAuthenticated) {
      if (href) router.push(href);
      else router.push('/intro');
    }
  }, []);

  if (isAuthenticated) { return children; }
}

export default WithAuth;
