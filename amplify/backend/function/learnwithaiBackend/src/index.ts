import { processData } from "./core";

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  let statusCode = 200;
  let body = 'Success';

  ({statusCode, body} = await processData());

  return {
    statusCode: statusCode,
    body: body,
  };
};