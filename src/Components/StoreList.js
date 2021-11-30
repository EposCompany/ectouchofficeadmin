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

export default function StoreList() {
  const classes = useStyles();
  let [rows, setRows] = useState([]);
  let [detailsopen, setDetailsOpen] = useState(false);
  let [loading, setLoading] = useState(false);

  async function fetchStoreList() {
    setLoading(true);
    let res = await ApiComms.StoreList();
    setLoading(false);
    if (res !== null) {
      setRows(res);
    }
  }

  async function fetchStoreDetails() {
    setLoading(true);
    let res = await ApiComms.StoreList();
    setLoading(false);
    if (res !== null) {
      setRows(res);
    } else {
      setRows([]);
    }
  }

  useEffect(() => {
    fetchStoreList();
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
              <StyledTableCell>Store id</StyledTableCell>
              <StyledTableCell>Store name</StyledTableCell>
              <StyledTableCell>Expiry date</StyledTableCell>
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
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell>{row.expiry}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
