import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ApiComms from "../Utils/ApiComms";
import { useHistory } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import Typography from "@material-ui/core/Typography";

export default function AllocateMemory() {
  // The first commit of Material-UI
  const [storeid, setStoreId] = useState("");
  const [loading, setLoading] = useState(false);
  const [plumemory, setPLUMemory] = useState("");
  const [customermemory, setCustomerMemory] = useState("");
  let [validationError, setValidationError] = useState("");
  let [errId, setErrId] = useState(false);
  let [errPLUmemory, setErrPLUmemory] = useState(false);
  let [errCustomerMemory, setErrCustomerMemory] = useState(false);
  let history = useHistory();

  const txtStoreId_Change = (e) => {
    setStoreId(e.target.value);
    setErrId(e.target.value > 10000 || e.target.value < 1);
  };

  const txtPLUMemory_Change = (e) => {
    setPLUMemory(e.target.value);
    setErrPLUmemory(e.target.value < 1 || e.target.value > 32500);
  };

  const txtCustomerMemory_Change = (e) => {
    setCustomerMemory(e.target.value);
    setErrCustomerMemory(e.target.value < 1 || e.target.value > 32500);
  };

  async function btnSubmitPLU_Click() {
    if (storeid > 10000 || storeid < 1) {
      setValidationError("Store ID is out of range");
    } else if (plumemory < 1 || plumemory > 32500) {
      setValidationError("PLU Memory is out of range");
    } else {
      setLoading(true);
      let res = await ApiComms.AllocateMemory(5, plumemory, storeid);
      setLoading(false);
      console.log(res);
      let myMessage = "Filed !!!!!";

      if (res !== null && res.result === 0) {
        myMessage = "Successful ;)";
      }
      history.push({
        pathname: "/home",
        message: myMessage,
      });
    }
  }

  async function btnSubmitCustomer_Click() {
    if (storeid > 10000 || storeid < 1) {
      setValidationError("Store ID is out of range");
    } else if (customermemory < 1 || customermemory > 32500) {
      setValidationError("Customer Memory is out of range");
    } else {
      setLoading(true);
      let res = await ApiComms.AllocateMemory(26, customermemory, storeid);
      setLoading(false);
      console.log(res);
      let myMessage = "Filed !!!!!";

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
        direction="row"
        justify="space-between"
        alignItems="center"
        spacing={8}
      >
        <Grid item xs={12}>
          {loading && <ProgressBar />}
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="txtStoreId"
            label="Store Id"
            onChange={txtStoreId_Change}
            type="number"
            error={errId}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6} />
        <Grid item xs={6}>
          <TextField
            required
            id="txtPLUMemory"
            label="PLU Memory"
            type="number"
            error={errPLUmemory}
            onChange={txtPLUMemory_Change}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            required
            id="txtCustomerMemory"
            label="Customer Memory"
            type="number"
            error={errCustomerMemory}
            onChange={txtCustomerMemory_Change}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography color="error">{validationError}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            id="SubmitPLU"
            onClick={btnSubmitPLU_Click}
            m={5}
          >
            Submit PLU
          </Button>
        </Grid>

        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={btnSubmitCustomer_Click}
            m={5}
          >
            Submit Customer
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
