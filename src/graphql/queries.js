/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      sub
      username
      email
      picture
      quota {
        mathPerDay
        readingPerDay
        writingPerDay
      }
      membership {
        current
        previous
        paypalSubscriptions {
          personal
          professional
          enterprise
        }
      }
      payerId
      markedQuestions
      wrongQuestions
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        sub
        username
        email
        picture
        quota {
          mathPerDay
          readingPerDay
          writingPerDay
        }
        membership {
          current
          previous
        }
        payerId
        markedQuestions
        wrongQuestions
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const userBySub = /* GraphQL */ `
  query UserBySub(
    $sub: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userBySub(
      sub: $sub
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        sub
        username
        email
        picture
        quota {
          mathPerDay
          readingPerDay
          writingPerDay
        }
        membership {
          current
          previous
        }
        payerId
        markedQuestions
        wrongQuestions
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const userByPayerId = /* GraphQL */ `
  query UserByPayerId(
    $payerId: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByPayerId(
      payerId: $payerId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        sub
        username
        email
        picture
        quota {
          mathPerDay
          readingPerDay
          writingPerDay
        }
        membership {
          current
          previous
        }
        payerId
        markedQuestions
        wrongQuestions
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getQuestionSet = /* GraphQL */ `
  query GetQuestionSet($id: ID!) {
    getQuestionSet(id: $id) {
      id
      question
      options
      answer
      workout
      type
      category
      level
      concept
      correctCount
      wrongCount
      badCount
      createdAt
      updatedAt
    }
  }
`;
export const listQuestionSets = /* GraphQL */ `
  query ListQuestionSets(
    $filter: ModelQuestionSetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuestionSets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        question
        options
        answer
        workout
        type
        category
        level
        concept
        correctCount
        wrongCount
        badCount
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
