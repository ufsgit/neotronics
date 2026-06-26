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
        const verticalId = Number(Vertical_.Vertical_Id || 0);
        const verticalName = (Vertical_.Vertical_Name || '').trim();
        const description = Vertical_.Description || '';

        if (!verticalName) {
            return callback(null, [{ Vertical_Id_: 0, Message: 'Industry name is required' }]);
        }

        db.query(
            "SELECT Vertical_Id FROM Vertical WHERE Vertical_Name = ? AND IFNULL(DeleteStatus, 0) = 0 AND Vertical_Id <> ? LIMIT 1",
            [verticalName, verticalId],
            (dupErr, dupRows) => {
                if (dupErr) return callback(dupErr);
                if (dupRows && dupRows.length > 0) {
                    return callback(null, [{ Vertical_Id_: -1, Message: 'Industry already exists' }]);
                }

                if (verticalId > 0) {
                    return db.query(
                        "UPDATE Vertical SET Vertical_Name = ?, Description = ?, DeleteStatus = 0 WHERE Vertical_Id = ?",
                        [verticalName, description, verticalId],
                        (err) => {
                            if (err) return callback(err);
                            callback(null, [{ Vertical_Id_: verticalId }]);
                        }
                    );
                }

                return db.query(
                    "INSERT INTO Vertical (Vertical_Name, Description, DeleteStatus) VALUES (?, ?, 0)",
                    [verticalName, description],
                    (err, rows) => {
                        if (err) return callback(err);
                        callback(null, [{ Vertical_Id_: rows.insertId || 0 }]);
                    }
                );
            }
        );
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
    },
    Get_All_Industries: function (callback) {
        seedIndustryMaster((seedErr) => {
            if (seedErr) return callback(seedErr);
            return db.query("SELECT Vertical_Id, Vertical_Name, Description FROM Vertical WHERE DeleteStatus = 0 ORDER BY Vertical_Name", callback);
        });
    }
};

module.exports = Vertical;
