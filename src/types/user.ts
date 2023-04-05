import { API, graphqlOperation } from "aws-amplify";
import { CreateUserMutation, UserBySubQuery } from "./API";
import { userBySub } from "../graphql/queries";
import { User } from "../models";
import { GraphQLResult } from '@aws-amplify/api';
import { Quota } from './quota';
import { createUser } from "../graphql/mutations";


export type UserParams = {
    id: string
    username: string
    email: string
    picture: string
    quota: {
      mathPerDay: number
      readingPerDay: number
      writingPerDay: number
    },
    membership: {
      current: number
      previous: number
      paypalSubscriptions: {
        personal: (string | null)[]
        professional: (string | null)[]
        enterprise: (string | null)[]
      },
    }
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