var db = require('../dbconnection');

var Price_Response = {
    Save_Price_Response: function (Price_Response_Master_, callback) {
        return db.query("CALL Save_Price_Response(?,?,?,?,?,?,?,?,?,?,?)", [
            Price_Response_Master_.Price_Response_Master_Id || 0,
            Price_Response_Master_.Price_Response_No || '',
            Price_Response_Master_.EntryDate,
            Price_Response_Master_.Supplier_Id || 0,
            Price_Response_Master_.Response_No || '',
            Price_Response_Master_.Reference_No || '',
            Price_Response_Master_.Currency_Id || 0,
            Price_Response_Master_.Total_Amount || 0,
            Price_Response_Master_.Vat_Amount || 0,
            Price_Response_Master_.Net_Amount || 0,
            JSON.stringify(Price_Response_Master_.Price_Response_Details)
        ], callback);
    },
    Search_Price_Response: function (Look_In_Date, From_Date, To_Date, Supplier_Id, Price_RequestNo, callback) {
        return db.query("CALL Search_Price_Response(?,?,?,?,?)", [Look_In_Date, From_Date, To_Date, Supplier_Id || 0, Price_RequestNo || ''], callback);
    },
    Get_Price_Response: function (Price_Response_Master_Id, callback) {
        return db.query("CALL Get_Price_Response(?)", [Price_Response_Master_Id], callback);
    },
    Delete_Price_Response: function (Price_Response_Master_Id, callback) {
        return db.query("CALL Delete_Price_Response(?)", [Price_Response_Master_Id], callback);
    },
    Get_Next_Price_Response_No: function (EntryDate_, callback) {
        return db.query("CALL Get_Next_Price_Response_No(?)", [EntryDate_], callback);
    }
};

module.exports = Price_Response;
