import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/types/theme';
import Head from 'next/head';
import Script from 'next/script';
import { Amplify, Auth, DataStore } from 'aws-amplify';
import awsconfig from '../aws-exports';
import { useEffect, useState } from 'react';
import SharedComponents from '@/components/Common/SharedComponents';
import SpinnerOverlay from '@/components/Common/SpinnerOverlay';
import { createUserIfNotExist, isAuthenticated, UserParams } from '@/types/user';


if (typeof window === 'undefined') {
  Amplify.configure(awsconfig);
} else {
  const isLocalhost = Boolean(
    window.location.hostname === "localhost" ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === "[::1]" ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  );

  const isDevelopment = Boolean(
    window.location.hostname.includes("learn.jinpearl")
  );
  
  const [
    localRedirectSignIn,
    // productionRedirectSignIn,
    developmentRedirectSignIn
  ] = awsconfig.oauth.redirectSignIn.split(",");
  
  const [
    localRedirectSignOut,
    // productionRedirectSignOut,
    developmentRedirectSignOut
  ] = awsconfig.oauth.redirectSignOut.split(",");
  
  const updatedAwsConfig = {
    ...awsconfig,
    oauth: {
      ...awsconfig.oauth,
      redirectSignIn: isLocalhost ? 
        localRedirectSignIn : 
        // isDevelopment ? 
        developmentRedirectSignIn,
        // productionRedirectSignIn,
      redirectSignOut: isLocalhost ? 
        localRedirectSignOut : 
        // isDevelopment ?
        developmentRedirectSignOut
        // productionRedirectSignOut,
    }
  }
  
  Amplify.configure(updatedAwsConfig);
}

export default function App({ Component, pageProps }: AppProps) {
  const [ isProcessing, setIsProcessing ] = useState(true);
  const [ currentUser, setCurrentUser ] = useState<UserParams>();

  useEffect(() => {
    if(!isAuthenticated()) {
      setIsProcessing(false);
      return;
    }

    Auth.currentAuthenticatedUser()
    .then( currentUser => {
      createUserIfNotExist(currentUser.attributes)
      .then( userParams => {
        setCurrentUser(userParams);
        setIsProcessing(false);
      });
    })
    .catch((err) => {
      setIsProcessing(false);
      console.error(err);
    });
  },[]);

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Learn with AI</title>
        <meta name="description" content="Learn with AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      {isProcessing ? <SpinnerOverlay /> :
        <SharedComponents.Provider value={{ 
          setIsProcessing: setIsProcessing,
          currentUser: currentUser,
          setCurrentUser: setCurrentUser
        }} >
          <Component {...pageProps} />
        </SharedComponents.Provider>
      }
    </ChakraProvider>
  )
}
