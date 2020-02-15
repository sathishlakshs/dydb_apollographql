import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation, useQuery } from "@apollo/react-hooks";
import Button from "@material-ui/core/Button";
import gql from "graphql-tag";
import { useHistory } from "react-router-dom";
import { GET_EMPLOYEES } from "./home";
import _ from "lodash";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));

export const CREATE_EMPLOYEE = gql`
  mutation createEmployee($firstName: String!, $lastName: String!) {
    createEmployee(input: { firstName: $firstName, lastName: $lastName }) {
      id
      firstName
      lastName
    }
  }
`;

export const GET_EMPLOYEE = gql`
  query empById($id: ID!) {
    getEmployee(id: $id) {
      id
      firstName
      lastName
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

const handleChange = (name, value, setForm, form) => {
  setForm({ ...form, [name]: value });
};

const save = (
  form,
  createEmployeeMutate,
  history,
  empId,
  updateEmployeeMutate
) => {
  if (form.firstName && form.lastName) {
    if (empId && empId !== "0") {
      updateEmployeeMutate({
        variables: {id: empId, firstName: form.firstName, lastName: form.lastName },
        refetchQueries: [
          {
            query: GET_EMPLOYEES
          }
        ]
      });
    } else {
      createEmployeeMutate({
        variables: { firstName: form.firstName, lastName: form.lastName },
        refetchQueries: [
          {
            query: GET_EMPLOYEES
          }
        ]
      });
    }
    history.push("/home");
  }
};

const btnTxtChange = (empId) => {
  if(empId !== "0" && empId) {
    return "Update";
  } 
  return "Save";
}

function Empform(props) {
  const history = useHistory();
  const btnText = btnTxtChange(props.match.params.empId);
  const [form, setForm] = useState({ firstName: "", lastName: "", address: [], skills: [] });
  const { data } = useQuery(
    GET_EMPLOYEE,
    {
      variables: { id: props.match.params.empId }
    }
  );
  const [createEmployeeMutate, { loading, error }] = useMutation(CREATE_EMPLOYEE);
  const [updateEmployeeMutate] = useMutation(UPDATE_EMPLOYEE);
  const classes = useStyles();
  useEffect(() => {
    if (data) {
      if (data.getEmployee) {
        setForm(data.getEmployee);
      }
    }
  }, [data]);
  return (
    <>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField
            required
            id="standard-required"
            label="FirstName"
            onChange={e =>
              handleChange("firstName", e.target.value, setForm, form)
            }
            value={form.firstName}
          />
          <TextField
            required
            id="standard-required"
            label="LastName"
            onChange={e =>
              handleChange("lastName", e.target.value, setForm, form)
            }
            value={form.lastName}
          />
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              save(
                form,
                createEmployeeMutate,
                history,
                props.match.params.empId,
                updateEmployeeMutate
              )
            }
          >
            {btnText}
          </Button>
        </div>
      </form>
    </>
  );
}

export default Empform;
