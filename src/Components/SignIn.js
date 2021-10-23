import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Auth from "../Utils/Auth";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default function SignInSide(props) {
  const classes = useStyles();
  const [username, setUsername] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  //  const [usernameValidate, setUsernameValiated] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  //  let history = useHistory();
  let history = useHistory();

  async function btnSignIn_Click() {
    if (validateEmail(username)) {
      var res = null;
      res = await Auth.Login(username, password);
      console.log(res);
      if (res !== null) {
        console.log("login successful");
        props.RaiseUserLoginEvent(res);
        history.push("/");
      } else {
        console.log("login unsuccessful");
        setErrorMsg("login failed");
      }
    } else {
      setErrorMsg("User name is invalid");
    }
  }

  function handleEmail(e) {
    setUsername(e.target.value);
    // setUsernameValiated(validateEmail(e.target.value));
  }

  function handlePassword(e) {
    //  console.log(password);
    setPassword(e.target.value);
  }

  function keyDownHandler(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      btnSignIn_Click();
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={4} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onKeyDown={keyDownHandler}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleEmail}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handlePassword}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={btnSignIn_Click}
            >
              Sign In
            </Button>
            <Box mt={5}>
              {" "}
              <Typography variant="body1" color="textPrimary" align="center">
                {errorMsg}
              </Typography>
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
