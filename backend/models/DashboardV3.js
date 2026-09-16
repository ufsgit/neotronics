var db = require('../dbconnection');

var DashboardV3 = { 
    getDashboardV3Data: function(callback) { 
        return db.query("SELECT 1", [], callback);
    }
};

module.exports = DashboardV3;
