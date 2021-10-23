import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ApiComms from "../Utils/ApiComms";
import { useHistory } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import Typography from "@material-ui/core/Typography";

export default function LooseLink() {
  const [selectedDate, setSelectedDate] = useState(
    new Date(new Date().setFullYear(new Date().getFullYear() + 1))
  );
  const [storeid, setStoreId] = useState("");
  const [userid, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  let [errValidation, setErrValidation] = useState("");
  let history = useHistory();
  let [errstoreid, setErrStoreId] = useState(false);
  let [erruserid, setErrUserId] = useState(false);

  const txtStoreId_Change = (e) => {
    setStoreId(e.target.value);
    setErrStoreId(e.target.value > 10000 || e.target.value < 1);
  };

  const txtUserId_Change = (e) => {
    setUserId(e.target.value);
    setErrUserId(e.target.value > 10000 || e.target.value < 1);
  };

  async function btnSubmit_Click() {
    if (userid > 10000 || userid < 1) {
      setErrValidation("User ID is out of range");
    } else if (storeid > 10000 || storeid < 1) {
      setErrValidation("Store ID is out of range");
    } else {
      setLoading(true);
      let res = await ApiComms.LooseLink(userid, storeid);
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
            type="number"
            error={errstoreid}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            required
            id="txtUserId"
            label="User Id"
            onChange={txtUserId_Change}
            fullWidth
            type="number"
            error={erruserid}
          />
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
