import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

function createData(firstName, lastName) {
  return { firstName, lastName };
}

const rows = (data, heading) => {
  return data.map(item =>
    createData(item[heading[0].key], item[heading[1].key])
  );
};

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

export default function TableViewWithAction(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            {props.heading.map((item, index) => (
              <StyledTableCell key={index}>{item.label}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows(props.bodyData, props.heading).map((row, index) => (
            <StyledTableRow key={index}>
              {props.heading.map((item, index) => 
                <StyledTableCell component="th" scope="row">
                  {row[props.heading[index].key]}
                </StyledTableCell>
              )}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
