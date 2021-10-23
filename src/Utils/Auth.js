import ApiComms from "./ApiComms";

const Auth = {
  user: null,
  async Login(username, password) {
    let result = await ApiComms.LoginUser(username, password);
    if (
      result !== null &&
      result.resultcode === 0 &&
      result.result.accesslevel > 7
    ) {
      Auth.user = result.result;
      console.log("logged in");
      return result.result;
    } else {
      console.log("logged out");
    }
    return null;
    // callback(result.result);
    //return result.result;
  },
  async Logout(callback) {
    let result = null;
    if (Auth.user) {
      result = await ApiComms.LogoutUser(Auth.user.id);
      if (result.resultcode === 0) {
        Auth.user = null;
      }
    }
    return callback();
  },
  IsLoggedIn() {
    return Auth.user ? true : false;
  },
};

export default Auth;
