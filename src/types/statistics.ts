import { Statistic, User } from "@/models";
import { DataStore } from "aws-amplify";

export const InitStatistic: Statistic = {
  date: '',
  mathCorrect: 0,
  mathWrong: 0,
  mathExam: 0,
  mathRequest: 0,
  readingCorrect: 0,
  readingWrong: 0,
  readingRequest: 0,
  writing: 0,
  writingRequest: 0
}

export const getTodayStatistic = async (user: User) => {
  const today = (new Date()).toLocaleString('sv-SE');
  const currentDay = today.slice(0,10);

  if (user.daily) {
    return user.daily.filter(s => s.date === currentDay)[0];
  }

  return undefined;
}

export const addStatisticData = async (
  statistic: Statistic,
  userId?: string,
  user?: User,
): Promise<User|undefined> => {
  if (!user) {
    if (!userId) return;
    user = await DataStore.query(User, userId);
    if (!user) return;
  }

  const today = (new Date()).toLocaleString('sv-SE');
  const currentDay = today.slice(0,10);
  const currentMonth = today.slice(0,7);
  const currentYear = today.slice(0,4);

  let daily = [{...statistic, date: currentDay}];
  if (user.daily) {
    daily = addAndGetStatic(user.daily, statistic, currentDay);
  }

  let monthly = [{...statistic, date: currentMonth}];
  if (user.monthly) {
    monthly = addAndGetStatic(user.monthly, statistic, currentMonth);
  } 

  let yearly = [{...statistic, date: currentYear}];
  if (user.yearly) {
    yearly = addAndGetStatic(user.yearly, statistic, currentYear);
  } 

  const updatedUser = await DataStore.save(User.copyOf(
    user,
    updated => {
      updated.daily = daily;
      updated.monthly = monthly;
      updated.yearly = yearly;
    }
  ));

  return updatedUser;
}

const addAndGetStatic = (
  current: Statistic[],
  statistic: Statistic,
  date: string
): Statistic[] => {
  let currentStatistic = current.filter(s => s.date === date)[0];
  if (currentStatistic) {
    let s: Statistic = {
      date: date,
      mathCorrect: currentStatistic.mathCorrect + statistic.mathCorrect,
      mathWrong: currentStatistic.mathWrong + statistic.mathWrong,
      mathExam: currentStatistic.mathExam + statistic.mathExam,
      mathRequest: currentStatistic.mathRequest + statistic.mathRequest,
      readingCorrect: currentStatistic.readingCorrect + statistic.readingCorrect,
      readingWrong: currentStatistic.readingWrong + statistic.readingWrong,
      readingRequest: currentStatistic.readingRequest + statistic.readingRequest,
      writing: currentStatistic.writing + statistic.writing,
      writingRequest: currentStatistic.writingRequest + statistic.writingRequest
    };

    const removed = current.filter(s => s.date !== date);
    return [s, ...removed];
  } else {
    return [{...statistic, date: date}, ...current];
  } 
}
