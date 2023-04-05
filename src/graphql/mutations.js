/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      correctCount
      wrongCount
      badCount
      createdAt
      updatedAt
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
      correctCount
      wrongCount
      badCount
      createdAt
      updatedAt
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
      correctCount
      wrongCount
      badCount
      createdAt
      updatedAt
    }
  }
`;
