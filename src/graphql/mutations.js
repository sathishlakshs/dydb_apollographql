import gql from "graphql-tag";
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const CREATE_EMPLOYEE = gql`
  mutation createEmployee($firstName: String!, $lastName: String!) {
    createEmployee(input: { firstName: $firstName, lastName: $lastName }) {
      id
      firstName
      lastName
    }
  }
`;

export const CREATE_ADDRESS = gql`
mutation createAddress($line1: String!, $line2: String!, $city: String!, $state: String!, $zipcode: String!, $empId: String! ) {
  createAddress(input: {line1: $line1, line2: $line2, city: $city, state: $state, zipcode: $zipcode, empId: $empId  }) {
    id
  }
}
`;

export const CREATE_SKILL = gql`
mutation createSkill($name: String!, $empId: String! ) {
  createSkill(input: {name: $name, empId: $empId  }) {
    id
  }
}
`;

export const UPDATE_EMPLOYEE = gql`
  mutation updateEmployee($id: ID!, $firstName: String!, $lastName: String!) {
    updateEmployee(
      input: { id: $id, firstName: $firstName, lastName: $lastName }
    ) {
      firstName
      lastName
    }
  }
`;


export const createEmployee = /* GraphQL */ `
  mutation CreateEmployee(
    $input: CreateEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    createEmployee(input: $input, condition: $condition) {
      id
      firstName
      lastName
      address {
        id
        line1
        line2
        city
        state
        zipcode
        empId
      }
      skills {
        id
        name
        empId
      }
    }
  }
`;
export const updateEmployee = /* GraphQL */ `
  mutation UpdateEmployee(
    $input: UpdateEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    updateEmployee(input: $input, condition: $condition) {
      id
      firstName
      lastName
      address {
        id
        line1
        line2
        city
        state
        zipcode
        empId
      }
      skills {
        id
        name
        empId
      }
    }
  }
`;
export const deleteEmployee = /* GraphQL */ `
  mutation DeleteEmployee(
    $input: DeleteEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    deleteEmployee(input: $input, condition: $condition) {
      id
      firstName
      lastName
      address {
        id
        line1
        line2
        city
        state
        zipcode
        empId
      }
      skills {
        id
        name
        empId
      }
    }
  }
`;
export const createAddress = /* GraphQL */ `
  mutation CreateAddress(
    $input: CreateAddressInput!
    $condition: ModelAddressConditionInput
  ) {
    createAddress(input: $input, condition: $condition) {
      id
      line1
      line2
      city
      state
      zipcode
      empId
    }
  }
`;
export const updateAddress = /* GraphQL */ `
  mutation UpdateAddress(
    $input: UpdateAddressInput!
    $condition: ModelAddressConditionInput
  ) {
    updateAddress(input: $input, condition: $condition) {
      id
      line1
      line2
      city
      state
      zipcode
      empId
    }
  }
`;
export const deleteAddress = /* GraphQL */ `
  mutation DeleteAddress(
    $input: DeleteAddressInput!
    $condition: ModelAddressConditionInput
  ) {
    deleteAddress(input: $input, condition: $condition) {
      id
      line1
      line2
      city
      state
      zipcode
      empId
    }
  }
`;
export const createSkill = /* GraphQL */ `
  mutation CreateSkill(
    $input: CreateSkillInput!
    $condition: ModelSkillConditionInput
  ) {
    createSkill(input: $input, condition: $condition) {
      id
      name
      empId
    }
  }
`;
export const updateSkill = /* GraphQL */ `
  mutation UpdateSkill(
    $input: UpdateSkillInput!
    $condition: ModelSkillConditionInput
  ) {
    updateSkill(input: $input, condition: $condition) {
      id
      name
    }
  }
`;
export const deleteSkill = /* GraphQL */ `
  mutation DeleteSkill(
    $input: DeleteSkillInput!
    $condition: ModelSkillConditionInput
  ) {
    deleteSkill(input: $input, condition: $condition) {
      id
      name
      empId
    }
  }
`;
