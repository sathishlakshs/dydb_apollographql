import React from "react";
import Header from "../common/header";
import TableViewWithAction from "../common/tableView";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import * as _ from "lodash";
import {  Link  } from "react-router-dom";


const GET_EMPLOYEES = gql`
  query {
    listEmployees {
      items {
        id
        firstName
        lastName
      }
    }
  }
`;
const tableHeader = () => {
  return [
    { label: "FirstName", key: "firstName" },
    { label: "LastName", key: "lastName" }
  ];
};

const tableBody = emps => {
  return emps;
};

const navEmpForm = () => {
    return <Link to="/form" className="linkBtn">Add New</Link>
}

function Home() {
  const { data, loading, error } = useQuery(GET_EMPLOYEES);
  return (
    <>
      <Header addNew = {navEmpForm()}/>
      <div className="pl30 pr30 pt30">
        {!loading ? (
          <TableViewWithAction
            bodyData={tableBody(data.listEmployees.items)}
            heading={tableHeader()}
          />
        ) : (
          "Data not found"
        )}
      </div>
    </>
  );
}

export default Home;
