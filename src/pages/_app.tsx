import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/types/theme';
import Head from 'next/head';
import { Amplify } from 'aws-amplify';
import awsconfig from '../aws-exports';
import { useState } from 'react';
import SharedComponents from '@/components/Common/SharedComponents';
import SpinnerOverlay from '@/components/Common/SpinnerOverlay';
import { User } from '@/models';
import { APIName } from '@/types/types';


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

  const isDevelopment = process.env.NEXT_PUBLIC_AWS_BRANCH === 'dev';
  
  const [
    localRedirectSignIn,
    developmentRedirectSignIn,
    productionRedirectSignIn,
  ] = awsconfig.oauth.redirectSignIn.split(",");
  
  const [
    localRedirectSignOut,
    developmentRedirectSignOut,
    productionRedirectSignOut,
  ] = awsconfig.oauth.redirectSignOut.split(",");

  const updatedAwsConfig = {
    ...awsconfig,
    oauth: {
      ...awsconfig.oauth,
      redirectSignIn: isLocalhost ? 
        localRedirectSignIn : 
        isDevelopment ? 
        developmentRedirectSignIn :
        productionRedirectSignIn,
      redirectSignOut: isLocalhost ? 
        localRedirectSignOut : 
        isDevelopment ?
        developmentRedirectSignOut :
        productionRedirectSignOut,
    },
    aws_cloud_logic_custom: [
      ...awsconfig.aws_cloud_logic_custom,
      {
        name: APIName.OpenAI,
        endpoint: `https://lambda.${awsconfig.aws_project_region}.amazonaws.com/2015-03-31/functions/learnwithaiOpenaiAPI-${process.env.NEXT_PUBLIC_AWS_BRANCH}/invocations`,
        service: "lambda",
        region: awsconfig.aws_project_region,
      }
    ]
  }

  console.log(process.env.NEXT_PUBLIC_AWS_BRANCH)

  Amplify.configure(updatedAwsConfig);
}

export default function App({ Component, pageProps }: AppProps) {
  const [ isProcessing, setIsProcessing ] = useState(false);
  const [ dataStoreUser, setDataStoreUser ] = useState<User>();
  console.log('app')

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Learn with AI</title>
        <meta name="description" content="Study with AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      {isProcessing ? <SpinnerOverlay /> :
        <SharedComponents.Provider value={{ 
          setIsProcessing: setIsProcessing,
          dataStoreUser: dataStoreUser,
          setDataStoreUser: setDataStoreUser,
          apiName: APIName.OpenAI
        }} >
          <Component {...pageProps} />
        </SharedComponents.Provider>
      }
    </ChakraProvider>
  )
}
