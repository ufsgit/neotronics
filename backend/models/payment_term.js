 var db=require('../dbconnection');
 var fs = require('fs');
 var payment_term=
 { 
 Save_payment_term:function(payment_term_,callback)
 { 
return db.query("CALL Save_payment_term("+
"@payment_Term_ID_ :=?,"+
"@Payment_Term_Description_ :=?"+")"
 ,[payment_term_.payment_Term_ID,
payment_term_.Payment_Term_Description
],callback);
 }
 ,
 Delete_payment_term:function(payment_term_Id_,callback)
 { 
return db.query("CALL Delete_payment_term(@payment_term_Id_ :=?)",[payment_term_Id_],callback);
 }
 ,
 Get_payment_term:function(payment_term_Id_,callback)
 { 
return db.query("CALL Get_payment_term(@payment_term_Id_ :=?)",[payment_term_Id_],callback);
 }
 ,
 Search_payment_term:function(payment_term_Name_,callback)
 { 
 if (payment_term_Name_===undefined || payment_term_Name_==="undefined" )
payment_term_Name_='';

 
    
//  console.log('ItemName2_: ', payment_term_Name_);
 const specialCharacters = /([~@#$%^&*()_+\-=[\]\\{}|;:'",.<>?/])/g;
     if (specialCharacters.test(payment_term_Name_)) {
         console.log("String contains special characters.");
        //  payment_term_Name_ = payment_term_Name_.replace(/\\/g, '\\\\');
     } else {
         console.log("String does not contain special characters.");
     }
 
    //  console.log('Escaped Client_Accounts_Name:', payment_term_Name_);


return db.query("CALL Search_payment_term(@payment_term_Name_ :=?)",[payment_term_Name_],callback);
 },

 /** Added on 30-10-2024 */

 Load_Payment_Term:function(callback)
 { 
 return db.query("CALL Load_Payment_Term()",[],callback);
 } ,

  };
  module.exports=payment_term;

