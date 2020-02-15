import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Box from "@material-ui/core/Box";

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

function createData(firstName, lastName, id) {
  return { firstName, lastName, id};
}

const rows = (data, heading) => {
  return data.map(item =>
    createData(item[heading[0].key], item[heading[1].key], item['id'])
  );
};

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 700
  },
  margin: {
    margin: theme.spacing(-1.8)
  }
}));

export default function TableViewWithAction(props) {
  const classes = useStyles();
  const { isAction, heading, bodyData, edit, del, deleteMutate } = props;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            {heading.map((item, index) => (
              <StyledTableCell key={index}>{item.label}</StyledTableCell>
            ))}
            {isAction ? (
              <>
                <StyledTableCell key={heading.length}>Actions</StyledTableCell>
              </>
            ) : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows(bodyData, heading).map((row, index) => (
            <StyledTableRow key={index}>
              {props.heading.map((item, index) => (
                <StyledTableCell component="th" scope="row" key={index}>
                  {row[props.heading[index].key]}
                </StyledTableCell>
              ))}
              {
              isAction ? (
                <>
                  <StyledTableCell component="th" scope="row">
                    <span>
                      <IconButton
                        aria-label="delete"
                        className={classes.margin}
                        onClick={() => edit(row.id)}
                      >
                        <EditIcon fontSize="small"  />
                      </IconButton>
                    </span>
                    <span style={{ marginLeft: "25px" }}>
                      <IconButton
                        aria-label="delete"
                        className={classes.margin}
                        onClick={() => del(row.id, deleteMutate)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </span>
                  </StyledTableCell>
                </>
              ) : null
              }
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
