import gql from "graphql-tag";
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const GET_EMPLOYEE_BY_ID = gql`
  query empById($id: ID!, $empId: String) {
    getEmployee(id: $id) {
      id
      firstName
      lastName
    }
    listAddresss(filter: {
      empId:{contains: $empId}
    }) {
      items {
        id
        line1
        line2
        city
        state
        zipcode
        empId
      }
    }
    listSkills(filter: {
      empId:{contains: $empId}
    }) {
      items {
        id
        name
        empId
      }
    }
  }
`;

export const GET_EMPLOYEES = gql`
  query {
    listEmployees {
      items {
        id
        firstName
        lastName
      }
    }
    listAddresss {
      items {
        id
        line1
        line2
        zipcode
        state
        city
        empId
      }
    }
    listSkills {
      items {
        id
        name
        empId
      }
    }
  }
`;

export const getEmployee = /* GraphQL */ `
  query GetEmployee($id: ID!) {
    getEmployee(id: $id) {
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
export const listEmployees = /* GraphQL */ `
  query ListEmployees(
    $filter: ModelEmployeeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmployees(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getAddress = /* GraphQL */ `
  query GetAddress($id: ID!) {
    getAddress(id: $id) {
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
export const listAddresss = /* GraphQL */ `
  query ListAddresss(
    $filter: ModelAddressFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAddresss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        line1
        line2
        city
        state
        zipcode
        empId
      }
      nextToken
    }
  }
`;
export const getSkill = /* GraphQL */ `
  query GetSkill($id: ID!) {
    getSkill(id: $id) {
      id
      name
      empId
    }
  }
`;
export const listSkills = /* GraphQL */ `
  query ListSkills(
    $filter: ModelSkillFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSkills(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        empId
      }
      nextToken
    }
  }
`;
