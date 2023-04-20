const crypto = require('@aws-crypto/sha256-js');
const { defaultProvider } = require('@aws-sdk/credential-provider-node');
const { SignatureV4 } = require('@aws-sdk/signature-v4');
const { HttpRequest } = require('@aws-sdk/protocol-http');
const fetch = require('node-fetch');

const { Request } = fetch;
const { Sha256 } = crypto;
const GRAPHQL_ENDPOINT = process.env.API_LEARNWITHAI_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.REGION;

exports.execute = async (query, variables = null) => {
  const endpoint = new URL(GRAPHQL_ENDPOINT);

  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: AWS_REGION,
    service: 'appsync',
    sha256: Sha256
  });

  const requestToBeSigned = new HttpRequest({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      host: endpoint.host
    },
    hostname: endpoint.host,
    body: variables ? JSON.stringify({ query, variables }) : JSON.stringify({ query }),
    path: endpoint.pathname
  });

  const signed = await signer.sign(requestToBeSigned);

  const request = new Request(GRAPHQL_ENDPOINT, signed);

  let statusCode = 200;
  let body;
  let response;

  try {
    response = await fetch(request);
    body = await response.json();
    if (body.errors) {
      statusCode = 400;
      console.error(body.errors)
    }
  } catch (error) {
    statusCode = 500;
    body = {
      errors: [
        {
          message: error.message
        }
      ]
    };
  }

  return {
    statusCode: statusCode,
    body: body
  }
}
