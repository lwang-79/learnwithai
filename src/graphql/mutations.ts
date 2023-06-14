/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const learnwithaiSubscribe = /* GraphQL */ `
  mutation LearnwithaiSubscribe(
    $operation: String!
    $userId: ID!
    $subscriptionId: String!
  ) {
    learnwithaiSubscribe(
      operation: $operation
      userId: $userId
      subscriptionId: $subscriptionId
    ) {
      statusCode
      body
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const createQuestionSet = /* GraphQL */ `
  mutation CreateQuestionSet(
    $input: CreateQuestionSetInput!
    $condition: ModelQuestionSetConditionInput
  ) {
    createQuestionSet(input: $input, condition: $condition) {
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
export const updateQuestionSet = /* GraphQL */ `
  mutation UpdateQuestionSet(
    $input: UpdateQuestionSetInput!
    $condition: ModelQuestionSetConditionInput
  ) {
    updateQuestionSet(input: $input, condition: $condition) {
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
export const deleteQuestionSet = /* GraphQL */ `
  mutation DeleteQuestionSet(
    $input: DeleteQuestionSetInput!
    $condition: ModelQuestionSetConditionInput
  ) {
    deleteQuestionSet(input: $input, condition: $condition) {
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
export const createTest = /* GraphQL */ `
  mutation CreateTest(
    $input: CreateTestInput!
    $condition: ModelTestConditionInput
  ) {
    createTest(input: $input, condition: $condition) {
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
export const updateTest = /* GraphQL */ `
  mutation UpdateTest(
    $input: UpdateTestInput!
    $condition: ModelTestConditionInput
  ) {
    updateTest(input: $input, condition: $condition) {
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
export const deleteTest = /* GraphQL */ `
  mutation DeleteTest(
    $input: DeleteTestInput!
    $condition: ModelTestConditionInput
  ) {
    deleteTest(input: $input, condition: $condition) {
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
export const createEssay = /* GraphQL */ `
  mutation CreateEssay(
    $input: CreateEssayInput!
    $condition: ModelEssayConditionInput
  ) {
    createEssay(input: $input, condition: $condition) {
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
export const updateEssay = /* GraphQL */ `
  mutation UpdateEssay(
    $input: UpdateEssayInput!
    $condition: ModelEssayConditionInput
  ) {
    updateEssay(input: $input, condition: $condition) {
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
export const deleteEssay = /* GraphQL */ `
  mutation DeleteEssay(
    $input: DeleteEssayInput!
    $condition: ModelEssayConditionInput
  ) {
    deleteEssay(input: $input, condition: $condition) {
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
