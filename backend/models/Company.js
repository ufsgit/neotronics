var db = require("../dbconnection");
// const storedProcedure=require('../helpers/stored-procedure');
var fs = require("fs");
const StoredProcedure = require("../helpers/stored-procedure");
var Company = {
  Save_Company:function(Company_,callback)
  { 
      return db.query("CALL Save_Company(" +
      "@Company_Id_ :=?, @Company_Name_ :=?, @Address1_ :=?, @Address2_ :=?, @Address3_ :=?, @Address4_ :=?, " +
      "@Mobile_Number_ :=?, @Phone_Number_ :=?, @FAX_ :=?, @EMail_ :=?, @Website_ :=?, @Logo_ :=?, @Code_ :=?, " +
      "@GSTNO_ :=?, @CINO_ :=?, @PANNO_ :=?, @Note_ :=?, @Doc_Photo_ :=?, @File_Path_ :=?)",
      [
          Company_.Company_Id || 0,
          Company_.Company_Name || '',
          Company_.Address1 || '',
          Company_.Address2 || '',
          Company_.Address3 || '',
          Company_.Address4 || '',
          Company_.Mobile_Number || '',
          Company_.Phone_Number || '',
          Company_.FAX || '',
          Company_.EMail || '',
          Company_.Website || '',
          Company_.Logo || '',
          Company_.Code || '',
          Company_.GSTNO || '',
          Company_.CINO || '',
          Company_.PANNO || '',
          Company_.Note || '',
          Company_.Doc_Photo || '',
          Company_.File_Path || ''
      ], callback);
  }
  
  ,
  Get_Company: async function () {
    const Company_Data = await new StoredProcedure("Get_Company", []).result();
    return { Company_Data };
  },

};
module.exports = Company;



