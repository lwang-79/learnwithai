import { execute } from "./api";

export interface UserMembership {
  id: string
  membership: {
    paypalSubscriptions: {
      personal: string[]
      professional: string[]
      enterprise: string[]
    }
    current: number
    previous: number
  }
  quota: {
    mathPerDay: number
    readingPerDay: number
    writingPerDay: number
    savedQuestions: number
    savedTests: number
    savedEssays: number
  }
  payerId: string
  _version: number
  // owner: string
}

async function getUserMembershipById(id: string): Promise<UserMembership> {
  const query = /* GraphQL */ `
    query GetUserMembership ($id: ID!) {
      getUser(id: $id) {
        id
        membership {
          paypalSubscriptions {
            personal
            professional
            enterprise
          }
          current
          previous
        }
        quota {
          mathPerDay
          readingPerDay
          writingPerDay
          savedQuestions
          savedTests
          savedEssays
        }
        payerId
        _version
        # owner
      }
    }
  `;

  const variable = { id: id };

  const response = await execute(query, variable);

  if (response.statusCode != 200) {
    throw new Error('Failed to get user!');
  }

  const userMembership: UserMembership = response.body.data.getUser;

  if (!userMembership) {
    throw new Error('Failed to get user!');
  }

  return userMembership;
}

async function updateUserMembership(userMembership: UserMembership) {
  const mutation = /* GraphQL */ `
    mutation UpdateUserMembership ($input: UpdateUserInput!) {
      updateUser(input: $input) {
        id
      }
    }
  `;

  const variable = { input: userMembership };

  const response = await execute(mutation, variable);

  return response;
}

async function getUserMembershipsByPayerId(
  payerId: string
): Promise<{
  statusCode: number
  body: UserMembership[] | string
}> {
  const query = /* GraphQL */ `
    query GetUserMembershipsByPayerId ($payerId: String!) {
      userByPayerId(payerId: $payerId) {
        items {
          id
          membership {
            paypalSubscriptions {
              personal
              professional
              enterprise
            }
            current
            previous
          }
          quota {
            mathPerDay
            readingPerDay
            writingPerDay
            savedQuestions
            savedTests
            savedEssays
          }
          payerId
          _version
          # owner
        }
      }
    }
  `;

  const variable = { payerId: payerId };

  const response = await execute(query, variable);

  if (response.statusCode != 200) {

    return { statusCode: response.statusCode, body: response.body.data };
  }

  const userMemberships: UserMembership[] = response.body.data.userByPayerId.items;

  if (!userMemberships) {
    throw new Error('Failed to get user!');
  }

  return { statusCode: 200, body: userMemberships };
}

export {
  getUserMembershipById,
  getUserMembershipsByPayerId,
  updateUserMembership
}