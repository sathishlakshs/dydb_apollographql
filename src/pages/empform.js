import React, { useState } from "react";
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

const handleChange = (name, value, setForm, form) => {
  setForm({ ...form, [name]: value });
};

const save = (form, createMutate, history) => {
  if (form.firstName && form.lastName) {
    createMutate({
      variables: { firstName: form.firstName, lastName: form.lastName },
      refetchQueries: [
        {
          query: GET_EMPLOYEES
        }
      ]
    });
    history.push("/home");
  } else {
  }
};

function Empform(props) {
  const history = useHistory();
  let initState = { firstName: "", lastName: "", address: [], skills: [] };
  let actualValue = new Object(null);
  let btnText = "Save";
  const { data } = useQuery(GET_EMPLOYEE, {
    variables: { id: props.match.params.empId }
  });
  const [createMutate, { loading, error }] = useMutation(CREATE_EMPLOYEE);
  const [form, setForm] = useState(initState);
  if (data) {
    if (data.getEmployee) {
      btnText = "Update";
      actualValue = { ...data.getEmployee };
    }
  }
  const classes = useStyles();
  console.log(form);
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
            value={data ? actualValue.firstName : ""}
          />
          <TextField
            required
            id="standard-required"
            label="LastName"
            onChange={e =>
              handleChange("lastName", e.target.value, setForm, form)
            }
            value={data ? actualValue.lastName : ""}
          />
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => save(form, createMutate, history)}
          >
            {btnText}
          </Button>
        </div>
      </form>
    </>
  );
}

export default Empform;
