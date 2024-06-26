/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createQuestion = /* GraphQL */ `
  mutation CreateQuestion(
    $input: CreateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    createQuestion(input: $input, condition: $condition) {
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
export const updateQuestion = /* GraphQL */ `
  mutation UpdateQuestion(
    $input: UpdateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    updateQuestion(input: $input, condition: $condition) {
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
export const deleteQuestion = /* GraphQL */ `
  mutation DeleteQuestion(
    $input: DeleteQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    deleteQuestion(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
