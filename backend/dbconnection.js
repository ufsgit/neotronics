var mysql = require("mysql2");
var connection = mysql.createPool({
  
  // host: "localhost",
  // user: "root",
  // password: "ufs@1234",
  // database: "perfecthills_db_v1" 
  host: "localhost",
  user: "root",
  password: "root123",
  database: "neo" 
});
module.exports = connection;
