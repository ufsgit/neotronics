 var db=require('../dbconnection');
 var fs = require('fs');
 const storedProcedure=require('../helpers/stored-procedure');
 var User_Details=
 { 
 Save_User_Details: async function (User_Details_) 
 {
        console.log(User_Details_)
         return new Promise(async (rs,rej)=>{
        const pool = db.promise();
         let result1;
          var connection = await pool.getConnection();
         await connection.beginTransaction();
         var User_Menu_Selection_ = User_Details_.User_Menu_Selection_Data;
          console.log(User_Menu_Selection_)
          try
           {
            const result1 = await(new storedProcedure('Save_User_Details',[User_Details_.User_Details_Id,User_Details_.User_Details_Name,User_Details_.Password,
            User_Details_.User_Type,User_Menu_Selection_,User_Details_.Working_Status_Id,User_Details_.Working_Status], connection)).result();
            console.log(result1)
              await connection.commit();
              connection.release();
              rs( result1);
            }
            catch (err) {
           console.log(err)
            await connection.rollback();
            rej(err);
            }   
})
},
 Delete_User_Details:function(User_Details_Id_,callback)
   { 
   return db.query("CALL Delete_User_Details(@User_Details_Id_ :=?)",[User_Details_Id_],callback);
   } ,
 Get_User_Details:function(User_Details_Id_,callback)
   { 
   return db.query("CALL Get_User_Details(@User_Details_Id_ :=?)",[User_Details_Id_],callback);
   } ,
 Search_User_Details:function(User_Type,Login_User_Id,User_Details_Name_,callback)
   { 
   if (User_Details_Name_==='undefined'||User_Details_Name_===''||User_Details_Name_===undefined )
   User_Details_Name_='';
  console.log('data:',User_Details_Name_,User_Type,Login_User_Id);
   return db.query("CALL Search_User_Details(@User_Type :=?,@Login_User_Id :=?,@User_Details_Name_ :=?)",
    [User_Type, Login_User_Id, User_Details_Name_],callback);
   },
 Get_Menu_Permission:function(User_Id_,callback)
   { 
   return db.query("CALL Get_Menu_Permission(@User_Id_ :=?)",[User_Id_],callback);
   },
 User_Employee:function(User_Details_Id_,callback)
   { 
   return db.query("CALL User_Employee(@User_Details_Id_ :=?)",[User_Details_Id_],callback);
   },
   Get_Last_Bill_Number:function(Store_Id_,callback)
   { 
   return db.query("CALL Get_Last_Bill_Number(@Store_Id_ :=?)",[Store_Id_],callback);
   },
 Get_User_Type:function(callback)
   { 
   return db.query("CALL Get_User_Type()",[],callback);
   },

   Load_InvoiceType2:function(callback)
   { 
   return db.query("CALL Load_InvoiceType2()",[],callback);
   },


 Get_Users_Load_Data: async function () 
   {
   const User_Type=await (new storedProcedure('Get_User_Type',  [])).result();
   const User_Menu_Selection = await (new storedProcedure('Search_User_Menu_Selection', [])).result();
   const Working_Status = await (new storedProcedure('Get_Working_Status', [])).result();
  //  const Store = await (new storedProcedure('Load_Store', [])).result();
   return {User_Type,User_Menu_Selection,Working_Status};    
   },



Get_User_Details_Edit:function(User_Details_Id_,callback)
   { 
   return db.query("CALL Get_User_Details_Edit(@User_Details_Id_ :=?)",[User_Details_Id_],callback);
   },


   Load_InvoiceType:function(AccountType_Name_,callback)
   { 
   if (AccountType_Name_==='undefined'||AccountType_Name_===''||AccountType_Name_===undefined )
   AccountType_Name_='';
   return db.query("CALL Load_InvoiceType(@AccountType_Name_ :=?)",[AccountType_Name_],callback);
   },


   Search_SaleInvoiceNo_Typeahead:function(Account_Party_Id_,callback)
   { 
   if (Account_Party_Id_==='undefined'||Account_Party_Id_===''||Account_Party_Id_===undefined )
   Account_Party_Id_='';
   return db.query("CALL Search_SaleInvoiceNo_Typeahead(@Account_Party_Id_ :=?)",[Account_Party_Id_],callback);
   },

};
  module.exports=User_Details;

