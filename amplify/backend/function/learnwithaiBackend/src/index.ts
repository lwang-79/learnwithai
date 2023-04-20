import { sendDailyNotification, sendMonthlyNotification, sendWeeklyNotification } from "./core";

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  let statusCode = 200;
  let body = 'Success';

  const today = new Date();

  if (today.getDate() === 1) {
    ({ statusCode, body } = await sendMonthlyNotification());
  } else if (today.getDay() === 0) {
    ({ statusCode, body } = await sendWeeklyNotification());
  } else {
    ({ statusCode, body } = await sendDailyNotification());
  }

  return {
    statusCode: statusCode,
    body: body,
  };
};