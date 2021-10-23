import "date-fns";
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ApiComms from "../Utils/ApiComms";
import { useHistory } from "react-router-dom";
import format from "date-fns/format";
import ProgressBar from "./ProgressBar";
import Typography from "@material-ui/core/Typography";

export default function SetExpiryDate() {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = useState(
    new Date(new Date().setFullYear(new Date().getFullYear() + 1))
  );
  const [storeid, setStoreId] = useState("");
  const [loading, setLoading] = useState(false);
  let [errValidation, setErrValidation] = useState("");
  let [errId, setErrId] = useState(false);
  let history = useHistory();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(format(date, "yyyy-MM-dd"));
  };

  const txtStoreId_Change = (e) => {
    //console.log(e.target.id);
    setStoreId(e.target.value);
    setErrId(e.target.value > 10000 || e.target.value < 1);
  };

  async function btnSubmit_Click() {
    if (storeid > 10000 || storeid < 1) {
      setErrValidation("Store ID is out of range");
    } else {
      //    console.log("request made");
      setLoading(true);
      let res = await ApiComms.SetStoreExpiryDate(
        storeid,
        format(selectedDate, "yyyy-MM-dd")
      );
      setLoading(false);
      console.log(res);
      let myMessage = "Failed !!!!!";

      if (res !== null && res.result === 0) {
        myMessage = "Successful ;)";
      }
      history.push({
        pathname: "/home",
        message: myMessage,
      });
    }
  }

  return (
    <div>
      <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="flex-start"
        spacing={5}
      >
        <Grid item xs={4}>
          {loading && <ProgressBar />}
        </Grid>

        <Grid item xs={4}>
          <TextField
            required
            id="txtStoreId"
            label="Store Id"
            onChange={txtStoreId_Change}
            fullWidth
            error={errId}
            type="number"
          />
        </Grid>

        <Grid item>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="dd/MM/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12}>
          <Typography color="error">{errValidation}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Grid container direction="row-reverse">
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={btnSubmit_Click}
                m={12}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
