import Layout from "@/components/Common/Layout";
import SharedComponents from "@/components/Common/SharedComponents";
import { APIOperation, QuestionSource } from "@/types/types";
import { APIPost } from "@/types/utils";
import {
  Button,
  FormLabel,
  HStack,
  Spacer,
  Switch,
  Textarea,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import ResizeTextarea from "react-textarea-autosize";

function Anything() {
  const [enableGPT4, setEnableGPT4] = useState(false);
  const [anything, setAnything] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { dataStoreUser, apiName } = useContext(SharedComponents);
  const router = useRouter();

  useEffect(() => {
    if (!dataStoreUser) return;
    if (dataStoreUser.membership!.current < 5) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataStoreUser]);

  const polishButtonClickedHandler = async () => {
    setIsLoading(true);
    const request = {
      body: {
        source: enableGPT4 ? QuestionSource.ChatGPT4 : QuestionSource.ChatGPT3,
        operation: APIOperation.AskAnything,
        prompt: `Please polish the following paragraph:
###
${anything}
###
        `,
      },
    };

    const body = await APIPost(apiName, "/", request);
    setAnswer(body.data);
    setIsLoading(false);
  };

  const chineseButtonClickedHandler = async () => {
    setIsLoading(true);
    const request = {
      body: {
        source: enableGPT4 ? QuestionSource.ChatGPT4 : QuestionSource.ChatGPT3,
        operation: APIOperation.AskAnything,
        prompt: `Please translate the following paragraph to Chinese:
###
${anything}
###
        `,
      },
    };

    const body = await APIPost(apiName, "/", request);
    setAnswer(body.data);
    setIsLoading(false);
  };

  const askButtonClickedHandler = async () => {
    setIsLoading(true);
    const request = {
      body: {
        source: enableGPT4 ? QuestionSource.ChatGPT4 : QuestionSource.ChatGPT3,
        operation: APIOperation.AskAnything,
        prompt: anything,
      },
    };

    const body = await APIPost(apiName, "/", request);
    setAnswer(body.data);
    setIsLoading(false);
  };

  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setAnything(event.target.value);
  };

  return (
    <Layout>
      {dataStoreUser && dataStoreUser.membership!.current >= 5 && (
        <>
          <HStack w="full">
            <Spacer />
            <FormLabel
              htmlFor="enable-gpt4"
              mb="0"
              sx={{ _hover: { cursor: "pointer" } }}
            >
              Enable Advanced AI?
            </FormLabel>
            <Switch
              colorScheme="teal"
              id="enable-gpt4"
              isChecked={enableGPT4}
              onChange={(e) =>
                setEnableGPT4((e.target as HTMLInputElement).checked)
              }
            />
          </HStack>
          <Textarea
            as={ResizeTextarea}
            value={anything}
            onChange={inputChangeHandler}
            placeholder="Ask anything"
            size="sm"
            rounded="md"
          />
          <HStack w="full">
            <Button
              onClick={polishButtonClickedHandler}
              loadingText="Please wait..."
              isLoading={isLoading}
              w="full"
              rounded="md"
            >
              Polish
            </Button>
            <Button
              onClick={chineseButtonClickedHandler}
              loadingText="Please wait..."
              isLoading={isLoading}
              w="full"
              rounded="md"
            >
              Translate to Chinese
            </Button>
            <Button
              onClick={askButtonClickedHandler}
              loadingText="Please wait..."
              isLoading={isLoading}
              w="full"
              rounded="md"
            >
              Ask
            </Button>
          </HStack>

          <Textarea as={ResizeTextarea} value={answer} size="sm" rounded="md" />
        </>
      )}
    </Layout>
  );
}

export default Anything;
