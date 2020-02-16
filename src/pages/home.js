import React, { useState } from "react";
import Header from "../common/header";
import TableViewWithAction from "../common/tableView";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import * as _ from "lodash";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { GET_EMPLOYEES, listSkills } from "../graphql/queries";
import {DELETE_ADDRESS, DELETE_SKILL, DELETE_EMPLOYEE} from '../graphql/mutations';
import { employeesPartitioning } from "../commonMethods";
import ConformationModal from '../common/conformationModal';

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

const tableHeader = () => {
  return [
    { label: "FirstName", key: "firstName" },
    { label: "LastName", key: "lastName" },
    { label: "Addresss", key: "trimAddress" },
    { label: "skills", key: "trimSkill" }
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

function Home() {
  const history = useHistory();
  const [state, setState] = useState({isOpen: false, empId:'', index: -1, deleteData:{} });
  const { data, loading, error } = useQuery(GET_EMPLOYEES);
  let modifyData = [];
  if (data) {
    modifyData = employeesPartitioning(
      [...data.listEmployees.items],
      [...data.listAddresss.items],
      [...data.listSkills.items]
    );
  }
  const [deleteEmployeeMutate] = useMutation(DELETE_EMPLOYEE);
  const [deleteAddressMutate] = useMutation(DELETE_ADDRESS);
  const [deleteSkillMutate] = useMutation(DELETE_SKILL);
  const editEmp = empId => {
    history.push(`/form/${empId}`);
  };

  const deleteSkills = async(skillIds) => {
    for (const s of skillIds) {
      const data = await deleteSkillMutate({
        variables: { id: s }
      });
    }
  };

  const deleteAddresss = async(addressIds) => {
    for (const a of addressIds) {
      const data = await deleteAddressMutate({
        variables: { id: a }
      });
    }
  };

  const deleteEmp = async() => {
    const skillIds = state.deleteData.skills.map(s => s.id);
    const addressIds = state.deleteData.addresss.map(a => a.id);
    await deleteAddresss(addressIds);
    await deleteSkills(skillIds);
    await deleteEmployeeMutate({
      variables: { id: state.empId },
      refetchQueries: [
        {
          query: GET_EMPLOYEES
        }
      ]
    });
    setState({isOpen: false, empId:'', index: -1, deleteData:{} });
  };

  const confirmationAgree = () => {
    deleteEmp();
  }

const openModal = (empId, deleteEmployeeMutate, index, deleteData) => {
  state.isOpen = true;
  state.deleteData = deleteData;
  state.index = index;
  state.empId = empId;
  setState({...state});
}

  const closeModal = () => {
    setState({isOpen: false, empId:'', index: -1, deleteData:{} });
  }

  return (
    <>
      <Header addNew={navEmpForm()} label={"EmployeeList"} />
      <div className="pl30 pr30 pt30">
        {!loading ? (
          <TableViewWithAction
            bodyData={tableBody(modifyData)}
            heading={tableHeader()}
            deleteMutate={deleteEmployeeMutate}
            edit={editEmp}
            isAction={true}
            del={openModal}
          />
        ) : (
          "Data not found"
        )}
      </div>
      <ConformationModal  title={"Conformation"} message={"Do you want delete this employee ?"} isOpen={state.isOpen} confirm={confirmationAgree} cancel={closeModal}/>
    </>
  );
}

export default Home;
