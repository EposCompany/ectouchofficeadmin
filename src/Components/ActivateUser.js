import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import ProgressBar from "./ProgressBar";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ApiComms from "../Utils/ApiComms";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
  group: {
    margin: theme.spacing(1, 0),
  },
}));

export default function ActivateUser() {
  const classes = useStyles();
  const [activation, setActivation] = React.useState("activate");
  const [userid, setUserid] = useState(null);
  let [loading, setLoading] = useState(false);
  let history = useHistory();
  let [erruserid, setErrUserId] = useState(false);
  let [validationError, setValidationError] = useState("");

  function rbActivation_Change(event) {
    setActivation(event.target.value);
  }

  const txtUserId_Change = (e) => {
    // console.log(e.target.value);
    setUserid(e.target.value);
    setErrUserId(e.target.value > 10000 || e.target.value < 1);
  };

  async function btnSubmit_Click() {
    if (userid < 1 || userid > 10000) {
      //here you validate the fields
      setValidationError("User ID is out of range");
    } else {
      setLoading(true);
      let res = await ApiComms.ActivateUser(userid, activation === "activate");
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
    }
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3} justify="center">
        <Grid item xs={12}>
          {loading && <ProgressBar />}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="txtUserId"
            label="User Id"
            type="number"
            onChange={txtUserId_Change}
            fullWidth
            error={erruserid}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">User Activation</FormLabel>
            <RadioGroup
              aria-label="ActivateUser"
              name="ActivateUser"
              className={classes.group}
              value={activation}
              onChange={rbActivation_Change}
            >
              <FormControlLabel
                value="activate"
                control={<Radio />}
                label="Activate User"
              />
              <FormControlLabel
                value="deactivate"
                control={<Radio />}
                label="Deactivate User"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography color="error">{validationError}</Typography>
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
    </div>
  );
}
