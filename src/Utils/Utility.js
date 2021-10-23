const Utility = {
  //  SaeedServerAddress: "http://95.145.134.197:13370",
  SaeedServerAddress: "http://localhost:1337",
  eposservicesAddress: "https://eposservices.co.uk",

  ValidateEmail: (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },

  ValidatePhoneNumber: (phone) => {
    let phoneno = phone.replace(/[^0-9]/g, "");
    console.log("jaleseh");
    console.log(phoneno.length);
    return phoneno.length < 8 || phoneno.length > 12;
  },
};

export default Utility;
