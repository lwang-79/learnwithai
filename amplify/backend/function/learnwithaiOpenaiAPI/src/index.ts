import { askAnything } from "./openai/anything";
import { generateMathAnswer, generateMathQuestion, getDatasetQuestions } from "./openai/math";
import { generateWritingMark, generateWritingPrompt, polishWriting } from "./openai/writing";
import { APIOperation, APIResponse } from "./types";

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const req = JSON.parse(event.body);
  const operation = req.operation || '';
  if (Object.values(APIOperation).indexOf(operation) < 0) {
    return {
      statusCode: 400,
      body: {
        statusCode: 400,
        error: 'Please enter a valid value'
      },
    };
  }

  let body: APIResponse;

  switch (operation) {
    case APIOperation.AskAnything:
      body = await askAnything(req.prompt || '');
      break;

    case APIOperation.WritingPrompt:
      body = await generateWritingPrompt(
        req.type || '',
        req.topic || '',
        req.level || ''
      );
      break;
    
    case APIOperation.WritingMark:
      body = await generateWritingMark(
        req.level || '',
        req.type || '',
        req.prompt || '',
        req.essay || ''
      );
      break;

    case APIOperation.WritingPolish:
      body = await polishWriting(
        req.level || '',
        req.type || '',
        req.prompt || '',
        req.essay || ''
      );
      break;
        
    case APIOperation.MathDataset:
      body = await getDatasetQuestions(
        req.dataset || '',
        req.questionCount || ''
      );
      break;

    case APIOperation.MathQuestion:
      body = await generateMathQuestion(
        req.category || '',
        req.type || '',
        req.level || '',
        req.concept || ''
      );
      break;

    case APIOperation.MathAnswer:
      body = await generateMathAnswer(
        req.question || ''
      );
      break;

    default:
      body = { 
        statusCode: 400,
        error: "Invalid operation"
      }
  }

  if (body.statusCode !== 200) {
    console.error(body.error);
  }

  return {
    statusCode: body.statusCode,
    body: JSON.stringify(body),
  };
}