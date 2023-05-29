import { ChatCompletionRequestMessage } from "openai";
import { APIResponse } from "../types";
import { chatCompletion } from "./chat";

export const askAnything = async (
  prompt: string
):  Promise<APIResponse> => {
  if (prompt.trim().length === 0) {
    return {
      statusCode: 400,
      error: 'Please enter a valid prompt'
    }
  }

  const message: ChatCompletionRequestMessage[] = [
    { role: 'system', content: 'You are a useful assistant' },
    { role: 'user', content: prompt }
  ]
  return await chatCompletion(message);
}
