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
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createBadQuestionSet = /* GraphQL */ `
  mutation CreateBadQuestionSet(
    $input: CreateBadQuestionSetInput!
    $condition: ModelBadQuestionSetConditionInput
  ) {
    createBadQuestionSet(input: $input, condition: $condition) {
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
export const updateBadQuestionSet = /* GraphQL */ `
  mutation UpdateBadQuestionSet(
    $input: UpdateBadQuestionSetInput!
    $condition: ModelBadQuestionSetConditionInput
  ) {
    updateBadQuestionSet(input: $input, condition: $condition) {
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
export const deleteBadQuestionSet = /* GraphQL */ `
  mutation DeleteBadQuestionSet(
    $input: DeleteBadQuestionSetInput!
    $condition: ModelBadQuestionSetConditionInput
  ) {
    deleteBadQuestionSet(input: $input, condition: $condition) {
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
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createRankingItem = /* GraphQL */ `
  mutation CreateRankingItem(
    $input: CreateRankingItemInput!
    $condition: ModelRankingItemConditionInput
  ) {
    createRankingItem(input: $input, condition: $condition) {
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
export const updateRankingItem = /* GraphQL */ `
  mutation UpdateRankingItem(
    $input: UpdateRankingItemInput!
    $condition: ModelRankingItemConditionInput
  ) {
    updateRankingItem(input: $input, condition: $condition) {
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
export const deleteRankingItem = /* GraphQL */ `
  mutation DeleteRankingItem(
    $input: DeleteRankingItemInput!
    $condition: ModelRankingItemConditionInput
  ) {
    deleteRankingItem(input: $input, condition: $condition) {
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
export const createBadge = /* GraphQL */ `
  mutation CreateBadge(
    $input: CreateBadgeInput!
    $condition: ModelBadgeConditionInput
  ) {
    createBadge(input: $input, condition: $condition) {
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
export const updateBadge = /* GraphQL */ `
  mutation UpdateBadge(
    $input: UpdateBadgeInput!
    $condition: ModelBadgeConditionInput
  ) {
    updateBadge(input: $input, condition: $condition) {
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
export const deleteBadge = /* GraphQL */ `
  mutation DeleteBadge(
    $input: DeleteBadgeInput!
    $condition: ModelBadgeConditionInput
  ) {
    deleteBadge(input: $input, condition: $condition) {
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
export const createSystemMessage = /* GraphQL */ `
  mutation CreateSystemMessage(
    $input: CreateSystemMessageInput!
    $condition: ModelSystemMessageConditionInput
  ) {
    createSystemMessage(input: $input, condition: $condition) {
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
export const updateSystemMessage = /* GraphQL */ `
  mutation UpdateSystemMessage(
    $input: UpdateSystemMessageInput!
    $condition: ModelSystemMessageConditionInput
  ) {
    updateSystemMessage(input: $input, condition: $condition) {
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
export const deleteSystemMessage = /* GraphQL */ `
  mutation DeleteSystemMessage(
    $input: DeleteSystemMessageInput!
    $condition: ModelSystemMessageConditionInput
  ) {
    deleteSystemMessage(input: $input, condition: $condition) {
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
