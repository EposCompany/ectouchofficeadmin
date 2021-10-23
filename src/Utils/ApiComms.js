import myUtils from "./Utility";

const baseApiAddress = myUtils.eposservicesAddress;

const ApiComms = {
  LoginUser: async function fetchLoginUser(email, password) {
    const options = {
      method: "GET",
      headers: new Headers({
        "content-type": "text/plain",
        // Authorization:
        //   "07a460dd879652a3aef7cc1ed287a2376fd5a20dde30ecb06db210fadf5aee353df246"
      }),
    };

    const url =
      baseApiAddress +
      "/v1/users/login/userby/email=" +
      email +
      "/password=" +
      password;

    console.log(url);
    var response = await fetch(url, options);
    const myJson = await response.json();
    console.log(myJson);
    return myJson;
  },

  LogoutUser: async function fetchLogoutUser(userId) {
    const options = {
      method: "GET",
      headers: new Headers({
        "content-type": "text/plain",
      }),
    };

    const url = baseApiAddress + "/v1/users/logout/userby/userid=" + userId;

    // console.log(url);
    var response = await fetch(url, options);
    const myJson = await response.json();
    return myJson;
  },

  AddUser: async function PostAddUser(user) {
    const options = {
      method: "POST",
      headers: new Headers({
        "content-type": "text/plain",
      }),
    };

    const url =
      baseApiAddress +
      "/v1/users/add/user/fname=" +
      user.fname +
      "/sname=" +
      user.sname +
      "/telephone=" +
      user.telephone +
      "/email=" +
      user.email +
      "/password=" +
      user.password;

    var myJson = null;
    console.log(url);
    try {
      var response = await fetch(url, options);
      myJson = await response.json();
    } catch (e) {
      console.log("error cought");
      myJson = null;
    }
    console.log(myJson);
    return myJson;
  },

  ChangePassword: async function PutChangeUserPassword(user) {
    const options = {
      method: "PUT",
      headers: new Headers({
        "content-type": "text/plain",
      }),
    };

    const url =
      baseApiAddress +
      "/v1/users/change/password/userid=" +
      user.userid +
      "/password=" +
      user.password;

    var myJson = null;
    console.log(url);
    try {
      var response = await fetch(url, options);
      myJson = await response.json();
    } catch (e) {
      console.log("error cought");
      myJson = null;
    }
    console.log(myJson);
    return myJson;
  },

  StoreList: async function GetStoreList() {
    const options = {
      method: "GET",
      headers: new Headers({
        "content-type": "text/plain",
      }),
    };

    const url = baseApiAddress + "/v1/get/storelist";
    var myJson = null;
    console.log(url);
    try {
      var response = await fetch(url, options);
      myJson = await response.json();
    } catch (e) {
      console.log("error cought");
      console.log(e);
      myJson = null;
    }
    console.log(myJson);
    return myJson;
  },

  StoreDetailsById: async function GetStoreDetailsById(storeid) {
    const options = {
      method: "GET",
      headers: new Headers({
        "content-type": "text/plain",
      }),
    };

    const url = baseApiAddress + "/v1/get/storedetailsbyid/storeid=" + storeid;
    var myJson = null;
    console.log(url);
    try {
      var response = await fetch(url, options);
      myJson = await response.json();
    } catch (e) {
      console.log("error cought");
      console.log(e);
      myJson = null;
    }
    console.log(myJson);
    return myJson;
  },

  SetStoreExpiryDate: async function GetSetStoreExpiryDateByName(
    storeid,
    expiry
  ) {
    const options = {
      method: "PUT",
      headers: new Headers({
        "content-type": "text/plain",
      }),
    };

    const url =
      baseApiAddress +
      "/v1/setup/renew/store/expiry/storeid=" +
      storeid +
      "/expiry=" +
      expiry;
    var myJson = null;
    console.log(url);
    try {
      var response = await fetch(url, options);
      myJson = await response.json();
    } catch (e) {
      console.log("error cought");
      console.log(e);
      myJson = null;
    }
    console.log(myJson);
    return myJson;
  },

  ActivateUser: async function PutActivateUser(userid, activate) {
    const options = {
      method: "PUT",
      headers: new Headers({
        "content-type": "text/plain",
      }),
    };

    const url =
      baseApiAddress +
      (activate
        ? "/v1/users/activate/user/userid="
        : "/v1/users/inactivate/user/userid=") +
      userid;
    var myJson = null;
    console.log(url);
    try {
      var response = await fetch(url, options);
      myJson = await response.json();
    } catch (e) {
      console.log("error cought");
      console.log(e);
      myJson = null;
    }
    console.log(myJson);
    return myJson;
  },

  EditStore: async function PutEditStore(store) {
    const options = {
      method: "PUT",
      headers: new Headers({
        "content-type": "text/plain",
      }),
    };

    const url =
      baseApiAddress +
      "/v1/users/edit/store/storeid=" +
      store.storeid +
      "/contact=" +
      store.contact +
      "/address1=" +
      store.address1 +
      "/address2=" +
      store.address2 +
      "/address3=" +
      store.address3 +
      "/postcode=" +
      store.postcode +
      "/email=" +
      store.email +
      "/terminals=" +
      store.terminals +
      "/currencysign=" +
      store.currencysign;

    var myJson = null;
    console.log(url);
    try {
      var response = await fetch(url, options);
      myJson = await response.json();
    } catch (e) {
      console.log("error cought");
      myJson = null;
    }
    console.log(myJson);
    return myJson;
  },

  AllocateMemory: async function PostAllocateMemory(file, memory, storeid) {
    const options = {
      method: "POST",
      headers: new Headers({
        "content-type": "text/plain",
      }),
    };

    const url =
      baseApiAddress +
      "/v1/setup/allocmemory/file=" +
      file +
      "/memory=" +
      memory +
      "/storeid=" +
      storeid;
    var myJson = null;
    console.log(url);
    try {
      var response = await fetch(url, options);
      myJson = await response.json();
    } catch (e) {
      console.log("error cought");
      console.log(e);
      myJson = null;
    }
    console.log(myJson);
    return myJson;
  },

  LinkUserToStore: async function PostLinkUserToStore(userId, storeId) {
    const options = {
      method: "POST",
      headers: new Headers({
        "content-type": "text/plain",
      }),
    };

    const url =
      baseApiAddress +
      "/v1/users/link/usertostore/userid=" +
      userId +
      "/storeid=" +
      storeId;

    var myJson = null;
    console.log(url);
    try {
      var response = await fetch(url, options);
      myJson = await response.json();
    } catch (e) {
      console.log("error cought");
      console.log(e);
      myJson = null;
    }
    console.log(myJson);
    return myJson;
  },

  UserList: async function GetUserList() {
    const options = {
      method: "GET",
      headers: new Headers({
        "content-type": "text/plain",
      }),
    };

    const url = baseApiAddress + "/v1/users/get/userlist";
    var myJson = null;
    console.log(url);
    try {
      var response = await fetch(url, options);
      myJson = await response.json();
    } catch (e) {
      console.log("error cought");
      console.log(e);
      myJson = null;
    }
    console.log(myJson);
    return myJson;
  },

  EditUser: async function PutEditUser(userid, fname, sname, telephone) {
    const options = {
      method: "PUT",
      headers: new Headers({
        "content-type": "text/plain",
      }),
    };

    const url =
      baseApiAddress +
      "/v1/users/edit/user/userid=" +
      userid +
      "/fname=" +
      fname +
      "/sname=" +
      sname +
      "/telephone=" +
      telephone;

    var myJson = null;
    console.log(url);
    try {
      var response = await fetch(url, options);
      myJson = await response.json();
    } catch (e) {
      console.log("error cought");
      myJson = null;
    }
    console.log(myJson);
    return myJson;
  },

  LooseLink: async function DeleteLooseLink(userId, storeId) {
    const options = {
      method: "DELETE",
      headers: new Headers({
        "content-type": "text/plain",
      }),
    };

    const url =
      baseApiAddress +
      "/v1/users/looselink/usertostore/userid=" +
      userId +
      "/storeid=" +
      storeId;

    var myJson = null;
    console.log(url);
    try {
      var response = await fetch(url, options);
      myJson = await response.json();
    } catch (e) {
      console.log("error cought");
      console.log(e);
      myJson = null;
    }
    console.log(myJson);
    return myJson;
  },
};

export default ApiComms;
