var db=require('../dbconnection');
var fs = require('fs');
var Brand=
{ 
Save_Brand:function(Brand_,callback)
{ 
return db.query("CALL Save_Brand("+"@Brand_Id_ :=?,"+"@Brand_Name_ :=?"+")"
,[Brand_.Brand_Id,Brand_.Brand_Name],callback);
},
Search_Brand: function(Brand_Name_, callback) {
    // if (!Brand_Name_) { // Simplified check
    //     Brand_Name_ = '';
    // }
    // console.log(Brand_Name_, "--------Brand_Name_");
    if (Brand_Name_==='undefined'||Brand_Name_===''||Brand_Name_===undefined )
        Brand_Name_='';

    const specialCharacters = /([~@#$%^&*()_+\-=[\]\\{}|;:'",.<>?/])/g;
		if (specialCharacters.test(Brand_Name_)) {
			console.log("String contains special characters.");
            // Brand_Name_ = Brand_Name_.replace(/\\/g, '\\\\');
		} else {
			console.log("String does not contain special characters.");
		}
	

    return db.query("CALL Search_Brand(@Brand_Name_ :=?)", [Brand_Name_], callback);
},

// Search_Brand:function(Brand_Name_,callback)
// { 
    
//     if (Brand_Name_==='undefined'||Brand_Name_===''||Brand_Name_===undefined ) 
// Brand_Name_='';
// console.log(Brand_Name_,"--------Brand_Name_");

// return db.query("CALL Search_Brand(@Brand_Name_ :=?)",[Brand_Name_],callback);
// },
Delete_Brand:function(Brand_Id_,callback)
{ 
return db.query("CALL Delete_Brand(@Brand_Id_ :=?)",[Brand_Id_],callback);
},
Search_Under_Brand:function(callback)
    { 
    return db.query("CALL Search_Under_Brand()",[],callback);
    },
};
module.exports=Brand;

