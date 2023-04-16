import { API, graphqlOperation } from "aws-amplify";
import { CreateUserMutation, UserBySubQuery } from "./API";
import { userBySub } from "../graphql/queries";
import { GraphQLResult } from '@aws-amplify/api';
import { Quota } from './quota';
import { createUser } from "../graphql/mutations";
import { Statistic } from "@/models";

export type UserParams = {
  id: string
  username: string
  email: string
  picture: string
  quota: {
    mathPerDay: number
    readingPerDay: number
    writingPerDay: number
    savedQuestions: number
    savedTests: number
    savedEssays: number
  },
  membership: {
    current: number
    previous: number
    paypalSubscriptions: {
      personal: (string | null)[]
      professional: (string | null)[]
      enterprise: (string | null)[]
    },
  },
}

export const createUserIfNotExist = async (userAttributes: any): Promise<UserParams> => {
  const queryResult = await API.graphql<UserBySubQuery>(
    graphqlOperation(userBySub, {sub: userAttributes.sub})
  ) as GraphQLResult<UserBySubQuery>;
  
  const matchedUsers = queryResult.data?.userBySub?.items

  if (matchedUsers && matchedUsers.length > 0) {
    return(matchedUsers[0]! as UserParams);
  }

  const newUser = {
    sub: userAttributes.sub as string,
    username: userAttributes.name as string,
    email: userAttributes.email as string,
    picture: userAttributes.picture as string?? '',
    quota: Quota.free,
    membership: {
      current: 0,
      previous: 0,
      paypalSubscriptions: {
        personal: [],
        professional: [],
        enterprise: []
      },
    },
    payerId: 'NA',
  };

  const mutationResult = await API.graphql<CreateUserMutation>(
    graphqlOperation(createUser, {input: newUser})
  ) as GraphQLResult<CreateUserMutation>

  const user = mutationResult.data?.createUser as UserParams
  
  return(user);
}


export const isAuthenticated = () => {
  return window['localStorage']['isAuthenticated'] === 'true';
}

export const getLevel = (daily: Statistic[]): {mathLevel: number, writingLevel: number} => {
  let mathLevel = 0;
  let writingLevel = 0;

  const dateObj = new Date();
  dateObj.setDate(dateObj.getDate() - 7);
  const weeklyData = daily.filter(stat => stat.date >= dateObj.toLocaleString('sv-SE').slice(0, 10));

  const mathTotal = weeklyData.reduce((acc, { mathCorrect }) => acc + mathCorrect, 0);
  const writingTotal = weeklyData.reduce((acc, { writing }) => acc + writing, 0);

  if (mathTotal > 500) {
    mathLevel = 4;
  } else if (mathTotal > 250) {
    mathLevel = 3;
  } else if (mathTotal > 100) {
    mathLevel = 2;
  } else if (mathTotal > 50) {
    mathLevel = 1;
  } else {
    mathLevel = 0;
  }

  if (writingTotal > 15) {
    writingLevel = 4;
  } else if (writingTotal > 10) {
    writingLevel = 3;
  } else if (writingTotal > 5) {
    writingLevel = 2;
  } else if (writingTotal > 3) {
    writingLevel = 1;
  } else {
    writingLevel = 0;
  }

  return {mathLevel: mathLevel, writingLevel: writingLevel};
}
