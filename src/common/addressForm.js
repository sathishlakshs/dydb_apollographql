import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TableViewWithAction from "./tableView";
import {addressValidationFields} from '../validationFieldTypes';
import {isValid} from '../commonMethods';
import * as _ from "lodash";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const cities = [
  { id: "1", name: "Chennai", stateId: "1" },
  { id: "2", name: "Trichy", stateId: "1" },
  { id: "3", name: "Karaikudi", stateId: "1" },
  { id: "4", name: "Visagapattinam", stateId: "2" },
  { id: "5", name: "Vijayavada", stateId: "2" }
];
const states = [
  { id: "1", name: "TamilNadu" },
  { id: "2", name: "Andra Pradesh" }
];

const tableHeader = () => {
  return [
    { label: "Line 1", key: "line1" },
    { label: "Line2", key: "line2" },
    { label: "City", key: "cityName" },
    { label: "State", key: "stateName" },
    { label: "Zipcode", key: "zipcode" }
  ];
};
const handleStateChange = (value, setState, state) => {
  state.cities = cities.filter(c => c.stateId === value);
  state.form.state = value;
  setState({ ...state });
};

const add = (setState, state, addresss, ancestorSetState) => {
  if (_.isEmpty(isValid(state.form, addressValidationFields))) {
    state.form["cityName"] = cities.find(c => c.id === state.form.city).name;
    state.form["stateName"] = states.find(s => s.id === state.form.state).name;
    if (state.editIndex < 0) {
      addresss.push({ ...state.form });
    } else {
      addresss[state.editIndex] = { ...state.form };
    }
    ancestorSetState(addresss);
    setState({
      cities: [],
      editIndex: -1,
      form: { line1: "", line2: "", zipcode: "", city: "", state: "" }
    });
  }
};

const locationNameCon = data => {
  data.map(d => {
    d["stateName"] = states.find(s => s.id === d.state).name;
    d["cityName"] = cities.find(c => c.id === d.city).name;
  });
};

function AddresssForm(props) {
  const [state, setData] = useState({
    form: { line1: "", line2: "", zipcode: "", city: "", state: "" },
    cities: [],
    editIndex: -1
  });
  const { addresss, ancestorSetState, collectDelId } = props;
  if (addresss) {
    locationNameCon(addresss);
  }
  const classes = useStyles();
  const edit = (dataId, index) => {
    state.cities = cities.filter(c => c.stateId === addresss[index].state);
    state.form = addresss[index];
    state.editIndex = index;
    setData({ ...state });
  };

  const del = (id, deleteMut, index) => {
    if (id) {
      collectDelId(id);
    }
    addresss.splice(index, 1);
  };

  return (
    <>
      <Card className={classes.root}>
        <CardHeader title="Address" />
        <CardContent>
          <form className={classes.root} noValidate autoComplete="off">
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <TextField
                  required
                  label="Line1"
                  style={{ width: "95%" }}
                  onChange={e =>
                    setData({
                      ...state,
                      form: { ...state.form, line1: e.target.value }
                    })
                  }
                  value={state.form.line1}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  label="Line2"
                  style={{ width: "95%" }}
                  onChange={e =>
                    setData({
                      ...state,
                      form: { ...state.form, line2: e.target.value }
                    })
                  }
                  value={state.form.line2}
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl
                  className={classes.formControl}
                  style={{ width: "93%" }}
                >
                  <InputLabel id="demo-simple-select-label">State</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state.form.state}
                    onChange={e =>
                      handleStateChange(e.target.value, setData, state)
                    }
                  >
                    {states.map(s => (
                      <MenuItem value={s.id} key={s.id}>
                        {s.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl
                  className={classes.formControl}
                  style={{ width: "100%" }}
                >
                  <InputLabel id="demo-simple-select-label">City</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state.form.city}
                    onChange={e =>
                      setData({
                        ...state,
                        form: { ...state.form, city: e.target.value }
                      })
                    }
                  >
                    {state.cities.map(c => (
                      <MenuItem value={c.id} key={c.id}>
                        {c.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  label="Zipcode"
                  style={{ width: "95%" }}
                  value={state.form.zipcode}
                  onChange={e =>
                    setData({
                      ...state,
                      form: { ...state.form, zipcode: e.target.value }
                    })
                  }
                />
              </Grid>
            </Grid>
          </form>
        </CardContent>
        <CardActions className="right" style={{ marginRight: "22px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => add(setData, state, addresss, ancestorSetState)}
          >
            {"Add"}
          </Button>
        </CardActions>
        <CardContent>
          {addresss && !_.isEmpty(addresss) && (
            <TableViewWithAction
              bodyData={addresss}
              heading={tableHeader()}
              edit={edit}
              isAction={true}
              del={del}
            />
          )}
        </CardContent>
      </Card>
    </>
  );
}

export default AddresssForm;
