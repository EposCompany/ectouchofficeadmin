import React, { useState, useEffect } from "react";
import "./App.css";
import "./Components/SignUp";
//import SignUp from "./Components/SignUp";
import SignInSide from "./Components/SignIn";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
// import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home";
import MyHooks from "./Utils/MyHooks";

function App() {
  const [user, setUser] = MyHooks.useStateObjectWithLocalStorage(
    "localStorageUser"
  );

  //  const [message, setMessage] = useState("");
  var history = useHistory();

  function OnUserLogin(oUser) {
    console.log("state changed");
    setUser(oUser);
  }

  function OnUserLogout() {
    setUser(null);
  }

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          {user ? <Redirect to="/home" /> : <Redirect to="/login" />}
        </Route>
        <Route
          exact
          path="/login"
          render={(props) => (
            <SignInSide {...props} RaiseUserLoginEvent={OnUserLogin} />
          )}
        />
        <Route
          path="/home"
          render={(props) => (
            <Home
              {...props}
              message={user ? user.fname : ""}
              user={user}
              RaiseUserLoginEvent={OnUserLogout}
            />
          )}
          //     component={Home} //{<Home />}
          // {<Dashboard {...props} user={user} />}
        />
        {/* <Route exact path="*" component={() => "page not found"} /> */}
      </Switch>
    </div>
  );
}

export default App;
