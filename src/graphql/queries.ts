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
        classroomRound
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
      owner
      badges
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
          classroomRound
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
        owner
        badges
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
          classroomRound
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
        owner
        badges
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
          classroomRound
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
        owner
        badges
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
          classroomRound
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
        owner
        badges
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getBadQuestionSet = /* GraphQL */ `
  query GetBadQuestionSet($id: ID!) {
    getBadQuestionSet(id: $id) {
      id
      source
      question
      options
      answer
      workout
      type
      category
      level
      concept
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const listBadQuestionSets = /* GraphQL */ `
  query ListBadQuestionSets(
    $filter: ModelBadQuestionSetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBadQuestionSets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        source
        question
        options
        answer
        workout
        type
        category
        level
        concept
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
export const syncBadQuestionSets = /* GraphQL */ `
  query SyncBadQuestionSets(
    $filter: ModelBadQuestionSetFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncBadQuestionSets(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        source
        question
        options
        answer
        workout
        type
        category
        level
        concept
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
      source
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
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        source
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
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
        source
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
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getRankingItem = /* GraphQL */ `
  query GetRankingItem($id: ID!) {
    getRankingItem(id: $id) {
      id
      date
      type
      names
      values
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listRankingItems = /* GraphQL */ `
  query ListRankingItems(
    $filter: ModelRankingItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRankingItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        type
        names
        values
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncRankingItems = /* GraphQL */ `
  query SyncRankingItems(
    $filter: ModelRankingItemFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncRankingItems(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        date
        type
        names
        values
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const rankingItemsByDateAndType = /* GraphQL */ `
  query RankingItemsByDateAndType(
    $date: String!
    $type: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRankingItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    rankingItemsByDateAndType(
      date: $date
      type: $type
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        date
        type
        names
        values
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getBadge = /* GraphQL */ `
  query GetBadge($id: ID!) {
    getBadge(id: $id) {
      id
      name
      startDate
      endDate
      criteria
      description
      image
      isVisible
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listBadges = /* GraphQL */ `
  query ListBadges(
    $filter: ModelBadgeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBadges(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        startDate
        endDate
        criteria
        description
        image
        isVisible
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncBadges = /* GraphQL */ `
  query SyncBadges(
    $filter: ModelBadgeFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncBadges(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        startDate
        endDate
        criteria
        description
        image
        isVisible
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getSystemMessage = /* GraphQL */ `
  query GetSystemMessage($id: ID!) {
    getSystemMessage(id: $id) {
      id
      content
      internalLink
      externalLink
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listSystemMessages = /* GraphQL */ `
  query ListSystemMessages(
    $filter: ModelSystemMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSystemMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        content
        internalLink
        externalLink
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncSystemMessages = /* GraphQL */ `
  query SyncSystemMessages(
    $filter: ModelSystemMessageFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSystemMessages(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        content
        internalLink
        externalLink
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
