import { getModel } from "index";
import {
  ChatCompletionFunctions,
  ChatCompletionRequestMessage,
  Configuration,
  OpenAIApi,
} from "openai";
import { APIResponse } from "../types";

const OPENAI_API_KEY = Buffer.from(
  process.env.OPENAI_API_KEY,
  "base64",
).toString();

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const chatCompletion = async (
  messages: ChatCompletionRequestMessage[],
  functions?: ChatCompletionFunctions[],
  temperature: number = 1,
  max_tokens: number = 1000,
): Promise<APIResponse> => {
  // const { Parameter } = await (new SSMClient({
  //   region: process.env.AWS_REGION
  // }))
  //   .send(new GetParameterCommand({
  //     Name: process.env['OPENAI_API_KEY'],
  //     WithDecryption: true,
  //   }));

  // const configuration = new Configuration({
  //   apiKey: Parameter.Value,
  // });

  // const openai = new OpenAIApi(configuration);

  if (!configuration.apiKey) {
    return {
      statusCode: 500,
      error: "Missing API Key",
    };
  }

  const model = getModel();
  console.log(`Model: ${model}`);
  console.log(`Messages: ${JSON.stringify(messages)}`);
  console.log(`Functions: ${JSON.stringify(functions)}`);
  console.log(`Temperature: ${temperature}`);
  console.log(`Max Tokens: ${max_tokens}`);

  try {
    const completion = await openai.createChatCompletion({
      model: model,
      messages: messages,
      functions: functions,
      temperature: temperature,
      max_tokens: max_tokens,
    });

    console.log(JSON.stringify(completion.data.choices[0].message));

    if (completion.data.choices[0].message?.function_call) {
      return {
        statusCode: 200,
        data: completion.data.choices[0].message?.function_call.arguments,
      };
    }

    return {
      statusCode: 200,
      data: completion.data.choices[0].message?.content,
    };
  } catch (error: any) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      return {
        statusCode: error.response.status,
        error: error.response.data,
      };
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      return {
        statusCode: 500,
        error: "An error occurred during your request.",
      };
    }
  }
};
