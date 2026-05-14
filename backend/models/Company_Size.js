var db = require('../dbconnection');

var Company_Size = {
    Save_Company_Size: function (Company_Size_, callback) {
        if (Company_Size_.Company_Size_Id > 0) {
            return db.query("UPDATE Company_Size SET Company_Size_Name = ?, Description = ? WHERE Company_Size_Id = ?",
                [Company_Size_.Company_Size_Name, Company_Size_.Description, Company_Size_.Company_Size_Id], callback);
        } else {
            return db.query("INSERT INTO Company_Size (Company_Size_Name, Description, DeleteStatus) VALUES (?, ?, 0)",
                [Company_Size_.Company_Size_Name, Company_Size_.Description], callback);
        }
    },
    Search_Company_Size: function (Company_Size_Name_, callback) {
        if (Company_Size_Name_ === undefined || Company_Size_Name_ === null || Company_Size_Name_ === '') {
            return db.query("SELECT * FROM Company_Size WHERE DeleteStatus = 0 ORDER BY Company_Size_Name", callback);
        } else {
            return db.query("SELECT * FROM Company_Size WHERE Company_Size_Name LIKE ? AND DeleteStatus = 0 ORDER BY Company_Size_Name",
                ['%' + Company_Size_Name_ + '%'], callback);
        }
    },
    Delete_Company_Size: function (Company_Size_Id_, callback) {
        return db.query("UPDATE Company_Size SET DeleteStatus = 1 WHERE Company_Size_Id = ?", [Company_Size_Id_], callback);
    },
    Get_Company_Size: function (Company_Size_Id_, callback) {
        return db.query("SELECT * FROM Company_Size WHERE Company_Size_Id = ?", [Company_Size_Id_], callback);
    },
    Get_All_Company_Sizes: function (callback) {
        return db.query("SELECT Company_Size_Id, Company_Size_Name FROM Company_Size WHERE DeleteStatus = 0 ORDER BY Company_Size_Name", callback);
    }
};

module.exports = Company_Size;
