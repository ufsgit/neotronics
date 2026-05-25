var db=require('../dbconnection');
var fs = require('fs');
var Item=
{ 
Save_Item:function(Item_,callback)
    {
        console.log(Item_);

        const gst = Number((Item_.gst ?? Item_.GST ?? Item_.Sales_Tax) || 0);
        const cgst = Number((Item_.cgst ?? Item_.CGST) || 0);
        const sgst = Number((Item_.sgst ?? Item_.SGST) || 0);
        const igst = Number((Item_.igst ?? Item_.IGST) || 0);
        const b2bRate = Number((Item_.b2b_rate ?? Item_.B2B_Rate) || 0);
        const b2cRate = Number((Item_.b2c_rate ?? Item_.B2C_Rate) || 0);

        // Country of Origin removed from UI; keep as 0/empty for backward compatibility
        const countryId = 0;
        const countryName = "";

        const paramsNew = [
            Item_.Item_Id,
            Item_.Group_Id,
            Item_.Group_Name,
            Item_.Saleunit_Id,
            Item_.Saleunit_Name,
            Item_.Item_Code,
            Item_.Item_Name,
            gst, // legacy Sales_Tax_
            Item_.HSNMasterId,
            Item_.HSNCODE,
            countryId,
            countryName,
            Item_.Is_Update,
            Item_.Checkbox,
            gst,
            cgst,
            sgst,
            igst,
            b2bRate,
            b2cRate
        ];

        const callNew =
            "CALL Save_Item(" +
            "@Item_Id_ :=?," +
            "@Group_Id_ :=?," +
            "@Group_Name_ :=?," +
            "@Saleunit_Id_ :=?," +
            "@Saleunit_Name_ :=?," +
            "@Item_Code_ :=?," +
            "@Item_Name_ :=?," +
            "@Sales_Tax_ :=?," +
            "@HSNMasterId_ :=?," +
            "@HSNCODE_ :=?," +
            "@Country_Id_ :=?," +
            "@Country_Name_ :=?," +
            "@Is_Update_ :=?," +
            "@Checkbox_ :=?," +
            "@gst_ :=?," +
            "@cgst_ :=?," +
            "@sgst_ :=?," +
            "@igst_ :=?," +
            "@b2b_rate_ :=?," +
            "@b2c_rate_ :=?" +
            ")";

        const tryUpdateTaxColumns = (itemId, done) => {
            const id = Number(itemId || 0);
            if (!id) return done(null);
            const q = "UPDATE Item SET Sales_Tax = ?, cgst = ?, sgst = ?, igst = ?, b2b_rate = ?, b2c_rate = ? WHERE Item_Id = ?";
            db.query(q, [gst, cgst, sgst, igst, b2bRate, b2cRate, id], (e2) => {
                if (!e2) return done(null);
                if (e2.code === 'ER_BAD_FIELD_ERROR' || e2.code === 'ER_NO_SUCH_TABLE') {
                    console.warn("Item tax column update skipped, falling back to legacy gst column:", e2.code);
                    const legacyQ = "UPDATE Item SET gst = ?, cgst = ?, sgst = ?, igst = ?, b2b_rate = ?, b2c_rate = ? WHERE Item_Id = ?";
                    return db.query(legacyQ, [gst, cgst, sgst, igst, b2bRate, b2cRate, id], (e3) => {
                        if (e3 && (e3.code === 'ER_BAD_FIELD_ERROR' || e3.code === 'ER_NO_SUCH_TABLE')) {
                            console.warn("Legacy tax column update skipped:", e3.code);
                            return done(null);
                        }
                        done(e3);
                    });
                }
                done(e2);
            });
        };

        return db.query(callNew, paramsNew, (err, rows) => {
            // Backward compatibility: older DBs still have the 14-arg Save_Item SP.
            if (err && err.code === 'ER_SP_WRONG_NO_OF_ARGS') {
                const paramsOld = [
                    Item_.Item_Id, Item_.Group_Id, Item_.Group_Name, Item_.Saleunit_Id, Item_.Saleunit_Name,
                    Item_.Item_Code, Item_.Item_Name, gst, Item_.HSNMasterId, Item_.HSNCODE,
                    countryId, countryName, Item_.Is_Update, Item_.Checkbox
                ];
                const callOld =
                    "CALL Save_Item(" +
                    "@Item_Id_ :=?," +
                    "@Group_Id_ :=?," +
                    "@Group_Name_ :=?," +
                    "@Saleunit_Id_ :=?," +
                    "@Saleunit_Name_ :=?," +
                    "@Item_Code_ :=?," +
                    "@Item_Name_ :=?," +
                    "@Sales_Tax_ :=?," +
                    "@HSNMasterId_ :=?," +
                    "@HSNCODE_ :=?," +
                    "@Country_Id_ :=?," +
                    "@Country_Name_ :=?," +
                    "@Is_Update_ :=?," +
                    "@Checkbox_ :=?" +
                    ")";
                console.warn("Save_Item SP arg mismatch; retrying with legacy params (14).");
                return db.query(callOld, paramsOld, (errOld, rowsOld) => {
                    if (errOld) return callback(errOld, rowsOld);
                    // Attempt to update new tax columns post-save (non-breaking if columns absent)
                    let newId = 0;
                    try {
                        if (rowsOld && rowsOld[0] && rowsOld[0][0] && rowsOld[0][0].Item_Id_) newId = Number(rowsOld[0][0].Item_Id_);
                        if (!newId && Item_ && Item_.Item_Id) newId = Number(Item_.Item_Id);
                    } catch (e) {}
                    return tryUpdateTaxColumns(newId, (e2) => callback(e2 || null, rowsOld));
                });
            }

            if (err) return callback(err, rows);
            // For the new SP signature, still ensure columns are updated in case SP doesn't map them yet.
            let id = 0;
            try {
                if (rows && rows[0] && rows[0][0] && rows[0][0].Item_Id_) id = Number(rows[0][0].Item_Id_);
                if (!id && Item_ && Item_.Item_Id) id = Number(Item_.Item_Id);
            } catch (e) {}
            return tryUpdateTaxColumns(id, (e2) => callback(e2 || null, rows));
        });
    },
Delete_Item:function(Item_Id_,callback)
    { 
    return db.query("CALL Delete_Item(@Item_Id_ :=?)",[Item_Id_],callback);
    },
Get_Item:function(Item_Id_,callback)
    { 
    return db.query("CALL Get_Item(@Item_Id_ :=?)",[Item_Id_],callback);
    },
HSN_Dropdown:function(callback)
    { 
    return db.query("CALL HSN_Dropdown()",[],callback);
    },

    Search_Item:function(Item_Name_,Group_Id_,Item_Code_,callback)
    { 
    if (Item_Name_==='undefined'||Item_Name_===''||Item_Name_===undefined )
    Item_Name_='';
    if (Item_Code_==='undefined'||Item_Code_===''||Item_Code_===undefined )
        Item_Code_='';

    
    console.log('ItemName2_: ', Item_Name_);
    console.log('ItemCode2_: ', Item_Code_);

    const specialCharacters = /([~@#$%^&*()_+\-=[\]\\{}|;:'",.<>?/])/g;

		if (specialCharacters.test(Item_Name_)) {
			console.log("String contains special characters.");
            Item_Name_ = Item_Name_.replace(/\\/g, '\\\\');
			// Item_Name_ = Item_Name_.replace(specialCharacters, '\\$&');
		} else {
			console.log("String does not contain special characters.");
		}
	
		console.log('Escaped Item_Name_:', Item_Name_);

        const specialCharacters1 = /([~@#$%^&*()_+\-=[\]\\{}|;:'",.<>?/])/g;


        if (specialCharacters1.test(Item_Code_)) {
            console.log("Item_Code_ contains special characters.");
            Item_Code_ = Item_Code_.replace(/\\/g, '\\\\'); // Escape backslashes
            console.log('Item_Code_: ', Item_Code_);
        } else {
            console.log("Item_Code_ does not contain special characters.");
        }
    
        console.log('Escaped Item_Code_: ', Item_Code_);
    
     return db.query("CALL Search_Item("+"@Item_Name_ :=?,"+"@Group_Id_ :=?,"+"@Item_Code_ :=?"+")",[Item_Name_,Group_Id_,Item_Code_],callback);
    },
    // Is_Date_Check_,From_Date_,To_Date_,Customer_,QuotNo_,partNo_,Item_Group_Id_,CurrencyDetails_Id_,User_Details_Id_,Account_Type_Id_

Item_Typeahead:function(Item_Name_,callback)
    { 
    if (Item_Name_ === undefined || Item_Name_ === "undefined" )
    Item_Name_='';
    return db.query("CALL Item_Typeahead(@Item_Name_ :=?)",[Item_Name_],callback);
    },

     
Save_Service_Type:function(Service_Type_,callback)
{
    console.log(Service_Type_)
    return db.query("CALL Save_Service_Type("+"@Service_Type_Id_ :=?,"+"@Service_Type_Name_ :=?,"+
        "@Hsn_Id_ :=?," + "@Hsn_Name_ :=?," + "@CGST_ :=?," + "@SGST_ :=?," + "@IGST_ :=?," +"@GST_ :=?"+")"
        , [Service_Type_.Service_Type_Id, Service_Type_.Service_Type_Name, Service_Type_.Hsn_Id, Service_Type_.Hsn_Name,
            Service_Type_.CGST,Service_Type_.SGST, Service_Type_.IGST,Service_Type_.GST],callback);
    },
Delete_Service_Type:function(Service_Type_Id_,callback)
    { 
    return db.query("CALL Delete_Service_Type(@Service_Type_Id_ :=?)",[Service_Type_Id_],callback);
    },
Get_Service_Type:function(Service_Type_Id_,callback)
    { 
    return db.query("CALL Get_Service_Type(@Service_Type_Id_ :=?)",[Service_Type_Id_],callback);
    },
Search_Service_Type:function(Service_Type_Name_,callback)
    { 
    if (Service_Type_Name_==='undefined'||Service_Type_Name_===''||Service_Type_Name_===undefined )
    Service_Type_Name_='';
     return db.query("CALL Search_Service_Type(@Service_Type_Name_ :=?)",[Service_Type_Name_],callback);
    },
Get_Multiple_Sale_Rates: function(Item_Id_, callback) {
    const query = `
        SELECT DISTINCT SaleRate, Source FROM (
            SELECT DISTINCT COALESCE(SaleRate, 0) AS SaleRate, 'Stock' AS Source
            FROM stock
            WHERE DeleteStatus = 0 AND ItemId = ? AND SaleRate > 0
            
            UNION
            
            SELECT DISTINCT COALESCE(PRD.Sale_Rate, 0) AS SaleRate, 'Price Response' AS Source
            FROM price_response_details PRD
            INNER JOIN price_response_master PRM ON PRD.Price_Response_Master_Id = PRM.Price_Response_Master_Id
            WHERE PRM.DeleteStatus = 0 AND PRD.Item_Id = ? AND PRD.Sale_Rate > 0
        ) t
        ORDER BY SaleRate ASC
    `;
    return db.query(query, [Item_Id_, Item_Id_], callback);
}
};
module.exports=Item;
