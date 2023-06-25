import Footer from "@/components/Common/Footer";
import Header from "@/components/Common/Header";
import Layout from "@/components/Common/Layout";
import SharedComponents from "@/components/Common/SharedComponents";
import WithAuth from "@/components/Common/WithAuth";
import { APIOperation } from "@/types/types";
import { APIPost } from "@/types/utils";
import { Button, Divider, Flex, HStack, Text, Textarea, VStack } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import ResizeTextarea from "react-textarea-autosize";

function Anything() {
  const [hydrated, setHydrated] = useState(false);
  
  const [ anything, setAnything ] = useState('');
  const [ answer, setAnswer ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);
  const { apiName } = useContext(SharedComponents);

  useEffect(() => {
		// This forces a rerender, so the date is rendered
		// the second time but not the first
		setHydrated(true);
	}, []);
	if (!hydrated) {
		// Returns null on first render, so the client and server match
		return null;
	}

  const polishButtonClickedHandler = async () => {
    setIsLoading(true);
    const request = {
      body: {
        operation: APIOperation.AskAnything,
        prompt: `Please polish the following paragraph:
###
${anything}
###
        `
      }
    };
  
    const body = await APIPost(apiName, '/', request);
    setAnswer(body.data);
    setIsLoading(false);
  }

  const chineseButtonClickedHandler = async () => {
    setIsLoading(true);
    const request = {
      body: {
        operation: APIOperation.AskAnything,
        prompt: `Please translate the following paragraph to Chinese:
###
${anything}
###
        `
      }
    };
  
    const body = await APIPost(apiName, '/', request);
    setAnswer(body.data);
    setIsLoading(false);
  }

  const askButtonClickedHandler = async () => {
    setIsLoading(true);
    const request = {
      body: {
        operation: APIOperation.AskAnything,
        prompt: anything
      }
    };
  
    const body = await APIPost(apiName, '/', request);
    setAnswer(body.data);
    setIsLoading(false);
  }

  const inputChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnything(event.target.value)
  }
  
  return (
    // <WithAuth href='/login'>
    //   <Flex
    //     minH='100vh'
    //     direction='column'
    //   >
    //     <Header />
        <Layout>
          <Textarea
            as={ResizeTextarea}
            value={anything}
            onChange={inputChangeHandler}
            placeholder='Ask anything'
            size='sm'
            rounded='md'
          />
          <HStack w='full'>
            <Button
              onClick={polishButtonClickedHandler}
              loadingText='Please wait...'
              isLoading={isLoading}
              w='full'
              rounded='md'
            >
              Polish
            </Button>
            <Button
              onClick={chineseButtonClickedHandler}
              loadingText='Please wait...'
              isLoading={isLoading}
              w='full'
              rounded='md'
            >
              Translate to Chinese
            </Button>
            <Button
              onClick={askButtonClickedHandler}
              loadingText='Please wait...'
              isLoading={isLoading}
              w='full'
              rounded='md'
            >
              Ask
            </Button>

          </HStack>
                
          <Textarea
            as={ResizeTextarea}
            value={answer}
            size='sm'
            rounded='md'
          />

        </Layout>
    //     <Footer/>
    //   </Flex>
    // </WithAuth>
  )
}

export default Anything
