import type { NextApiRequest, NextApiResponse } from 'next'
import { APIOperation, APIResponse } from "@/types/types";
import { askAnything } from '@/types/openai/anything';
import { generateWritingMark, generateWritingPrompt } from '@/types/openai/writing';

export default async function openaiAPI(req: NextApiRequest, res: NextApiResponse) {

  const operation = req.body.operation || '';
  if (Object.values(APIOperation).indexOf(operation) < 0) {
    res.status(400).json({
      statusCode: 400,
      error: "Please enter a valid value",
    });
    return;
  }

  res.setHeader("Access-Control-Allow-Origin", "https://learn.jinpearl.com");
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  let body: APIResponse;

  switch (operation) {
    case APIOperation.AskAnything:
      body = await askAnything(req.body.prompt || '');
      break;

    case APIOperation.WritingPrompt:
      body = await generateWritingPrompt(
        req.body.type || '',
        req.body.topic || '',
        req.body.level || ''
      );
      break;
    
    case APIOperation.WritingMark:
      body = await generateWritingMark(
        req.body.level || '',
        req.body.type || '',
        req.body.prompt || '',
        req.body.essay || ''
      );
      break;
  
    default:
      body = { 
        statusCode: 400,
        error: "Invalid operation"
      }
  }

  res.status(body.statusCode).json(body);
}