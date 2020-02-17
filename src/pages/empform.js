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
import Spinner from "../common/spinner";
import DraggableModal from "../common/draggableModal";
import ViewListIcon from '@material-ui/icons/ViewList';
import {
  CREATE_EMPLOYEE,
  CREATE_ADDRESS,
  CREATE_SKILL,
  UPDATE_EMPLOYEE,
  DELETE_ADDRESS,
  DELETE_SKILL,
  UPDATE_ADDRESS,
  UPDATE_SKILL
} from "../graphql/mutations";
import Header from "../common/header";
import MultiSelectTextField from "../common/multiSelectText";
import Grid from "@material-ui/core/Grid";
import { employeesPartitioning, isValid } from "../commonMethods";
import { empValidationFields } from "../validationFieldTypes";

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
      variables: { name: s.name, empId: s.empId },
      refetchQueries: [
        {
          query: GET_EMPLOYEES
        }
      ]
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

const save = async (state, createEmployeeMutate, history, setStateData) => {
  if (_.isEmpty(isValid(state.form, empValidationFields))) {
    await createEmp(
      state.form.firstName,
      state.form.lastName,
      createEmployeeMutate
    );
    history.push("/home");
  } else {
    const errors = isValid(state.form, empValidationFields);
    setStateData({ ...state, errors, isErrorModal: true });
  }
};

const handleFormChange = (name, value, setStateData, state) => {
  setStateData({ ...state, form: { ...state.form, [name]: value } });
};

const handleChange = (name, value, setStateData, state) => {
  setStateData({ ...state, [name]: value });
};

function Empform(props) {
  const {searchReq} = props;
  const history = useHistory();
  const [state, setStateData] = useState({
    skill: "",
    isErrorModal: false,
    errors: {},
    delAddressIds: [],
    delSkillIds: [],
    form: {
      firstName: "",
      lastName: "",
      address: [],
      skills: []
    }
  });
  const { data, loading } = useQuery(GET_EMPLOYEE_BY_ID, {
    variables: { id: props.match.params.empId, empId: props.match.params.empId }
  });
  const [createEmployeeMutate, { error }] = useMutation(CREATE_EMPLOYEE, {
    onCompleted: data =>
      createAddressAndSkill(
        data,
        createAddressMutate,
        createSkillMutate,
        state.form
      )
  });
  const [createAddressMutate] = useMutation(CREATE_ADDRESS);
  const [createSkillMutate] = useMutation(CREATE_SKILL);
  const [updateEmployeeMutate] = useMutation(UPDATE_EMPLOYEE);
  const [updateAddressMutate] = useMutation(UPDATE_ADDRESS);
  const [updateSkillMutate] = useMutation(UPDATE_SKILL);
  const [deleteAddressMutate] = useMutation(DELETE_ADDRESS);
  const [deleteSkillMutate] = useMutation(DELETE_SKILL);
  const classes = useStyles();

  const formSkillsChange = (name, value, skillId) => {
    if (skillId) {
      state.delSkillIds.push(skillId);
      state.form.skills = value;
      setStateData({ ...state });
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
    searchReq(false);
  }, [data]);

  const addresssStateChange = addresss => {
    setStateData({ ...state, form: { ...state.form, addresss } });
  };

  const collectDelId = id => {
    state.delAddressIds.push(id);
    setStateData({ ...state, delAddressIds: state.delAddressIds });
  };

  const Update = async () => {
    if (_.isEmpty(isValid(state.form, empValidationFields))) {
      if (props.match.params.empId && props.match.params.empId !== "0") {
        if (!_.isEmpty(state.delSkillIds)) {
          for (const s of state.delSkillIds) {
            const data = await deleteSkillMutate({
              variables: { id: s }
            });
          }
        }
        if (!_.isEmpty(state.delAddressIds)) {
          for (const a of state.delAddressIds) {
            const data = await deleteAddressMutate({
              variables: { id: a }
            });
          }
        }
        for (const a of state.form.addresss) {
          if (a.id) {
            console.log(a);
            await updateAddressMutate({
              variables: {
                id: a.id,
                line1: a.line1,
                line2: a.line2,
                state: a.state,
                city: a.city,
                zipcode: a.zipcode,
                empId: props.match.params.empId
              }
            });
          } else {
            await createAddressMutate({
              variables: {
                line1: a.line1,
                line2: a.line2,
                city: a.city,
                state: a.state,
                zipcode: a.zipcode,
                empId: props.match.params.empId
              }
            });
          }
        }
        for (const s of state.form.skills) {
          if (s.id) {
            await updateSkillMutate({
              variables: {
                id: s.id,
                name: s.name,
                empId: props.match.params.empId
              }
            });
          } else {
            await createSkillMutate({
              variables: {
                name: s.name,
                empId: props.match.params.empId
              }
            });
          }
        }
        await updateEmployeeMutate({
          variables: {
            id: props.match.params.empId,
            firstName: state.form.firstName,
            lastName: state.form.lastName
          },
          refetchQueries: [
            {
              query: GET_EMPLOYEES
            }
          ]
        });
        history.push("/home");
      }
    }
  };

  const errorModalClose = () => {
    setStateData({ ...state, errors: {}, isErrorModal: false });
  };
  
  const navEmpList = () => {
      history.push('/');
  }

  // searchReq(false);

  return (
    <>
      {loading && <Spinner />}
      {/* <Header label={"Employee Form"} /> */}
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
                      variant="filled"
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
                      variant="filled"
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
                  collectDelId={collectDelId}
                />
              </div>
            </form>
          </CardContent>
          <CardActions className="right">
            {props.match.params.empId !== "0" && props.match.params.empId ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => Update()}
              >
                Update
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  save(state, createEmployeeMutate, history, setStateData)
                }
              >
                Save
              </Button>
            )}
          </CardActions>
        </Card>
      </div>
      <DraggableModal
        isOpen={state.isErrorModal}
        errors={state.errors}
        close={errorModalClose}
      />
      <div className="addIconBtn" title={"Add new"} onClick={() => navEmpList(history)}>
        <div className="roundIcon"><ViewListIcon style={{color: 'white'}} /></div>
      </div>
    </>
  );
}

export default Empform;
