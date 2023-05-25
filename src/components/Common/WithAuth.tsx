import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import useStorage from '@/hooks/useStorage';

interface pageProps {
  children: any,
  href?: string
}

const WithAuth: React.FC<pageProps> = ({ children, href }) => {
  const router = useRouter();
  const { getItem } = useStorage();
  const isAuthenticated = (getItem('isAuthenticated', 'local') === 'true');

  useEffect(() => {
    if (!isAuthenticated) {
      if (href) router.push(href);
      else router.push('/intro');
    }
  }, [href, isAuthenticated, router]);

  if (isAuthenticated) { return children; }
}

export default WithAuth;
