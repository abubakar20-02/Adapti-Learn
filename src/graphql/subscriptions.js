/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateQuestion = /* GraphQL */ `
  subscription OnCreateQuestion($filter: ModelSubscriptionQuestionFilterInput) {
    onCreateQuestion(filter: $filter) {
      id
      subject
      topic
      question
      options {
        A
        B
        C
        D
        __typename
      }
      explanation {
        A
        B
        C
        D
        __typename
      }
      correct_answer
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateQuestion = /* GraphQL */ `
  subscription OnUpdateQuestion($filter: ModelSubscriptionQuestionFilterInput) {
    onUpdateQuestion(filter: $filter) {
      id
      subject
      topic
      question
      options {
        A
        B
        C
        D
        __typename
      }
      explanation {
        A
        B
        C
        D
        __typename
      }
      correct_answer
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteQuestion = /* GraphQL */ `
  subscription OnDeleteQuestion($filter: ModelSubscriptionQuestionFilterInput) {
    onDeleteQuestion(filter: $filter) {
      id
      subject
      topic
      question
      options {
        A
        B
        C
        D
        __typename
      }
      explanation {
        A
        B
        C
        D
        __typename
      }
      correct_answer
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
      id
      firstName
      lastName
      Science {
        A
        B
        C
        __typename
      }
      Math {
        A
        B
        C
        __typename
      }
      Computer {
        A
        B
        C
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
      id
      firstName
      lastName
      Science {
        A
        B
        C
        __typename
      }
      Math {
        A
        B
        C
        __typename
      }
      Computer {
        A
        B
        C
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
      id
      firstName
      lastName
      Science {
        A
        B
        C
        __typename
      }
      Math {
        A
        B
        C
        __typename
      }
      Computer {
        A
        B
        C
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
