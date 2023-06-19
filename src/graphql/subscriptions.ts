/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
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
      optionStates {
        mathMode
        mathNumber
        mathSource
        mathLevel
        mathConcepts
        writingType
        writingTopic
        writingLevel
        stemMode
        stemNumber
        stemLevel
        stemConcepts
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
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
      optionStates {
        mathMode
        mathNumber
        mathSource
        mathLevel
        mathConcepts
        writingType
        writingTopic
        writingLevel
        stemMode
        stemNumber
        stemLevel
        stemConcepts
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
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
      optionStates {
        mathMode
        mathNumber
        mathSource
        mathLevel
        mathConcepts
        writingType
        writingTopic
        writingLevel
        stemMode
        stemNumber
        stemLevel
        stemConcepts
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
export const onCreateQuestionSet = /* GraphQL */ `
  subscription OnCreateQuestionSet(
    $filter: ModelSubscriptionQuestionSetFilterInput
    $owner: String
  ) {
    onCreateQuestionSet(filter: $filter, owner: $owner) {
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
export const onUpdateQuestionSet = /* GraphQL */ `
  subscription OnUpdateQuestionSet(
    $filter: ModelSubscriptionQuestionSetFilterInput
    $owner: String
  ) {
    onUpdateQuestionSet(filter: $filter, owner: $owner) {
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
export const onDeleteQuestionSet = /* GraphQL */ `
  subscription OnDeleteQuestionSet(
    $filter: ModelSubscriptionQuestionSetFilterInput
    $owner: String
  ) {
    onDeleteQuestionSet(filter: $filter, owner: $owner) {
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
export const onCreateTest = /* GraphQL */ `
  subscription OnCreateTest(
    $filter: ModelSubscriptionTestFilterInput
    $owner: String
  ) {
    onCreateTest(filter: $filter, owner: $owner) {
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
export const onUpdateTest = /* GraphQL */ `
  subscription OnUpdateTest(
    $filter: ModelSubscriptionTestFilterInput
    $owner: String
  ) {
    onUpdateTest(filter: $filter, owner: $owner) {
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
export const onDeleteTest = /* GraphQL */ `
  subscription OnDeleteTest(
    $filter: ModelSubscriptionTestFilterInput
    $owner: String
  ) {
    onDeleteTest(filter: $filter, owner: $owner) {
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
export const onCreateEssay = /* GraphQL */ `
  subscription OnCreateEssay(
    $filter: ModelSubscriptionEssayFilterInput
    $owner: String
  ) {
    onCreateEssay(filter: $filter, owner: $owner) {
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
export const onUpdateEssay = /* GraphQL */ `
  subscription OnUpdateEssay(
    $filter: ModelSubscriptionEssayFilterInput
    $owner: String
  ) {
    onUpdateEssay(filter: $filter, owner: $owner) {
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
export const onDeleteEssay = /* GraphQL */ `
  subscription OnDeleteEssay(
    $filter: ModelSubscriptionEssayFilterInput
    $owner: String
  ) {
    onDeleteEssay(filter: $filter, owner: $owner) {
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
export const onCreateRankingItem = /* GraphQL */ `
  subscription OnCreateRankingItem(
    $filter: ModelSubscriptionRankingItemFilterInput
  ) {
    onCreateRankingItem(filter: $filter) {
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
export const onUpdateRankingItem = /* GraphQL */ `
  subscription OnUpdateRankingItem(
    $filter: ModelSubscriptionRankingItemFilterInput
  ) {
    onUpdateRankingItem(filter: $filter) {
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
export const onDeleteRankingItem = /* GraphQL */ `
  subscription OnDeleteRankingItem(
    $filter: ModelSubscriptionRankingItemFilterInput
  ) {
    onDeleteRankingItem(filter: $filter) {
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
