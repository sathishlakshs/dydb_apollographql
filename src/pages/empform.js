import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { useMutation, useQuery } from "@apollo/react-hooks";
import Button from "@material-ui/core/Button";
import gql from "graphql-tag";
import { useHistory } from "react-router-dom";
import { GET_EMPLOYEES, GET_EMPLOYEE_BY_ID } from "../graphql/queries";
import _ from "lodash";
import AddresssForm from "../common/addressForm";
import {
  CREATE_EMPLOYEE,
  CREATE_ADDRESS,
  CREATE_SKILL,
  UPDATE_EMPLOYEE
} from "../graphql/mutations";
import Header from "../common/header";
import MultiSelectTextField from "../common/multiSelectText";
import Grid from "@material-ui/core/Grid";
import { employeesPartitioning } from "../commonMethods";

const fakeData = {
  firstName: "sathish",
  lastName: "kumar",
  addresss: [
    {
      line1: "9th cross",
      line2: "nethaji street",
      zipcode: "600042",
      city: "1",
      state: "1"
    }
  ],
  skills: [{ name: "reactjs" }]
};

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%"
    }
  },
  minWidth: 275,
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
}));

const createEmp = async (firstName, lastName, createEmployeeMutate) => {
  const { data } = await createEmployeeMutate({
    variables: { firstName, lastName }
    // refetchQueries: [
    //   {
    //     query: GET_EMPLOYEES
    //   }
    // ]
  });
  return data.createEmployee.id;
};

const createAddresss = async (addresss, createAddressMutate) => {
  for (const a of addresss) {
    const data = await createAddressMutate({
      variables: {
        line1: a.line1,
        line2: a.line2,
        city: a.city,
        state: a.state,
        zipcode: a.zipcode,
        empId: a.empId
      }
    });
  }
};

const createSkills = async (skills, createSkillMutate) => {
  for (const s of skills) {
    const data = await createSkillMutate({
      variables: { name: s.name, empId: s.empId }
    });
  }
};

const createAddressAndSkill = (
  data,
  createAddressMutate,
  createSkillMutate,
  form
) => {
  if (data.createEmployee.id) {
    form.addresss.map(a => {
      a["empId"] = data.createEmployee.id;
    });
    form.skills.map(s => {
      s["empId"] = data.createEmployee.id;
    });
    createAddresss(form.addresss, createAddressMutate);
    createSkills(form.skills, createSkillMutate);
  }
};

const save = async (
  form,
  createEmployeeMutate,
  history,
  empId,
  updateEmployeeMutate
) => {
  if (form.firstName && form.lastName) {
    if (empId && empId !== "0") {
      updateEmployeeMutate({
        variables: {
          id: empId,
          firstName: form.firstName,
          lastName: form.lastName
        },
        refetchQueries: [
          {
            query: GET_EMPLOYEES
          }
        ]
      });
    } else {
      await createEmp(form.firstName, form.lastName, createEmployeeMutate);
    }
    history.push("/home");
  }
};

const handleFormChange = (name, value, setStateData, state) => {
  setStateData({ ...state, form: { ...state.form, [name]: value } });
};

const handleChange = (name, value, setStateData, state) => {
  setStateData({ ...state, [name]: value });
};

const btnTxtChange = empId => {
  if (empId !== "0" && empId) {
    return "Update";
  }
  return "Save";
};

function Empform(props) {
  const history = useHistory();
  const btnText = btnTxtChange(props.match.params.empId);
  const [state, setStateData] = useState({
    skill: "",
    delAddressIds: [],
    delSkillIds: [],
    form: {
      firstName: "",
      lastName: "",
      address: [],
      skills: []
    }
  });
  const { data } = useQuery(GET_EMPLOYEE_BY_ID, {
    variables: { id: props.match.params.empId, empId: props.match.params.empId }
  });
  const [createEmployeeMutate, { loading, error }] = useMutation(
    CREATE_EMPLOYEE,
    {
      onCompleted: data =>
        createAddressAndSkill(
          data,
          createAddressMutate,
          createSkillMutate,
          state.form
        )
    }
  );
  const [createAddressMutate] = useMutation(CREATE_ADDRESS);
  const [createSkillMutate] = useMutation(CREATE_SKILL);
  const [updateEmployeeMutate] = useMutation(UPDATE_EMPLOYEE);
  const classes = useStyles();
  const formSkillsChange = (name, value, skillId) => {
    if(skillId) {
      state.delSkillIds.push(skillId);
      state.form.skills = value;
      setStateData({...state});
    } else {
      setStateData({ ...state, form: { ...state.form, [name]: value } });
    }
  };
  useEffect(() => {
    if (data) {
      if (data.getEmployee) {
        setStateData({
          ...state,
          form: employeesPartitioning(
            [{ ...data.getEmployee }],
            [...data.listAddresss.items],
            [...data.listSkills.items]
          )[0]
        });
      }
    }
  }, [data]);
  const addresssStateChange = addresss => {
    setStateData({ ...state, form: { ...state.form, addresss } });
  };
  const collectDelId = (id) => {
    state.delAddressIds.push(id);
    setStateData({ ...state, delAddressIds:  state.delAddressIds});
  }
  console.log(state);

  return (
    <>
      <Header label={"Employee Form"} />
      <div className="ml9rem mr9rem mt40">
        <Card className={classes.root}>
          <CardContent>
            <form className={classes.root} noValidate autoComplete="off">
              <div>
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                    <TextField
                      required
                      id="standard-required"
                      label="FirstName"
                      onChange={e =>
                        handleFormChange(
                          "firstName",
                          e.target.value,
                          setStateData,
                          state
                        )
                      }
                      value={state.form.firstName}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      required
                      id="standard-required"
                      label="LastName"
                      onChange={e =>
                        handleFormChange(
                          "lastName",
                          e.target.value,
                          setStateData,
                          state
                        )
                      }
                      value={state.form.lastName}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <MultiSelectTextField
                      fieldKey={"skills"}
                      ancestorStateChange={formSkillsChange}
                      state={state}
                      chips={state.form.skills}
                    />
                  </Grid>
                </Grid>
              </div>
              <div className="mt30">
                  <AddresssForm
                    ancestorSetState={addresssStateChange}
                    addresss={state.form.addresss ? state.form.addresss : []}
                    collectDelId = {collectDelId}
                  />
              </div>
            </form>
          </CardContent>
          <CardActions className="right">
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                save(
                  state.form,
                  createEmployeeMutate,
                  history,
                  props.match.params.empId,
                  updateEmployeeMutate,
                  createAddressMutate,
                  createSkillMutate
                )
              }
            >
              {btnText}
            </Button>
          </CardActions>
        </Card>
      </div>
    </>
  );
}

export default Empform;
