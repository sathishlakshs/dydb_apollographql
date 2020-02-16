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

// function createData(data, keys) {
//   data.filter(d => {
//     const temp = {}
//     keys.filter(k => { temp[k] = d[key]; return ;});
//   });
//   return data.map(d => d)
//   return { firstName, lastName, address, skill, id};
// }

// const rows = (data, heading) => {
//   return  createData(data, [...heading.map(item => item.key, 'id')]);
//   //  createData(item[heading[0].key], item[heading[1].key], item[heading[2].key], item[heading[3].key], item['id'])
//   // );
// };

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
  // console.log(rows(bodyData, heading));
  console.log(bodyData);
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
          {bodyData.map((bData, index) => (
            <StyledTableRow key={index}>
              {props.heading.map((h, index) => (
                <StyledTableCell component="th" scope="row" key={index}>
                  {bData[h.key]}
                </StyledTableCell>
              ))}
              {isAction ? (
                <>
                  <StyledTableCell component="th" scope="row">
                    <span>
                      <IconButton
                        aria-label="delete"
                        className={classes.margin}
                        onClick={() => edit(bData.id, index)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </span>
                    <span style={{ marginLeft: "25px" }}>
                      <IconButton
                        aria-label="delete"
                        className={classes.margin}
                        onClick={() => del(bData.id, deleteMutate, index)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </span>
                  </StyledTableCell>
                </>
              ) : null}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
