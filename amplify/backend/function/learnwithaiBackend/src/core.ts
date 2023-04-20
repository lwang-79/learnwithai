import { listUserData } from "./graphql"
import fetch from 'node-fetch'

async function sendMonthlyNotification() {
  const users = await listUserData();

  for (const user of users) {
    if (
      !user.notification || 
      user.notification.emails.length === 0 || 
      !user.notification.types.includes('Monthly')
    ) continue;

    const date = new Date();
    date.setDate(date.getDate() - 2);

    const dateString = date.toISOString().slice(0,7);

    const monthly = user.monthly.find(d => d.date === dateString);

    let message = `
Monthly report for ${user.username}
Date: ${dateString}
`

    if (!monthly) {
      message += `
You didn't have any practices last month!
`
    } else {
      message += `
Math questions: ${monthly.mathCorrect + monthly.mathWrong}
Math correct: ${monthly.mathCorrect} (${monthly.mathCorrect === 0 ? '' : (100 * monthly.mathCorrect/(monthly.mathCorrect + monthly.mathWrong)).toFixed(0)+'%'})
Math test: ${monthly.mathExam}
Writing practiced: ${monthly.writing}
`
    }    

    await sesSendEmail(user.notification.emails, 'Learn with AI monthly report', message);
  }

  return {
    statusCode: 200,
    body: 'Success'
  }
}

async function sendWeeklyNotification() {
  const users = await listUserData();

  for (const user of users) {
    if (
      !user.notification || 
      user.notification.emails.length === 0 || 
      !user.notification.types.includes('Monthly')
    ) continue;

    let date = new Date();
    date.setDate(date.getDate() - 1);

    const endDate = new Date(date.toLocaleString('sv').slice(0,10)).toISOString().slice(0,10);

    date = new Date();
    date.setDate(date.getDate() - 7);

    const startDate = new Date(date.toLocaleString('sv').slice(0,10)).toISOString().slice(0,10);

    const data = user.daily.filter(d => d.date >= startDate && d.date <= endDate);

    let message = `
Monthly report for ${user.username}
Date: from ${startDate} to ${endDate}
    `
    
    if (data.length === 0) {
      message += `
You didn't have any practices last month!
`
    } else {
      const total = data.reduce((acc, obj) => {
        return {
          mathCorrect: acc.mathCorrect + obj.mathCorrect,
          mathWrong: acc.mathWrong + obj.mathWrong,
          mathExam: acc.mathExam + obj.mathExam,
          writing: acc.writing + obj.writing
        };
      }, { mathCorrect: 0, mathWrong: 0, mathExam: 0, writing: 0 });

      message += `
Math questions: ${total.mathCorrect + total.mathWrong}
Math correct: ${total.mathCorrect} (${total.mathCorrect === 0 ? '' : (100 * total.mathCorrect/(total.mathCorrect + total.mathWrong)).toFixed(0)+'%'})
Math test: ${total.mathExam}
Writing practiced: ${total.writing}
`
    }

    await sesSendEmail(user.notification.emails, 'Learn with AI weekly report', message);
  }

  return {
    statusCode: 200,
    body: 'Success'
  }
}

async function sendDailyNotification() {
  const users = await listUserData();

  for (const user of users) {
    if (
      !user.notification || 
      user.notification.emails.length === 0 || 
      !user.notification.types.includes('Daily')
    ) continue;

    const date = new Date();
    date.setDate(date.getDate() - 1);

    const dateString = new Date(date.toLocaleString('sv').slice(0,10)).toISOString().slice(0,10);

    const daily = user.daily.find(d => d.date === dateString);

    let message = `
Daily report for ${user.username}
Date: ${dateString}
`

    if (!daily) {
      message += `
You didn't have any practices yesterday!
`
    } else {
      message += `
Math questions: ${daily.mathCorrect + daily.mathWrong}
Math correct: ${daily.mathCorrect} (${daily.mathCorrect === 0 ? '' : (100 * daily.mathCorrect/(daily.mathCorrect + daily.mathWrong)).toFixed(0)+'%'})
Math test: ${daily.mathExam}
Writing practiced: ${daily.writing}
`
    }    

    await sesSendEmail(user.notification.emails, 'Learn with AI daily report', message);
  }

  return {
    statusCode: 200,
    body: 'Success'
  }
}

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

export {
  sendDailyNotification,
  sendMonthlyNotification,
  sendWeeklyNotification
}