/* tslint:disable */
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
        savedQuestions
        savedTests
        savedEssays
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
      daily {
        date
        mathCorrect
        mathWrong
        mathExam
        mathRequest
        readingCorrect
        readingWrong
        readingRequest
        writing
        writingRequest
      }
      monthly {
        date
        mathCorrect
        mathWrong
        mathExam
        mathRequest
        readingCorrect
        readingWrong
        readingRequest
        writing
        writingRequest
      }
      yearly {
        date
        mathCorrect
        mathWrong
        mathExam
        mathRequest
        readingCorrect
        readingWrong
        readingRequest
        writing
        writingRequest
      }
      gameData {
        startDate
        level
        score
        seed
        collections
      }
      notification {
        emails
        types
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
          savedQuestions
          savedTests
          savedEssays
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
        daily {
          date
          mathCorrect
          mathWrong
          mathExam
          mathRequest
          readingCorrect
          readingWrong
          readingRequest
          writing
          writingRequest
        }
        monthly {
          date
          mathCorrect
          mathWrong
          mathExam
          mathRequest
          readingCorrect
          readingWrong
          readingRequest
          writing
          writingRequest
        }
        yearly {
          date
          mathCorrect
          mathWrong
          mathExam
          mathRequest
          readingCorrect
          readingWrong
          readingRequest
          writing
          writingRequest
        }
        gameData {
          startDate
          level
          score
          seed
          collections
        }
        notification {
          emails
          types
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
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
          savedQuestions
          savedTests
          savedEssays
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
        daily {
          date
          mathCorrect
          mathWrong
          mathExam
          mathRequest
          readingCorrect
          readingWrong
          readingRequest
          writing
          writingRequest
        }
        monthly {
          date
          mathCorrect
          mathWrong
          mathExam
          mathRequest
          readingCorrect
          readingWrong
          readingRequest
          writing
          writingRequest
        }
        yearly {
          date
          mathCorrect
          mathWrong
          mathExam
          mathRequest
          readingCorrect
          readingWrong
          readingRequest
          writing
          writingRequest
        }
        gameData {
          startDate
          level
          score
          seed
          collections
        }
        notification {
          emails
          types
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
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
          savedQuestions
          savedTests
          savedEssays
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
        daily {
          date
          mathCorrect
          mathWrong
          mathExam
          mathRequest
          readingCorrect
          readingWrong
          readingRequest
          writing
          writingRequest
        }
        monthly {
          date
          mathCorrect
          mathWrong
          mathExam
          mathRequest
          readingCorrect
          readingWrong
          readingRequest
          writing
          writingRequest
        }
        yearly {
          date
          mathCorrect
          mathWrong
          mathExam
          mathRequest
          readingCorrect
          readingWrong
          readingRequest
          writing
          writingRequest
        }
        gameData {
          startDate
          level
          score
          seed
          collections
        }
        notification {
          emails
          types
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
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
          savedQuestions
          savedTests
          savedEssays
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
        daily {
          date
          mathCorrect
          mathWrong
          mathExam
          mathRequest
          readingCorrect
          readingWrong
          readingRequest
          writing
          writingRequest
        }
        monthly {
          date
          mathCorrect
          mathWrong
          mathExam
          mathRequest
          readingCorrect
          readingWrong
          readingRequest
          writing
          writingRequest
        }
        yearly {
          date
          mathCorrect
          mathWrong
          mathExam
          mathRequest
          readingCorrect
          readingWrong
          readingRequest
          writing
          writingRequest
        }
        gameData {
          startDate
          level
          score
          seed
          collections
        }
        notification {
          emails
          types
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
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
      testId
      indexInTest
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
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
        testId
        indexInTest
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncQuestionSets = /* GraphQL */ `
  query SyncQuestionSets(
    $filter: ModelQuestionSetFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncQuestionSets(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
        testId
        indexInTest
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const getTest = /* GraphQL */ `
  query GetTest($id: ID!) {
    getTest(id: $id) {
      id
      category
      dateTime
      duration
      total
      wrong
      correct
      questionSets {
        type
        category
        level
        concept
        question
        options
        answer
        selected
        workout
        isBad
        isTarget
        isMarked
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const listTests = /* GraphQL */ `
  query ListTests(
    $filter: ModelTestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        category
        dateTime
        duration
        total
        wrong
        correct
        questionSets {
          type
          category
          level
          concept
          question
          options
          answer
          selected
          workout
          isBad
          isTarget
          isMarked
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncTests = /* GraphQL */ `
  query SyncTests(
    $filter: ModelTestFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTests(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        category
        dateTime
        duration
        total
        wrong
        correct
        questionSets {
          type
          category
          level
          concept
          question
          options
          answer
          selected
          workout
          isBad
          isTarget
          isMarked
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const getEssay = /* GraphQL */ `
  query GetEssay($id: ID!) {
    getEssay(id: $id) {
      id
      type
      level
      topic
      prompt
      text
      DateTime
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const listEssays = /* GraphQL */ `
  query ListEssays(
    $filter: ModelEssayFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEssays(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        level
        topic
        prompt
        text
        DateTime
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncEssays = /* GraphQL */ `
  query SyncEssays(
    $filter: ModelEssayFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncEssays(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        type
        level
        topic
        prompt
        text
        DateTime
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
