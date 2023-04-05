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
export const onCreateQuestionSet = /* GraphQL */ `
  subscription OnCreateQuestionSet(
    $filter: ModelSubscriptionQuestionSetFilterInput
  ) {
    onCreateQuestionSet(filter: $filter) {
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
export const onUpdateQuestionSet = /* GraphQL */ `
  subscription OnUpdateQuestionSet(
    $filter: ModelSubscriptionQuestionSetFilterInput
  ) {
    onUpdateQuestionSet(filter: $filter) {
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
export const onDeleteQuestionSet = /* GraphQL */ `
  subscription OnDeleteQuestionSet(
    $filter: ModelSubscriptionQuestionSetFilterInput
  ) {
    onDeleteQuestionSet(filter: $filter) {
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
