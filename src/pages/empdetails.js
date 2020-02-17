import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { GET_EMPLOYEES, GET_EMPLOYEE_BY_ID } from "../graphql/queries";
import _ from "lodash";
import Spinner from "../common/spinner";
import ViewListIcon from '@material-ui/icons/ViewList';

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

function Empdetails(props) {
  const history = useHistory();
  const { data, loading } = useQuery(GET_EMPLOYEE_BY_ID, {
    variables: { id: props.match.params.empId, empId: props.match.params.empId }
  });
  console.log(data);

  const classes = useStyles();
  const navEmpList = () => {
      history.push('/list');
  }

  return (
    <>
      {loading && <Spinner />}
      {/* <Header label={"Employee Form"} /> */}
      {data && data.getEmployee && (
        <div className="ml9rem mr9rem mt40">
          <Card className={classes.root}>
            <CardHeader title="Employee Details">
              <span className="right">edit</span>
            </CardHeader>
            <CardContent>
              <table className="mb20">
                <tr>
                  <td className="leftLabel">First Name</td>
                  <td >:</td>
                  <td>{data.getEmployee.firstName}</td>
                </tr>
                <tr>
                  <td className="leftLabel">Last Name</td>
                  <td>:</td>
                  <td>{data.getEmployee.lastName}</td>
                </tr>
                <tr>
                <td className="leftLabel">Skills</td>
                  <td>:</td>
                  <td>
                      {
                      data.listSkills.items.map((s, index) => index === data.listSkills.items.length-1? s.name : s.name + ', ')
                      }
                      </td>
                </tr>
              </table>
              <Card className={classes.root}>
                <CardHeader title="Addresss">
                  <span className="right">edit</span>
                </CardHeader>
                <CardContent>
                  {data.listAddresss.items.map((a, index) => (
                    <div key={index} className="mb20">
                      <table>
                        <tr>
                          <td className="leftLabel">Line 1</td>
                          <td>:</td>
                          <td>{a.line1}</td>
                        </tr>
                        <tr>
                          <td className="leftLabel">Line 2</td>
                          <td>:</td>
                          <td>{a.line2}</td>
                        </tr>
                        <tr>
                          <td className="leftLabel">City</td>
                          <td>:</td>
                          <td>{a.city}</td>
                        </tr>
                        <tr>
                          <td className="leftLabel">State</td>
                          <td>:</td>
                          <td>{a.state}</td>
                        </tr>
                        <tr>
                          <td className="leftLabel">Zipcode</td>
                          <td>:</td>
                          <td>{a.zipcode}</td>
                        </tr>
                      </table>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </div>
      )}
      <div className="addIconBtn" title={"Add new"} onClick={() => navEmpList(history)}>
        <div className="roundIcon"><ViewListIcon style={{color: 'white'}} /></div>
      </div>
    </>
  );
}

export default Empdetails;
