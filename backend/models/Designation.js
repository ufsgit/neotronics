var db = require('../dbconnection');

const DESIGNATION_MASTER_NAMES = [
    'Sales & Business Development',
    'Sales Person',
    'Sales Manager',
    'BDA',
    'BDE',
    'Business Development Manager',
    'Revenue Manager',
    'C-Level',
    'Owner',
    'CEO',
    'Chairman',
    'Director',
    'Managing Director',
    'Founder',
    'Partner',
    'Technology & IT',
    'IT Manager',
    'IT Head',
    'CTO',
    'System Administrator',
    'Network Administrator',
    'Technical Consultant',
    'Operations',
    'Operations Manager',
    'Operations Head',
    'Branch Manager',
    'General Manager',
    'Marketing',
    'Marketing Manager',
    'Marketing Head',
    'Digital Marketing Manager',
    'Growth Manager',
    'Consulting & Advisory',
    'Consultant',
    'Government Consultant',
    'Project Consultant',
    'ELV Consultant',
    'MEP Consultant',
    'PMC',
    'Architect',
    'Principal Architect',
    'Project & Execution',
    'Project Manager',
    'Project Head',
    'Implementation Manager',
    'Site Engineer'
];

function seedDesignationMaster(callback) {
    let index = 0;

    function insertNext() {
        if (index >= DESIGNATION_MASTER_NAMES.length) {
            return callback(null);
        }

        const designationName = DESIGNATION_MASTER_NAMES[index++];
        db.query(
            "INSERT INTO Designation (Designation_Name, Description, DeleteStatus) SELECT ?, '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = ? AND IFNULL(DeleteStatus, 0) = 0)",
            [designationName, designationName],
            (err) => {
                if (err) return callback(err);
                insertNext();
            }
        );
    }

    insertNext();
}

var Designation = {
    Seed_Designation_Master: seedDesignationMaster,
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
        seedDesignationMaster((seedErr) => {
            if (seedErr) return callback(seedErr);

            if (Designation_Name_ === undefined || Designation_Name_ === null || Designation_Name_ === '') {
                return db.query("SELECT * FROM Designation WHERE DeleteStatus = 0 ORDER BY Designation_Name", callback);
            } else {
                return db.query("SELECT * FROM Designation WHERE Designation_Name LIKE ? AND DeleteStatus = 0 ORDER BY Designation_Name",
                    ['%' + Designation_Name_ + '%'], callback);
            }
        });
    },
    Delete_Designation: function (Designation_Id_, callback) {
        return db.query("UPDATE Designation SET DeleteStatus = 1 WHERE Designation_Id = ?", [Designation_Id_], callback);
    },
    Get_Designation: function (Designation_Id_, callback) {
        return db.query("SELECT * FROM Designation WHERE Designation_Id = ?", [Designation_Id_], callback);
    }
};

module.exports = Designation;
