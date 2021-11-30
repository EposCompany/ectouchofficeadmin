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

  function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }

  async function btnSubmit_Click(e) {
    let myMessage = "Failed !!!!!";
    if (!myUtils.ValidateEmail(email)) {
      setError("Email address is invalid");
    } else {
      if (!password1 || (password1 !== password2)) {
        myMessage = "Password mismatch!";
        console.log(myMessage);
      }
      else {
        if (!isNumeric(telephone)) {
          myMessage = "Wrong Value for Telephone";
          console.log(myMessage);
        }
        else {
          console.log("FindUserByEmail made");
          setLoading(true);
          let res1 = await ApiComms.FindUserByEmail({
            email: email
          });
          if (res1 !== null && res1.resultcode !== 0) {
            console.log("AddUser made");
            var res = await ApiComms.AddUser({
              fname: fname === "" ? " " : fname,
              sname: sname === "" ? " " : sname,
              telephone: telephone,
              email: email,
              password: password1,
            });
            setLoading(false);
            console.log("res:::");
            console.log(res);
            if (res !== null && res.resultcode === 0) {
              console.log("AddUser Successful");
              myMessage = "Successful ;)";
            }
            else {
              console.log("AddUser NOT made: " + res.message);
              myMessage = "Failed. " + res.message;
            }
          }
          else {
            console.log("FindUserByEmail NOT made");
            myMessage = "User already exist ...";
          }
        }
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
