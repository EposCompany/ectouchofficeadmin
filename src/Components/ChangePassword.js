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

export default function ChangePassword() {
  const classes = useStyles();
  let [userid, setUserid] = useState("");
  let [password1, setPassword1] = useState("");
  let [password2, setPassword2] = useState("");
  let [error, setError] = useState("");
  let history = useHistory();
  let [loading, setLoading] = useState(false);
  let [erruserid, setUserErrId] = useState(false);

  const txtUserId_Change = (e) => {
    setUserid(e.target.value);
    setUserErrId(e.target.value > 10000 || e.target.value < 1);
  };

  const txtPassword1_Change = (e) => {
    setPassword1(e.target.value);
  };

  const txtPassword2_Change = (e) => {
    setPassword2(e.target.value);
  };

  async function btnSubmit_Click(e) {
    if (userid < 1 || userid > 10000) {
      // Do some validation here and if it passed then take the API call branch.
      //    console.log("Invalid ID");
      setError("User ID is out of range");
    } else {
      setLoading(true);
      let res = await ApiComms.ChangePassword({
        userid: userid,
        password: password1,
      });
      setLoading(false);
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

        <Grid item xs={12}>
          <TextField
            required
            id="txtUserId"
            label="User ID"
            onChange={txtUserId_Change}
            fullWidth
            type="number"
            error={erruserid}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="txtPassword1"
            label="Password"
            onChange={txtPassword1_Change}
            type="password"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
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
        <Grid item xs={12} sm={9} />
        <Grid item xs={12} sm={3}>
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
