var db = require('../dbconnection');

function ensureTermsTable(callback) {
    const createSql = `CREATE TABLE IF NOT EXISTS TermsAndCondition (
        Term_Id INT NOT NULL AUTO_INCREMENT,
        Caption VARCHAR(255) NOT NULL,
        Terms_Text TEXT,
        Description TEXT,
        PRIMARY KEY (Term_Id),
        KEY idx_Terms_Caption (Caption)
    )`;
    db.query(createSql, function(err) {
        if (err) return callback(err);
        callback(null);
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
            const sql = "INSERT INTO TermsAndCondition (Term_Id, Caption, Terms_Text, Description) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE Caption = VALUES(Caption), Terms_Text = VALUES(Terms_Text), Description = VALUES(Description)";
            return db.query(sql, [termId, caption, termsText, description], function(err, result) {
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
            const sql = "SELECT Term_Id, Caption, Terms_Text, Description FROM TermsAndCondition WHERE Caption LIKE ? OR Terms_Text LIKE ? ORDER BY Term_Id DESC";
            return db.query(sql, [searchValue, searchValue], function (err, rows) {
                if (err) return callback(err);
                callback(null, rows);
            });
        });
    }
};

module.exports = TermsAndCondition;
