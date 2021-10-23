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
import AlertDialog from "../Utils/AlertsBox";
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

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default function EditStore() {
  const classes = useStyles();
  let [storeid, setStoreId] = useState("");
  let [contact, setContact] = useState("");
  let [address1, setAddress1] = useState("");
  let [address2, setAddress2] = useState("");
  let [address3, setAddress3] = useState("");
  let [postcode, setPostcode] = useState("");
  let [email, setEmail] = useState("");
  let [terminals, setTerminals] = useState("");
  let [currencysign, setCurrencysign] = useState("");
  let [validationError, setValidationError] = useState("");
  let [result, setResult] = useState("");
  let [loading, setLoading] = useState(false);
  let [errstoreid, setErrStoreId] = useState(false);
  let [errcurrency, setErrCurrency] = useState(false);
  let [errterminals, setErrterminals] = useState(false);
  let history = useHistory();

  const txtStoreId_Change = (e) => {
    setStoreId(e.target.value);
    setErrStoreId(e.target.value > 10000 || e.target.value < 1);
  };

  const txtContact_Change = (e) => {
    setContact(e.target.value);
  };

  const txtAddress1_Change = (e) => {
    setAddress1(e.target.value);
  };

  const txtAddress2_Change = (e) => {
    setAddress2(e.target.value);
  };

  const txtAddress3_Change = (e) => {
    setAddress3(e.target.value);
  };

  const txtPostcode_Change = (e) => {
    setPostcode(e.target.value);
  };

  const txtEmail_Change = (e) => {
    setEmail(e.target.value);
  };

  const txtTerminals_Change = (e) => {
    setTerminals(e.target.value);
  };

  const txtCurrencysign_Change = (e) => {
    setCurrencysign(e.target.value);
    setErrCurrency(e.target.value.length < 1 || e.target.value.length > 4);
  };

  async function btnSubmit_Click(e) {
    // api will run here and the result will be set
    //  console.log(email);
    if (storeid < 1 || storeid > 10000) {
      setValidationError("Store ID is out of range");
    } else if (!myUtils.ValidateEmail(email)) {
      //   console.log("invalid email");
      setValidationError("Email address is invalid");
    } else if (currencysign < 1 || currencysign > 4) {
      setValidationError("Currency sign should be maximum 4 characters long");
    } else if (terminals < 1 || terminals > 24) {
      setValidationError("Maximum allowed number for No. of terminals is 24");
    } else {
      console.log("request made");
      setLoading(true);
      let res = await ApiComms.EditStore({
        storeid: storeid,
        contact: contact.length <= 0 ? " " : contact,
        address1: address1.length <= 0 ? " " : address1,
        address2: address2.length <= 0 ? " " : address2,
        address3: address3.length <= 0 ? " " : address3,
        postcode: postcode.length <= 0 ? " " : postcode,
        email: email,
        terminals: terminals,
        currencysign: currencysign,
      });
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
            required
            id="txtStoreId"
            label="Store Id"
            type="number"
            onChange={txtStoreId_Change}
            fullWidth
            error={errstoreid}
          />
        </Grid>
        <Grid item xs={12} sm={6} />
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="txtContact"
            label="Contact"
            onChange={txtContact_Change}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="txtAddress1"
            label="Address1"
            onChange={txtAddress1_Change}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="txtAddress2"
            label="Address2"
            onChange={txtAddress2_Change}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="txtAddress3"
            label="Address3"
            onChange={txtAddress3_Change}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="txtPostcode"
            label="Postcode"
            onChange={txtPostcode_Change}
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
            id="txtTerminals"
            label="No. of Terminals"
            type="number"
            onChange={txtTerminals_Change}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            error={errcurrency}
            id="txtCurrencysign"
            label="Currency Sign"
            onChange={txtCurrencysign_Change}
            fullWidth
          />
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
    </React.Fragment>
  );
}
