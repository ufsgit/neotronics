var db = require('../dbconnection');

function ensureTermsTable(callback) {
    const createSql = `CREATE TABLE IF NOT EXISTS TermsAndCondition (
        Terms_Condition_Id INT NOT NULL AUTO_INCREMENT,
        Terms_Condition TEXT,
        Terms_Condition_Description TEXT,
        Terms_Condition_Caption VARCHAR(255) NOT NULL,
        PRIMARY KEY (Terms_Condition_Id),
        KEY idx_Terms_Caption (Terms_Condition_Caption)
    )`;
    db.query(createSql, function(err) {
        if (err) return callback(err);
        // Migrate old columns if table existed with old schema
        db.query("ALTER TABLE TermsAndCondition ADD COLUMN IF NOT EXISTS Terms_Condition TEXT NULL", [], function() {
        db.query("ALTER TABLE TermsAndCondition ADD COLUMN IF NOT EXISTS Terms_Condition_Description TEXT NULL", [], function() {
        db.query("ALTER TABLE TermsAndCondition ADD COLUMN IF NOT EXISTS Terms_Condition_Caption VARCHAR(255) NULL", [], function() {
            callback(null);
        });
        });
        });
    });
}

var TermsAndCondition = {
    Save_TermsAndCondition: function (Term_, callback) {
        var termId = Term_.Term_Id && Number(Term_.Term_Id) > 0 ? Number(Term_.Term_Id) : null;
        var caption = Term_.Caption || '';
        var termsText = Term_.Terms_Text || '';
        var description = Term_.Description || '';

        return ensureTermsTable(function (err) {
            if (err) return callback(err);
            const sql = "INSERT INTO TermsAndCondition (Terms_Condition_Id, Terms_Condition, Terms_Condition_Description, Terms_Condition_Caption) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE Terms_Condition = VALUES(Terms_Condition), Terms_Condition_Description = VALUES(Terms_Condition_Description), Terms_Condition_Caption = VALUES(Terms_Condition_Caption)";
            return db.query(sql, [termId, termsText, description, caption], function(err, result) {
                if (err) return callback(err);
                var insertId = result ? (result.insertId || termId || 1) : 1;
                callback(null, [[{ Term_Id_: insertId }]]);
            });
        });
    },

    Search_TermsAndCondition: function (Caption_, callback) {
        if (Caption_ === undefined || Caption_ === 'undefined')
            Caption_ = '';
        const searchValue = '%' + Caption_ + '%';
        return ensureTermsTable(function(err) {
            if (err) return callback(err);
            const sql = "SELECT Terms_Condition_Id as Term_Id, Terms_Condition_Caption as Caption, Terms_Condition as Terms_Text, Terms_Condition_Description as Description FROM TermsAndCondition WHERE Terms_Condition_Caption LIKE ? OR Terms_Condition LIKE ? ORDER BY Terms_Condition_Id DESC";
            return db.query(sql, [searchValue, searchValue], function (err, rows) {
                if (err) return callback(err);
                callback(null, rows);
            });
        });
    }
};

module.exports = TermsAndCondition;
