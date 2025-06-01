import { execute } from "./api";

interface Statistic {
  date: string;
  mathCorrect: number;
  mathWrong: number;
  mathExam: number;
  mathRequest: number;
  readingCorrect: number;
  readingWrong: number;
  readingRequest: number;
  writing: number;
  writingRequest: number;
}

export interface UserData {
  id: string;
  username: string;
  membership: {
    current: number;
  };
  daily: Statistic[];
  monthly: Statistic[];
  notification: {
    emails: (string | null)[];
    types: (string | null)[];
  };
  _version: number;
}

export enum RankingType {
  MATH_CORRECT_NUMBER_BY_DAY = "MathCorrectNumberByDay",
  MATH_CORRECT_NUMBER_BY_MONTH = "MathCorrectNumberByMonth",
  WRITING_NUMBER_BY_DAY = "WritingNumberByDay",
  WRITING_NUMBER_BY_MONTH = "WritingNumberByMonth",
}

export interface RankingItem {
  id?: string;
  date: string;
  type: RankingType;
  names: string[];
  values: string[];
  _version?: number;
}

async function listUserData(
  nextToken?: string,
): Promise<{ users: UserData[]; nextToken: string }> {
  const query = /* GraphQL */ `
    query ListUserData($nextToken: String) {
      listUsers(limit: 20, nextToken: $nextToken) {
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
        nextToken
      }
    }
  `;

  const variable = { nextToken: nextToken };

  const response = await execute(query, variable);

  if (response.statusCode != 200) {
    throw new Error("Failed to list users!");
  }

  const users: UserData[] = response.body.data.listUsers.items;

  if (!users) {
    throw new Error("Failed to list users!");
  }

  return {
    users: users,
    nextToken: response.body.data.listUsers.nextToken,
  };
}

async function getRankingItemsByDateAndType(
  date: string,
  type: RankingType,
): Promise<RankingItem[]> {
  const query = /* GraphQL */ `
    query GetRankingItemsByDateAndType($date: String!, $type: String!) {
      rankingItemsByDateAndType(date: $date, type: { eq: $type }) {
        items {
          id
          date
          names
          type
          values
          _version
        }
      }
    }
  `;

  const variable = { date: date, type: type };

  const response = await execute(query, variable);

  if (response.statusCode != 200) {
    throw new Error("Failed to get ranking item!");
  }

  const items: RankingItem[] =
    response.body.data.rankingItemsByDateAndType.items;

  return items;
}

async function createRankingItem(item: RankingItem): Promise<void> {
  const query = /* GraphQL */ `
    mutation CreateRankingItem(
      $date: String!
      $names: [String!]!
      $type: RankingType!
      $values: [String!]!
    ) {
      createRankingItem(
        input: { date: $date, names: $names, type: $type, values: $values }
      ) {
        id
        date
        _version
        names
        type
        values
        updatedAt
        createdAt
        _lastChangedAt
        _deleted
      }
    }
  `;

  const variable = {
    date: item.date,
    names: item.names,
    type: item.type,
    values: item.values,
  };

  const response = await execute(query, variable);
  console.log(response);

  if (response.statusCode != 200) {
    throw new Error("Failed to create ranking item!");
  }
}

async function updateRankingItem(item: RankingItem): Promise<void> {
  const query = /* GraphQL */ `
    mutation UpdateRankingItem(
      $id: ID!
      $date: String!
      $names: [String!]!
      $type: RankingType!
      $values: [String!]!
      $version: Int!
    ) {
      updateRankingItem(
        input: {
          id: $id
          date: $date
          names: $names
          type: $type
          values: $values
          _version: $version
        }
      ) {
        id
        date
        _version
        names
        type
        values
        updatedAt
        createdAt
        _lastChangedAt
        _deleted
      }
    }
  `;

  const variable = {
    id: item.id!,
    date: item.date,
    names: item.names,
    type: item.type,
    values: item.values,
    version: item._version,
  };

  const response = await execute(query, variable);

  if (response.statusCode != 200) {
    throw new Error("Failed to create ranking item!");
  }
}

export {
  createRankingItem,
  updateRankingItem,
  getRankingItemsByDateAndType,
  listUserData,
};
