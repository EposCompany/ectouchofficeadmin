import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ApiComms from "../Utils/ApiComms";
import StoreDetails from "./StoreDetails";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function UserList() {
  const classes = useStyles();
  let [rows, setRows] = useState([]);
  let [detailsopen, setDetailsOpen] = useState(false);
  let [loading, setLoading] = useState(false);

  async function fetchUserList() {
    setLoading(true);
    let res = await ApiComms.UserList();
    setLoading(false);
    // console.log(res);

    if (res !== null && res.resultcode === 0) {
      setRows(res.result);
    } else {
      setRows([]);
    }
  }

  useEffect(() => {
    fetchUserList();
  }, []);

  function tblRow_DoubleClick(key) {
    console.log(key);
    //StoreD({ message: "har che mikhahad dele tanget begoo" });
    setDetailsOpen(true);
  }

  function OnStoreDetailsClose() {
    setDetailsOpen(false);
  }

  return (
    <>
      {detailsopen && <StoreDetails raiseOnCloseEvent={OnStoreDetailsClose} />}

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>User id</StyledTableCell>
              <StyledTableCell>User First name</StyledTableCell>
              <StyledTableCell>User Surname</StyledTableCell>
              <StyledTableCell>User Email</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow
                onDoubleClick={() => tblRow_DoubleClick(row.id)}
                key={row.id}
              >
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell>{row.fname}</StyledTableCell>
                <StyledTableCell>{row.sname}</StyledTableCell>
                <StyledTableCell>{row.email}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
