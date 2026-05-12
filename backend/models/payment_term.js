 var db=require('../dbconnection');
 var fs = require('fs');
 var payment_term=
 { 
 Save_payment_term:function(payment_term_,callback)
 { 
db.query("ALTER TABLE payment_term ADD COLUMN IF NOT EXISTS Description VARCHAR(500) NULL", [], function() {
db.query("ALTER TABLE payment_term ADD COLUMN IF NOT EXISTS Caption VARCHAR(500) NULL", [], function() {
return db.query("CALL Save_payment_term("+
"@payment_Term_ID_ :=?,"+
"@Payment_Term_Description_ :=?"+")"
 ,[payment_term_.payment_Term_ID,
payment_term_.Payment_Term_Description
], function(err, result) {
    if (err) return callback(err);
    if (result && result[0] && result[0][0] && result[0][0].payment_Term_ID_ > 0) {
        var desc = payment_term_.Description || '';
        var caption = payment_term_.Caption || '';
        db.query("UPDATE payment_term SET Description = ?, Caption = ? WHERE payment_Term_ID = ?",
            [desc, caption, result[0][0].payment_Term_ID_],
            function() { callback(null, result); });
    } else {
        callback(null, result);
    }
});
});
});
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

 const specialCharacters = /([~@#$%^&*()_+\-=[\]\\{}|;:'",.<>?/])/g;
     if (specialCharacters.test(payment_term_Name_)) {
         console.log("String contains special characters.");
     } else {
         console.log("String does not contain special characters.");
     }

db.query("ALTER TABLE payment_term ADD COLUMN IF NOT EXISTS Description VARCHAR(500) NULL", [], function() {
db.query("ALTER TABLE payment_term ADD COLUMN IF NOT EXISTS Caption VARCHAR(500) NULL", [], function() {
    var query, params;
    if (payment_term_Name_ === '') {
        query = "SELECT payment_Term_ID, Payment_Term_Description, COALESCE(Description,'') as Description, COALESCE(Caption,'') as Caption FROM payment_term WHERE DeleteStatus=0 ORDER BY Payment_Term_Description";
        params = [];
    } else {
        query = "SELECT payment_Term_ID, Payment_Term_Description, COALESCE(Description,'') as Description, COALESCE(Caption,'') as Caption FROM payment_term WHERE Payment_Term_Description LIKE ? AND DeleteStatus=0 ORDER BY Payment_Term_Description";
        params = ['%' + payment_term_Name_ + '%'];
    }
    return db.query(query, params, function(err, result) {
        if (err) return callback(err);
        callback(null, [result]);
    });
});
});
 },

 /** Added on 30-10-2024 */

 Load_Payment_Term:function(callback)
 { 
 return db.query("CALL Load_Payment_Term()",[],callback);
 } ,

  };
  module.exports=payment_term;

