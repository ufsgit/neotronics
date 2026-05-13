var db = require('../dbconnection');

var User_Role = {
    Save_User_Role: function (User_Role_, callback) {
        if (User_Role_.User_Role_Id > 0) {
            return db.query(
                "UPDATE User_Role SET User_Role_Name = ?, User_Type_Id = ?, Working_Status_Id = ? WHERE User_Role_Id = ?",
                [User_Role_.User_Role_Name, User_Role_.User_Type_Id, User_Role_.Working_Status_Id, User_Role_.User_Role_Id],
                callback
            );
        } else {
            return db.query(
                "INSERT INTO User_Role (User_Role_Name, User_Type_Id, Working_Status_Id, DeleteStatus) VALUES (?, ?, ?, 0)",
                [User_Role_.User_Role_Name, User_Role_.User_Type_Id, User_Role_.Working_Status_Id],
                callback
            );
        }
    },

    Search_User_Role: function (User_Role_Name_, callback) {
        if (User_Role_Name_ === undefined || User_Role_Name_ === null || User_Role_Name_ === '') {
            return db.query("SELECT * FROM User_Role WHERE DeleteStatus = 0 ORDER BY User_Role_Name", callback);
        } else {
            return db.query(
                "SELECT * FROM User_Role WHERE User_Role_Name LIKE ? AND DeleteStatus = 0 ORDER BY User_Role_Name",
                ['%' + User_Role_Name_ + '%'],
                callback
            );
        }
    },

    Delete_User_Role: function (User_Role_Id_, callback) {
        return db.query(
            "UPDATE User_Role SET DeleteStatus = 1 WHERE User_Role_Id = ?",
            [User_Role_Id_],
            callback
        );
    }
};

module.exports = User_Role;