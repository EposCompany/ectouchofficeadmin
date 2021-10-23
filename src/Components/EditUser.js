import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ApiComms from "../Utils/ApiComms";
import { useHistory } from "react-router-dom";
import ResultPage from "./ResultPage";
import ProgressBar from "./ProgressBar";
import myUtils from "../Utils/Utility";
// import AlertDialog from "../Utils/AlertsBox";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  divStyle: {
    display: "flex",
    flexDirection: "row",
  },
}));

export default function EditUser() {
  const classes = useStyles();
  let [id, setId] = useState(0);
  let [fname, setFname] = useState("");
  let [sname, setSname] = useState("");
  let [telephone, setTelephone] = useState("");
  let [validationError, setValidationError] = useState("");
  let [result, setResult] = useState("");
  let [loading, setLoading] = useState(false);
  let history = useHistory();
  let [errId, setErrId] = useState(false);

  const txtFname_Change = (e) => {
    setFname(e.target.value);
  };

  const txtSname_Change = (e) => {
    setSname(e.target.value);
  };

  const txtTelephone_Change = (e) => {
    setTelephone(e.target.value);
  };

  const txtId_Change = (e) => {
    setId(e.target.value);
    setErrId(e.target.value > 10000 || e.target.value < 1);
  };

  async function btnSubmit_Click(e) {
    // api will run here and the result will be set
    if (id < 1 || id > 10000) {
      setValidationError("id is out of boundry");
    } else if (myUtils.ValidatePhoneNumber(telephone)) {
      setValidationError("telehone number is not valid.");
    } else {
      console.log("request made");
      setLoading(true);
      let res = await ApiComms.EditUser(
        id,
        fname === "" ? " " : fname,
        sname === "" ? " " : sname,
        telephone
      );
      setLoading(false);
      console.log(res);
      let myMessage = "Failed !!!!!";
      if (res !== null && res.resultcode === 0) {
        myMessage = "Successful ;)";
      }
      history.push({
        pathname: "/home",
        message: myMessage,
      });
      console.log(myMessage);
    }
    //setError("Email address is valid");
  }

  return (
    <React.Fragment>
      <Grid container spacing={5} justify="center">
        <Grid item xs={12}>
          {loading && <ProgressBar />}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            error={errId}
            required
            id="txtId"
            label="Customer Id"
            onChange={txtId_Change}
            type="number"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} />
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="txtFname"
            label="First name"
            onChange={txtFname_Change}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="txtSname"
            label="Surname"
            onChange={txtSname_Change}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="txtTelephone"
            label="Telephone"
            type="tel"
            onChange={txtTelephone_Change}
            type="number"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} />
        <Grid item xs={12}>
          <Typography color="error">{validationError}</Typography>
          {/* <AlertDialog message={validationError} /> */}
        </Grid>
        <Grid item xs={12} sm={6} />
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={btnSubmit_Click}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
