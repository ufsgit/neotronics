var db = require('../dbconnection');

const INDUSTRY_MASTER_NAMES = [
    'Infrastructure & System Integration',
    'Consulting & Project Management',
    'Hospital',
    'Clinic',
    'Hospitality',
    'Automotive',
    'Media & Broadcasting',
    'Corporate Enterprises',
    'Chartered Accountancy & Financial Services',
    'Education Institutions',
    'EdTech',
    'Study Abroad Services',
    'Manufacturing',
    'Retail Chains',
    'Travel Agencies',
    'Visa Services',
    'Loan & Financial Agencies',
    'Solar & Renewable Energy',
    'Real Estate'
];

function seedIndustryMaster(callback) {
    let index = 0;

    function insertNext() {
        if (index >= INDUSTRY_MASTER_NAMES.length) {
            return callback(null);
        }

        const industryName = INDUSTRY_MASTER_NAMES[index++];
        db.query(
            "INSERT INTO Vertical (Vertical_Name, Description, DeleteStatus) SELECT ?, '', 0 WHERE NOT EXISTS (SELECT 1 FROM Vertical WHERE Vertical_Name = ? AND IFNULL(DeleteStatus, 0) = 0)",
            [industryName, industryName],
            (err) => {
                if (err) return callback(err);
                insertNext();
            }
        );
    }

    insertNext();
}

var Vertical = {
    Seed_Industry_Master: seedIndustryMaster,
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
        seedIndustryMaster((seedErr) => {
            if (seedErr) return callback(seedErr);

            if (Vertical_Name_ === undefined || Vertical_Name_ === null || Vertical_Name_ === '') {
                return db.query("SELECT * FROM Vertical WHERE DeleteStatus = 0 ORDER BY Vertical_Name", callback);
            } else {
                return db.query("SELECT * FROM Vertical WHERE Vertical_Name LIKE ? AND DeleteStatus = 0 ORDER BY Vertical_Name",
                    ['%' + Vertical_Name_ + '%'], callback);
            }
        });
    },
    Delete_Vertical: function (Vertical_Id_, callback) {
        return db.query("UPDATE Vertical SET DeleteStatus = 1 WHERE Vertical_Id = ?", [Vertical_Id_], callback);
    },
    Get_Vertical: function (Vertical_Id_, callback) {
        return db.query("SELECT * FROM Vertical WHERE Vertical_Id = ?", [Vertical_Id_], callback);
    }
};

module.exports = Vertical;
