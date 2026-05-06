var db=require('../dbconnection');
const storedProcedure=require('../helpers/stored-procedure');
var fs = require('fs');
var Employee_Details=
{ 
Save_Employee_Details1:function(Employee_Details_,callback)
    { 
    return db.query("CALL Save_Employee_Details("+"@Employee_Details_Id_ :=?,"+"@Client_Accounts_Id_ :=?,"+
    "@Level_Id_ :=?,"+"@DesigId_ :=?,"+"@DateOfBirth_ :=?,"+"@DateOfJoin_ :=?,"+"@ReleiveDate_ :=?,"+
    "@WorkingStatus_ :=?,"+"@Locations_ :=?,"+"@Manager_Id_ :=?,"+"@Is_SalesMan_ :=?,"+"@Can_Delete_ :=?"+")"
    ,[Employee_Details_.Employee_Details_Id,Employee_Details_.Client_Accounts_Id,Employee_Details_.Level_Id,
    Employee_Details_.DesigId,Employee_Details_.DateOfBirth,Employee_Details_.DateOfJoin,
    Employee_Details_.ReleiveDate,Employee_Details_.WorkingStatus,Employee_Details_.Locations,
    Employee_Details_.Manager_Id,Employee_Details_.Is_SalesMan,Employee_Details_.Can_Delete],callback);
    },


    Save_Employee_Details: async function (Employee_Master_) 
    {
                 
            return new Promise(async (rs,rej)=>{
           const pool = db.promise();
         let result1; 
            let Client_Accounts_=Employee_Master_.ClientAccounts;
            let Employee_Details_=Employee_Master_.Employee_Details;
            // let Employee_Location_=Employee_Master_.Location;
             var connection = await pool.getConnection();
             try
              {
               const result1 = await(new storedProcedure('Save_Employee_Master',[Client_Accounts_,
                Employee_Details_], connection)).result();
                 console.log(result1)
                 //await connection.commit();
                 connection.release();
                 rs( result1);
               }
               catch (err) {
                console.log(err)
               //await connection.rollback();
               rej(err);
               }   
   })
   },












Delete_Employee_Details:function(Client_Accounts_Id_,callback)
    { 
    return db.query("CALL Delete_Employee_Details(@Client_Accounts_Id_ :=?)",[Client_Accounts_Id_],callback);
    } ,
Get_Employee_Details:function(Employee_Details_Id_,callback)
    { 
    return db.query("CALL Get_Employee_Details(@Employee_Details_Id_ :=?)",[Employee_Details_Id_],callback);
    } ,
Get_Employee:function(Client_Accounts_Id_,callback)
    { 
    return db.query("CALL Get_Employee_Details(@Client_Accounts_Id_ :=?)",[Client_Accounts_Id_],callback);
    } ,
Search_Employee_Details:function(Client_Accounts_Name_,callback)
    { 
    if (Client_Accounts_Name_==='undefined'||Client_Accounts_Name_===''||Client_Accounts_Name_===undefined )
    Client_Accounts_Name_='';
    return db.query("CALL Search_Employee_Details(@Client_Accounts_Name_ :=?)",[Client_Accounts_Name_],callback);
    },
Get_Employee_Detail: async function (Client_Accounts_Id_)
    {     
    const Employee_Details=await (new storedProcedure('Get_Employee_Details',  [Client_Accounts_Id_])).result();
    const Client_Accounts = await (new storedProcedure('Get_Client_Accounts_Employee', [Client_Accounts_Id_])).result();
    // const Employee_Location = await (new storedProcedure('Get_Employee_Location', [Client_Accounts_Id_])).result();
       return {returnvalue:{Employee_Details,Client_Accounts}};  
    },
};
module.exports=Employee_Details;

