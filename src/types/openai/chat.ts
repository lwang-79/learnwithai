import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
import { APIResponse } from "../types";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const chatCompletion = async (
  messages:  ChatCompletionRequestMessage[],
  temperature: number = 1,
  max_tokens: number = 1000
): Promise<APIResponse> => {
  if (!configuration.apiKey) {
    return {
      statusCode: 500,
      error: "Missing API Key",
    }
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: temperature,
      max_tokens: max_tokens
    });

    return {
      statusCode: 200,
      data: completion.data.choices[0].message?.content,
    }
  } catch(error: any) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      return {
        statusCode: error.response.status,
        error: error.response.data,
      }
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      return {
        statusCode: 500,
        error: 'An error occurred during your request.'
      }
    }
  }
}