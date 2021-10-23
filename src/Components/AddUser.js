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

export default function AddUser() {
  const classes = useStyles();
  let [fname, setFname] = useState("");
  let [sname, setSname] = useState("");
  let [telephone, setTelephone] = useState("");
  let [email, setEmail] = useState("");
  let [password1, setPassword1] = useState("");
  let [password2, setPassword2] = useState("");
  let [error, setError] = useState(" ");
  let [result, setResult] = useState("");
  let [loading, setLoading] = useState(false);
  let history = useHistory();

  const txtFname_Change = (e) => {
    setFname(e.target.value);
  };

  const txtSname_Change = (e) => {
    setSname(e.target.value);
  };

  const txtTelephone_Change = (e) => {
    setTelephone(e.target.value);
  };

  const txtEmail_Change = (e) => {
    setEmail(e.target.value);
  };

  const txtPassword1_Change = (e) => {
    setPassword1(e.target.value);
  };

  const txtPassword2_Change = (e) => {
    setPassword2(e.target.value);
  };

  async function btnSubmit_Click(e) {
    // api will run here and the result will be set
    //  console.log(email);
    if (!myUtils.ValidateEmail(email)) {
      //     console.log("invalid email");
      setError("Email address is invalid");
    } else {
      console.log("request made");
      setLoading(true);
      let res = await ApiComms.AddUser({
        fname: fname === "" ? " " : fname,
        sname: sname === "" ? " " : sname,
        telephone: telephone,
        email: email,
        password: password1,
      });
      console.log("sdfgssdfgs");
      setLoading(false);
      console.log("res:::");
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
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="txtEmail"
            label="Email"
            type="email"
            onChange={txtEmail_Change}
            fullWidth
            helperText="Also used as Username"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="txtPassword1"
            label="Password"
            onChange={txtPassword1_Change}
            type="password"
            fullWidth
            //          autoComplete="current-password"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="txtPassword2"
            label="Password"
            type="password"
            onChange={txtPassword2_Change}
            fullWidth
            helperText="Type the password again"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography color="error">{error}</Typography>
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
