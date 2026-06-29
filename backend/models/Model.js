var db=require('../dbconnection');
var fs = require('fs');

function ensureModelTable(callback) {
    const createSql = `CREATE TABLE IF NOT EXISTS Model (
        Model_Id INT NOT NULL AUTO_INCREMENT,
        Model_Name VARCHAR(255) NOT NULL,
        Model_Code VARCHAR(255) DEFAULT NULL,
        Item_Id INT NOT NULL DEFAULT 0,
        Item_Name VARCHAR(255) DEFAULT NULL,
        PRIMARY KEY (Model_Id),
        KEY idx_Model_Name (Model_Name),
        KEY idx_Item_Id (Item_Id)
    )`;
    db.query(createSql, callback);
}

var Model=
{ 
Save_Model:function(Model_,callback)
{ 
    var modelId = Model_.Model_Id || 0;
    var modelName = Model_.Model_Name || "";
    var modelCode = Model_.Model_Code || "";
    var itemId = Model_.Item_Id || 0;
    var itemName = Model_.Item_Name || "";

    const callNew = "CALL Save_Model("+"@Model_Id_ :=?,"+"@Model_Name_ :=?,"+"@Model_Code_ :=?,"+"@Item_Id_ :=?,"+"@Item_Name_ :=?"+")";
    const insertSql = "INSERT INTO Model (Model_Id, Model_Name, Model_Code, Item_Id, Item_Name) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE Model_Name = VALUES(Model_Name), Model_Code = VALUES(Model_Code), Item_Id = VALUES(Item_Id), Item_Name = VALUES(Item_Name)";

    return ensureModelTable(function(tableErr) {
        if (tableErr) {
            return callback(tableErr);
        }

        return db.query(callNew, [modelId, modelName, modelCode, itemId, itemName], function(err, rows) {
            if (err && err.code === 'ER_SP_WRONG_NO_OF_ARGS') {
                const legacyModelCode = itemName || modelCode;
                return db.query("CALL Save_Model("+"@Model_Id_ :=?,"+"@Model_Name_ :=?,"+"@Model_Code_ :=?"+")", [modelId, modelName, legacyModelCode], callback);
            }
            if (err && (err.code === 'ER_SP_DOES_NOT_EXIST' || err.code === 'ER_NO_SUCH_TABLE' || err.code === 'ER_BAD_FIELD_ERROR')) {
                return db.query(insertSql, [modelId, modelName, modelCode, itemId, itemName], callback);
            }
            return callback(err, rows);
        });
    });
},

Search_Model:function(Model_Name_,callback)
{ 
    if (Model_Name_===undefined || Model_Name_==="undefined" )
        Model_Name_='';
    const searchValue = '%' + Model_Name_ + '%';
    const fallbackSql = "SELECT Model_Id, Model_Name, Model_Code, Item_Id, Item_Name FROM Model WHERE Model_Name LIKE ? OR Item_Name LIKE ? ORDER BY Model_Id DESC";
    return ensureModelTable(function(createErr) {
        if (createErr) {
            return callback(createErr);
        }
        return db.query("CALL Search_Model(@Model_Name_ :=?)", [Model_Name_], function(err, rows) {
            if (err && (err.code === 'ER_SP_DOES_NOT_EXIST' || err.code === 'ER_NO_SUCH_TABLE' || err.code === 'ER_BAD_FIELD_ERROR')) {
                return db.query(fallbackSql, [searchValue, searchValue], callback);
            }
            return callback(err, rows);
        });
    });
},

Delete_Model:function(Model_Id_,callback)
{
    const fallbackSql = "DELETE FROM Model WHERE Model_Id = ?";
    return db.query("CALL Delete_Model(@Model_Id_ :=?)", [Model_Id_], function(err, rows) {
        if (err && (err.code === 'ER_SP_DOES_NOT_EXIST' || err.code === 'ER_NO_SUCH_TABLE' || err.code === 'ER_BAD_FIELD_ERROR')) {
            return db.query(fallbackSql, [Model_Id_], callback);
        }
        return callback(err, rows);
    });
}

};
module.exports=Model;

