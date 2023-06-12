import { API } from "aws-amplify";
import { APIName } from "./types";

async function sesSendEmail(
	to:string[], 
	subject:string, 
	message:string, 
	from:string = 'notification@StudyWithAI.pro'
) {
	const body = {
		'from': from,
		'to': to,
		'subject': subject,
		'message': message
	}

	await fetch(
		'https://lelnuzxenk.execute-api.ap-southeast-2.amazonaws.com/production/sendbasicemail', 
		{
			method: 'POST',
			body: JSON.stringify(body),
			headers: {'Content-Type': 'application/json'}
		}
	);
}

const isValidEmail = (email: string) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

const APIPost = async (
	apiName: APIName,
	path: string,
	request: {
    [key: string]: any;
	}
): Promise<{data: any | undefined, error: string | undefined}> => {

	let response;
	let body;
	try {
		response = await API.post(apiName, path, request);

		if (response.errorMessage) {
			console.error(response.errorMessage);
			return {
				data: undefined,
				error: response.errorMessage
			}
		}

		body = JSON.parse(response.body);

		if (body.error) {
			if (body.error.error && body.error.error) {
				console.error(body.error.error.message);
				return {
					data: undefined,
					error: body.error.error.message
				}
			}
			console.error(body.error);
			return {
				data: undefined,
				error: body.error
			}
		}

		return {
			data: body.data,
			error: undefined
		};

	} catch (error: any) {
		console.error(error.message?? error);

		return {
			data: undefined,
			error: error.message?? error
		}
	}
}

export {
	isValidEmail,
	APIPost,
  sesSendEmail
}