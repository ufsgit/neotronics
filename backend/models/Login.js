var db = require("../dbconnection");

var Login = {
  Login_Check: function(User_Name_, Password_, callback) {
    console.log(User_Name_);
    console.log(Password_);
    console.log('in model ');
    return db.query(
      "CALL Login_Check (@User_Name_ :=?,@Password_ :=?)",
      [User_Name_, Password_],
      callback
    );
  },

Login_Checks: function(User_Name_, Password_, callback) {
    console.log(User_Name_);
    console.log(Password_);
    console.log('in model ');
    return db.query(
      "CALL Login_Checks (@User_Name_ :=?,@Password_ :=?)",
      [User_Name_, Password_],
      callback
    );
  },
};
module.exports = Login;
