var db = require("../dbconnection");
// const storedProcedure=require('../helpers/stored-procedure');
var fs = require("fs");
const StoredProcedure = require("../helpers/stored-procedure");
var Company = {
  Save_Company:function(Company_,callback)
  { 
   var Company_value_=1;
  return db.query("CALL Save_Company("+"@Company_ :=?,"+"@Company_value_ :=?)" ,[JSON.stringify(Company_),Company_value_],callback); 
  }
  
  ,
  Get_Company: async function () {
    const Company_Data = await new StoredProcedure("Get_Company", []).result();
    return { Company_Data };
  },

};
module.exports = Company;



