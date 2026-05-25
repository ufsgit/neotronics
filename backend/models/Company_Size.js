var db = require('../dbconnection');

const COMPANY_SIZE_MASTER_VALUES = [
    { name: 'Micro Company', range: '2 - 10' },
    { name: 'Very Small Business', range: '11 - 25' },
    { name: 'Small Business', range: '26 - 50' },
    { name: 'Lower SMB', range: '51 - 100' },
    { name: 'Upper SMB', range: '101 - 250' },
    { name: 'Mid-Market', range: '251 - 500' },
    { name: 'Large Mid-Market', range: '501 - 1000' },
    { name: 'Enterprise', range: '1001 - 5000' },
    { name: 'Large Enterprise', range: '5000 - 10000' },
    { name: 'Global Enterprise', range: '10000+' }
];

function seedCompanySizeMaster(callback) {
    let index = 0;

    function insertNext() {
        if (index >= COMPANY_SIZE_MASTER_VALUES.length) {
            return callback(null);
        }

        const companySize = COMPANY_SIZE_MASTER_VALUES[index++];
        db.query(
            "INSERT INTO Company_Size (Company_Size_Name, Description, DeleteStatus) SELECT ?, ?, 0 WHERE NOT EXISTS (SELECT 1 FROM Company_Size WHERE Company_Size_Name = ? AND IFNULL(DeleteStatus, 0) = 0)",
            [companySize.name, companySize.range, companySize.name],
            (err) => {
                if (err) return callback(err);
                insertNext();
            }
        );
    }

    insertNext();
}

var Company_Size = {
    Seed_Company_Size_Master: seedCompanySizeMaster,
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
        seedCompanySizeMaster((seedErr) => {
            if (seedErr) return callback(seedErr);

            if (Company_Size_Name_ === undefined || Company_Size_Name_ === null || Company_Size_Name_ === '') {
                return db.query("SELECT * FROM Company_Size WHERE DeleteStatus = 0 ORDER BY Company_Size_Name", callback);
            } else {
                return db.query("SELECT * FROM Company_Size WHERE Company_Size_Name LIKE ? AND DeleteStatus = 0 ORDER BY Company_Size_Name",
                    ['%' + Company_Size_Name_ + '%'], callback);
            }
        });
    },
    Delete_Company_Size: function (Company_Size_Id_, callback) {
        return db.query("UPDATE Company_Size SET DeleteStatus = 1 WHERE Company_Size_Id = ?", [Company_Size_Id_], callback);
    },
    Get_Company_Size: function (Company_Size_Id_, callback) {
        return db.query("SELECT * FROM Company_Size WHERE Company_Size_Id = ?", [Company_Size_Id_], callback);
    },
    Get_All_Company_Sizes: function (callback) {
        seedCompanySizeMaster((seedErr) => {
            if (seedErr) return callback(seedErr);
            return db.query("SELECT Company_Size_Id, Company_Size_Name, Description FROM Company_Size WHERE DeleteStatus = 0 ORDER BY Company_Size_Name", callback);
        });
    }
};

module.exports = Company_Size;
