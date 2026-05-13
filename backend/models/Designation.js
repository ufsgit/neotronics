var db = require('../dbconnection');

var Designation = {
    Save_Designation: function (Designation_, callback) {
        if (Designation_.Designation_Id > 0) {
            return db.query("UPDATE Designation SET Designation_Name = ?, Description = ? WHERE Designation_Id = ?",
                [Designation_.Designation_Name, Designation_.Description, Designation_.Designation_Id], callback);
        } else {
            return db.query("INSERT INTO Designation (Designation_Name, Description, DeleteStatus) VALUES (?, ?, 0)",
                [Designation_.Designation_Name, Designation_.Description], callback);
        }
    },
    Search_Designation: function (Designation_Name_, callback) {
        if (Designation_Name_ === undefined || Designation_Name_ === null || Designation_Name_ === '') {
            return db.query("SELECT * FROM Designation WHERE DeleteStatus = 0 ORDER BY Designation_Name", callback);
        } else {
            return db.query("SELECT * FROM Designation WHERE Designation_Name LIKE ? AND DeleteStatus = 0 ORDER BY Designation_Name",
                ['%' + Designation_Name_ + '%'], callback);
        }
    },
    Delete_Designation: function (Designation_Id_, callback) {
        return db.query("UPDATE Designation SET DeleteStatus = 1 WHERE Designation_Id = ?", [Designation_Id_], callback);
    },
    Get_Designation: function (Designation_Id_, callback) {
        return db.query("SELECT * FROM Designation WHERE Designation_Id = ?", [Designation_Id_], callback);
    }
};

module.exports = Designation;
