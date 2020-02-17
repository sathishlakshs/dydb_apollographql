import React, { useState, useEffect } from "react";
import Header from "../common/header";
import TableViewWithAction from "../common/tableView";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import * as _ from "lodash";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { GET_EMPLOYEES, listSkills } from "../graphql/queries";
import {
  DELETE_ADDRESS,
  DELETE_SKILL,
  DELETE_EMPLOYEE
} from "../graphql/mutations";
import { employeesPartitioning, getFilterData } from "../commonMethods";
import ConformationModal from "../common/conformationModal";
import Spinner from "../common/spinner";
import Icon from "@material-ui/core/Icon";
import AddIcon from "@material-ui/icons/Add";

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

const navEmpForm = history => {
  history.push("/form/0");
};

function Home(props) {
  const { searchReq, searchValue } = props;
  const history = useHistory();
  const [state, setState] = useState({
    isOpen: false,
    empId: "",
    index: -1,
    deleteData: {},
    previousSearchValue: ""
  });
  const { data, loading, error } = useQuery(GET_EMPLOYEES);
  let modifyData = [];
  if (data) {
    modifyData = employeesPartitioning(
      [...data.listEmployees.items],
      [...data.listAddresss.items],
      [...data.listSkills.items]
    );
    if (searchValue !== "") {
      modifyData = getFilterData(searchValue, [...modifyData]);
    }
  }
  const [deleteEmployeeMutate] = useMutation(DELETE_EMPLOYEE);
  const [deleteAddressMutate] = useMutation(DELETE_ADDRESS);
  const [deleteSkillMutate] = useMutation(DELETE_SKILL);

  // if (state.previousSearchValue !== searchValue) {
  //   console.log(state.previousSearchValue, searchValue);
  //   setState({...state, previousSearchValue: searchValue});
  //   const res = useQuery(GET_EMPLOYEES)
  // }

  useEffect(() => {
    searchReq(true);
  }, []);

  const editEmp = empId => {
    history.push(`/form/${empId}`);
  };

  const deleteSkills = async skillIds => {
    for (const s of skillIds) {
      const data = await deleteSkillMutate({
        variables: { id: s }
      });
    }
  };

  const deleteAddresss = async addressIds => {
    for (const a of addressIds) {
      const data = await deleteAddressMutate({
        variables: { id: a }
      });
    }
  };

  const deleteEmp = async () => {
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
    setState({ isOpen: false, empId: "", index: -1, deleteData: {} });
  };

  const confirmationAgree = () => {
    deleteEmp();
  };

  const openModal = (empId, deleteEmployeeMutate, index, deleteData) => {
    state.isOpen = true;
    state.deleteData = deleteData;
    state.index = index;
    state.empId = empId;
    setState({ ...state });
  };

  const closeModal = () => {
    setState({ isOpen: false, empId: "", index: -1, deleteData: {} });
  };

  const specifyEmpDetails = empId => {
    history.push(`/employee/${empId}`);
  };

  return (
    <>
      {loading && <Spinner />}
      {/* <Header addNew={navEmpForm()} label={"EmployeeList"} /> */}
      <div className="pl30 pr30 pt30">
        {!_.isEmpty(modifyData) ? (
          <TableViewWithAction
            bodyData={tableBody(modifyData)}
            heading={tableHeader()}
            deleteMutate={deleteEmployeeMutate}
            edit={editEmp}
            isAction={true}
            del={openModal}
            routerLink={specifyEmpDetails}
          />
        ) : (
          <div className="dataNotFound">Data not found</div>
        )}
      </div>
      <div
        className="addIconBtn"
        title={"Add new"}
        onClick={() => navEmpForm(history)}
      >
        <div className="roundIcon">
          <AddIcon style={{ color: "white" }} />
        </div>
      </div>
      <ConformationModal
        title={"Conformation"}
        message={"Do you want delete this employee ?"}
        isOpen={state.isOpen}
        confirm={confirmationAgree}
        cancel={closeModal}
      />
    </>
  );
}

export default Home;
