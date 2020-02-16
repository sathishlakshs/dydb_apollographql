import React from "react";
import Header from "../common/header";
import TableViewWithAction from "../common/tableView";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import * as _ from "lodash";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { GET_EMPLOYEES, listSkills } from '../graphql/queries';
import {employeesPartitioning} from '../commonMethods';

// export const GET_EMPLOYEES = gql`
//   query {
//     listEmployees {
//       items {
//         id
//         firstName
//         lastName
//       }
//     }
//   }
// `;

export const DELETE_EMPLOYEE = gql`
mutation deleteEmployee($id: ID!) {
  deleteEmployee(input: { id: $id}) {
    id
  }
}
`;

const tableHeader = () => {
  return [
    { label: "FirstName", key: "firstName" },
    { label: "LastName", key: "lastName" },
    { label: "Addresss", key: "trimAddress" },
    {label: "skills", key: "trimSkill"}
  ];
};

const tableBody = emps => {
  return emps;
};

const navEmpForm = () => {
  return (
    <Link to="/form/0" className="linkBtn">
      Add New
    </Link>
  );
};

const deleteEmp = (empId, deleteEmployeeMutate) => {
  deleteEmployeeMutate({
    variables: { id: empId },
    refetchQueries: [
      {
        query: GET_EMPLOYEES
      }
    ]
  });
};

function Home() {
  const history = useHistory();
  const { data, loading, error } = useQuery(GET_EMPLOYEES);
  let modifyData = [];
  if (data) {
    // modifyData = employeesPartitioning([...data.listEmployees.items], [...data.listAddresss.items], [...data.listSkills.items]);
  }
  const [deleteEmployeeMutate] = useMutation(DELETE_EMPLOYEE);
  const editEmp = empId => {
    history.push(`/form/${empId}`);
  };
  return (
    <>
      <Header addNew={navEmpForm()} label={"EmployeeList"}/>
      {/* <div className="pl30 pr30 pt30">
        {!loading ? (
          <TableViewWithAction
            bodyData={tableBody(modifyData)}
            heading={tableHeader()}
            deleteMutate={deleteEmployeeMutate}
            edit={editEmp}
            isAction={true}
            del={deleteEmp}
          />
        ) : (
          "Data not found"
        )}
      </div> */}
    </>
  );
}

export default Home;
