import type { NextApiRequest, NextApiResponse } from 'next'
import { APIOperation, APIResponse } from "@/types/types";
import { askAnything } from '@/types/openai/anything';
import { generateWritingMark, generateWritingPrompt } from '@/types/openai/writing';
import Cors from 'cors';

const cors = Cors({
  methods: ['POST'],
});

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}


export default async function openaiAPI(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors);
  
  const operation = req.body.operation || '';
  if (operation.trim().length === 0) {
    res.status(400).json({
      statusCode: 400,
      error: "Please enter a valid value",
    });
    return;
  }

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