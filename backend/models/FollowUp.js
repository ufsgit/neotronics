var db = require('../dbconnection');

var FollowUp = {
    GetLeadInteractionHistory: function (Lead_Id_, offset, limit, callback) {
        return db.query("CALL GetLeadInteractionHistory(@p_Lead_Id := ?, @p_Offset := ?, @p_Limit := ?)", [Lead_Id_, offset, limit], callback);
    }
};

module.exports = FollowUp;
