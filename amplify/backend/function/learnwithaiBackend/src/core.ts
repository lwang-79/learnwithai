import {
  createRankingItem,
  getRankingItemsByDateAndType,
  listUserData,
  RankingItem,
  RankingType,
  updateRankingItem,
  UserData,
} from "./graphql";
import fetch from "node-fetch";

async function sendMonthlyNotification(user: UserData) {
  if (
    !user.notification ||
    user.notification.emails.length === 0 ||
    !user.notification.types.includes("Monthly")
  )
    return;

  const date = new Date();
  date.setDate(date.getDate() - 2);

  const dateString = date.toISOString().slice(0, 7);

  const monthly = user.monthly.find((d) => d.date === dateString);

  let message = `
Monthly report for ${user.username}
Date: ${dateString}
`;

  if (!monthly) {
    message += `
You didn't have any practices last month!
`;
  } else {
    message += `
Math questions: ${monthly.mathCorrect + monthly.mathWrong}
Math correct: ${monthly.mathCorrect} (${monthly.mathCorrect === 0 ? "" : ((100 * monthly.mathCorrect) / (monthly.mathCorrect + monthly.mathWrong)).toFixed(0) + "%"})
Math test: ${monthly.mathExam}
Writing practiced: ${monthly.writing}
`;
  }

  await sesSendEmail(
    user.notification.emails,
    `${process.env.APP_NAME} monthly report`,
    message,
  );

  return {
    statusCode: 200,
    body: "Success",
  };
}

async function sendWeeklyNotification(user: UserData) {
  if (
    !user.notification ||
    user.notification.emails.length === 0 ||
    !user.notification.types.includes("Monthly")
  )
    return;

  let date = new Date();
  date.setDate(date.getDate() - 1);

  const endDate = new Date(date.toLocaleString("sv").slice(0, 10))
    .toISOString()
    .slice(0, 10);

  date = new Date();
  date.setDate(date.getDate() - 7);

  const startDate = new Date(date.toLocaleString("sv").slice(0, 10))
    .toISOString()
    .slice(0, 10);

  const data = user.daily.filter(
    (d) => d.date >= startDate && d.date <= endDate,
  );

  let message = `
Weekly report for ${user.username}
Date: from ${startDate} to ${endDate}
`;

  if (data.length === 0) {
    message += `
You didn't have any practices last week!
`;
  } else {
    const total = data.reduce(
      (acc, obj) => {
        return {
          mathCorrect: acc.mathCorrect + obj.mathCorrect,
          mathWrong: acc.mathWrong + obj.mathWrong,
          mathExam: acc.mathExam + obj.mathExam,
          writing: acc.writing + obj.writing,
        };
      },
      { mathCorrect: 0, mathWrong: 0, mathExam: 0, writing: 0 },
    );

    message += `
Math questions: ${total.mathCorrect + total.mathWrong}
Math correct: ${total.mathCorrect} (${total.mathCorrect === 0 ? "" : ((100 * total.mathCorrect) / (total.mathCorrect + total.mathWrong)).toFixed(0) + "%"})
Math test: ${total.mathExam}
Writing practiced: ${total.writing}
`;
  }

  await sesSendEmail(
    user.notification.emails,
    `${process.env.APP_NAME} weekly report`,
    message,
  );

  return {
    statusCode: 200,
    body: "Success",
  };
}

async function sendDailyNotification(user: UserData) {
  if (
    !user.notification ||
    user.notification.emails.length === 0 ||
    !user.notification.types.includes("Daily")
  )
    return;

  const date = new Date();
  date.setDate(date.getDate() - 1);

  const dateString = new Date(date.toLocaleString("sv").slice(0, 10))
    .toISOString()
    .slice(0, 10);

  const daily = user.daily.find((d) => d.date === dateString);

  let message = `
Daily report for ${user.username}
Date: ${dateString}
`;

  if (!daily) {
    message += `
You didn't have any practices yesterday!
`;
  } else {
    message += `
Math questions: ${daily.mathCorrect + daily.mathWrong}
Math correct: ${daily.mathCorrect} (${daily.mathCorrect === 0 ? "" : ((100 * daily.mathCorrect) / (daily.mathCorrect + daily.mathWrong)).toFixed(0) + "%"})
Math test: ${daily.mathExam}
Writing practiced: ${daily.writing}
`;
  }

  await sesSendEmail(
    user.notification.emails,
    `${process.env.APP_NAME} daily report`,
    message,
  );

  return {
    statusCode: 200,
    body: "Success",
  };
}

async function sesSendEmail(to: string[], subject: string, message: string) {
  const body = {
    from: "notification@StudyWithAI.pro",
    to: to,
    subject: subject,
    message: message,
  };

  await fetch(
    "https://lelnuzxenk.execute-api.ap-southeast-2.amazonaws.com/production/sendbasicemail",
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    },
  );
}

async function getStaticDataAndSendNotification(
  users: UserData[],
  dayString: string,
  monthString: string,
) {
  let mathCorrectNumberByDayData: [string, number][] = [];
  let mathCorrectNumberByMonthData: [string, number][] = [];
  let writingNumberByDayData: [string, number][] = [];
  let writingNumberByMonthData: [string, number][] = [];

  for (const user of users) {
    if (user.daily) {
      const dayData = user.daily.find((d) => d.date === dayString);
      if (dayData) {
        const mathScore =
          dayData.mathExam * 20 + dayData.mathCorrect * 10 + dayData.mathWrong;
        if (mathScore > 100) {
          mathCorrectNumberByDayData.push([user.username, mathScore]);
        }
        if (dayData.writing > 0) {
          writingNumberByDayData.push([user.username, dayData.writing * 10]);
        }
      }
    }

    if (user.monthly) {
      const monthData = user.monthly.find((d) => d.date === monthString);
      if (monthData) {
        const mathScore =
          monthData.mathExam * 20 +
          monthData.mathCorrect * 10 +
          monthData.mathWrong;
        if (mathScore > 500) {
          mathCorrectNumberByMonthData.push([user.username, mathScore]);
        }
        if (monthData.writing > 5) {
          writingNumberByMonthData.push([
            user.username,
            monthData.writing * 10,
          ]);
        }
      }
    }

    // send notification
    const today = new Date();

    if (today.getDate() === 1) {
      await sendMonthlyNotification(user);
      await sendDailyNotification(user);
    } else if (today.getDay() === 0) {
      await sendWeeklyNotification(user);
      await sendDailyNotification(user);
    } else {
      await sendDailyNotification(user);
    }
  }

  return {
    mathByDay: mathCorrectNumberByDayData,
    mathByMonth: mathCorrectNumberByMonthData,
    writingByDay: writingNumberByDayData,
    writingByMonth: writingNumberByMonthData,
  };
}

async function processData() {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const dayString = new Date(yesterday.toLocaleString("sv").slice(0, 10))
    .toISOString()
    .slice(0, 10);
  const monthString = dayString.slice(0, 7);

  let mathCorrectNumberByDayData: [string, number][] = [];
  let mathCorrectNumberByMonthData: [string, number][] = [];
  let writingNumberByDayData: [string, number][] = [];
  let writingNumberByMonthData: [string, number][] = [];

  let token = null;
  do {
    let { users, nextToken } = await listUserData(token);

    const { mathByDay, mathByMonth, writingByDay, writingByMonth } =
      await getStaticDataAndSendNotification(users, dayString, monthString);

    mathCorrectNumberByDayData = mathCorrectNumberByDayData.concat(mathByDay);
    mathCorrectNumberByMonthData =
      mathCorrectNumberByMonthData.concat(mathByMonth);
    writingNumberByDayData = writingNumberByDayData.concat(writingByDay);
    writingNumberByMonthData = writingNumberByMonthData.concat(writingByMonth);

    token = nextToken;
  } while (token);

  await createOrSaveRankingItem(
    RankingType.MATH_CORRECT_NUMBER_BY_DAY,
    dayString,
    mathCorrectNumberByDayData,
  );
  await createOrSaveRankingItem(
    RankingType.MATH_CORRECT_NUMBER_BY_MONTH,
    monthString,
    mathCorrectNumberByMonthData,
  );
  await createOrSaveRankingItem(
    RankingType.WRITING_NUMBER_BY_DAY,
    dayString,
    writingNumberByDayData,
  );
  await createOrSaveRankingItem(
    RankingType.WRITING_NUMBER_BY_MONTH,
    monthString,
    writingNumberByMonthData,
  );

  return {
    statusCode: 200,
    body: "Success",
  };
}

async function createOrSaveRankingItem(
  type: RankingType,
  date: string,
  data: [string, number][],
) {
  while (data.length < 5) {
    const firstNames = [
      "Steve",
      "John",
      "Michael",
      "David",
      "Emily",
      "Sarah",
      "Jessica",
      "Michelle",
      "James",
      "William",
      "Emma",
      "Olivia",
      "Sophia",
      "Ava",
      "Isabella",
      "Aarav",
      "Arjun",
      "Vivaan",
      "Kabir",
      "Aryan",
      "Diya",
      "Aishwarya",
      "Suhana",
      "Neha",
      "Riya",
      "Akira",
      "Hiroshi",
      "Ryota",
      "Kazuki",
      "Kenji",
      "Ayumi",
      "Haruka",
      "Yumi",
      "Emi",
      "Sakura",
      "Wei Chen",
      "Xiao Li",
      "Yi Wang",
      "Jian Zhang",
      "Hao Liu",
      "Mei Huang",
      "Li Yang",
      "Xiu Wu",
      "Yan Lin",
      "Fang Xu",
      "Louis",
      "Pierre",
      "Lucas",
      "Alexandre",
      "Gabriel",
      "Emma",
      "Charlotte",
      "Sophie",
      "Camille",
      "Juliette",
      "Carlos",
      "Alejandro",
      "Javier",
      "Diego",
      "Luis",
      "Sofía",
      "Isabella",
      "Carmen",
      "Ana",
      "María",
      "Luca",
      "Giuseppe",
      "Alessandro",
      "Marco",
      "Antonio",
      "Sofia",
      "Giulia",
      "Isabella",
      "Francesca",
      "Lorenza",
    ];
    // const lastNames = [
    //   'Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Taylor', 'Wilson',
    //   'Miller', 'Anderson', 'Patel', 'Sharma', 'Kumar', 'Singh', 'Desai', 'Choudhury',
    //   'Reddy', 'Mukherjee', 'Malhotra', 'Bose'
    // ];
    const randomFirstName =
      firstNames[Math.floor(Math.random() * firstNames.length)];
    // const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const randomScore =
      type === RankingType.MATH_CORRECT_NUMBER_BY_DAY
        ? Math.floor(Math.random() * 101) + 100
        : type === RankingType.MATH_CORRECT_NUMBER_BY_MONTH
          ? Math.floor(Math.random() * 1001) + 1000
          : type === RankingType.WRITING_NUMBER_BY_DAY
            ? Math.floor(Math.random() * 2) + 1
            : Math.floor(Math.random() * 100) + 10;
    data.push([`${randomFirstName}`, randomScore]);
  }

  const names = data
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map((d) => d[0]);
  const values = data
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map((d) => d[1].toString());

  const items = await getRankingItemsByDateAndType(date, type);

  if (!items || items.length === 0) {
    const item = {
      date: date,
      type: type,
      names: names,
      values: values,
    };
    await createRankingItem(item);
  } else {
    const item = items[0];
    item.names = names;
    item.values = values;

    await updateRankingItem(item);
  }
}

export {
  processData,
  sendDailyNotification,
  sendMonthlyNotification,
  sendWeeklyNotification,
};
