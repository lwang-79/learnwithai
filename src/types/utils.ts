async function sesSendEmail(to:string[], subject:string, message:string) {
	const body = {
		'from': 'leon.wang79@gmail.com',
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


export {
  sesSendEmail
}