async function sesSendEmail(to:string[], subject:string, message:string) {
	const body = {
		'from': 'support@jinpearl.com',
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

export {
	isValidEmail,
  sesSendEmail
}