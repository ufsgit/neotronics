var db=require('../dbconnection');
var fs = require('fs');
var Brand=
{ 
Save_Brand:function(Brand_,callback)
{ 
// First save the brand with existing stored procedure
return db.query("CALL Save_Brand("+"@Brand_Id_ :=?,"+"@Brand_Name_ :=?"+")"
,[Brand_.Brand_Id,Brand_.Brand_Name], function(err, result) {
    if (err) {
        return callback(err);
    }
    
    // If brand was saved successfully and we have Item data, update the Item fields
    if (result && result[0] && result[0][0] && result[0][0].Brand_Id_ > 0) {
        const brandId = result[0][0].Brand_Id_;
        
        // Update the Brand record with Item information
        if (Brand_.Item_Name && Brand_.Item_Name.trim() !== '') {
            db.query(
                "UPDATE Brand SET Item_Name = ?, Item_Id = ? WHERE Brand_Id = ?",
                [Brand_.Item_Name, Brand_.Item_Id || 0, brandId],
                function(updateErr, updateResult) {
                    if (updateErr) {
                        console.log('Error updating Item fields:', updateErr);
                    }
                    // Return the original result regardless of Item update status
                    callback(null, result);
                }
            );
        } else {
            callback(null, result);
        }
    } else if (result && result[0] && result[0][0] && result[0][0].Brand_Id_ == -1) {
        // Brand name already exists
        callback(null, result);
    } else {
        // Some other error occurred
        callback(null, result);
    }
});
},
Search_Brand: function(Brand_Name_, callback) {
    if (Brand_Name_==='undefined'||Brand_Name_===''||Brand_Name_===undefined )
        Brand_Name_='';

    const specialCharacters = /([~@#$%^&*()_+\-=[\]\\{}|;:'",.<>?/])/g;
		if (specialCharacters.test(Brand_Name_)) {
			console.log("String contains special characters.");
		} else {
			console.log("String does not contain special characters.");
		}

    // Use direct SQL query to get Item fields as well
    let query;
    let params;
    
    if (Brand_Name_ === '') {
        query = "SELECT Brand_Id, Brand_Name, COALESCE(Item_Id, 0) as Item_Id, COALESCE(Item_Name, '') as Item_Name FROM Brand WHERE DeleteStatus = 0 ORDER BY Brand_Name";
        params = [];
    } else {
        query = "SELECT Brand_Id, Brand_Name, COALESCE(Item_Id, 0) as Item_Id, COALESCE(Item_Name, '') as Item_Name FROM Brand WHERE Brand_Name LIKE ? AND DeleteStatus = 0 ORDER BY Brand_Name";
        params = ['%' + Brand_Name_ + '%'];
    }
    
    return db.query(query, params, function(err, result) {
        if (err) {
            return callback(err);
        }
        // Wrap result in array format expected by frontend
        callback(null, [result]);
    });
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

