var db = require('../dbconnection');

var Vertical = {
    Save_Vertical: function (Vertical_, callback) {
        if (Vertical_.Vertical_Id > 0) {
            return db.query("UPDATE Vertical SET Vertical_Name = ?, Description = ? WHERE Vertical_Id = ?",
                [Vertical_.Vertical_Name, Vertical_.Description, Vertical_.Vertical_Id], callback);
        } else {
            return db.query("INSERT INTO Vertical (Vertical_Name, Description, DeleteStatus) VALUES (?, ?, 0)",
                [Vertical_.Vertical_Name, Vertical_.Description], callback);
        }
    },
    Search_Vertical: function (Vertical_Name_, callback) {
        if (Vertical_Name_ === undefined || Vertical_Name_ === null || Vertical_Name_ === '') {
            return db.query("SELECT * FROM Vertical WHERE DeleteStatus = 0 ORDER BY Vertical_Name", callback);
        } else {
            return db.query("SELECT * FROM Vertical WHERE Vertical_Name LIKE ? AND DeleteStatus = 0 ORDER BY Vertical_Name",
                ['%' + Vertical_Name_ + '%'], callback);
        }
    },
    Delete_Vertical: function (Vertical_Id_, callback) {
        return db.query("UPDATE Vertical SET DeleteStatus = 1 WHERE Vertical_Id = ?", [Vertical_Id_], callback);
    },
    Get_Vertical: function (Vertical_Id_, callback) {
        return db.query("SELECT * FROM Vertical WHERE Vertical_Id = ?", [Vertical_Id_], callback);
    }
};

module.exports = Vertical;
