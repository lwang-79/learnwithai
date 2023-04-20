import { execute } from "./api";

interface Statistic {
  date: string
  mathCorrect: number
  mathWrong: number
  mathExam: number
  mathRequest: number
  readingCorrect: number
  readingWrong: number
  readingRequest: number
  writing: number
  writingRequest: number
}

export interface UserData {
  id: string
  username: string
  membership: {
    current: number
  }
  daily: Statistic[]
  monthly: Statistic[]
  notification: {
    emails: (string|null)[]
    types: (string|null)[]
  }
  _version: number
}

async function listUserData(): Promise<UserData[]> {
  const query = /* GraphQL */ `
    query ListUserData {
      listUsers {
        items {
          id
          username
          membership {
            current
          }
          daily {
            date
            mathCorrect
            mathWrong
            mathExam
            readingCorrect
            readingWrong
            writing
          }
          monthly {
            date
            mathCorrect
            mathWrong
            mathExam
            readingCorrect
            readingWrong
            writing
          }
          notification {
            emails
            types
          }
        }
      }
    }
  `;

  const variable = {};

  const response = await execute(query, variable);

  if (response.statusCode != 200) {
    throw new Error('Failed to list users!');
  }

  const users: UserData[] = response.body.data.listUsers.items;

  if (!users) {
    throw new Error('Failed to list users!');
  }

  return users;
}

export {
  listUserData
}