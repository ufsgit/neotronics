var db = require('../dbconnection');

var DashboardV2 = { 
    DashboardV2_PipelineTop3: function(callback) { 
        return db.query("CALL DashboardV2_PipelineTop3()", [], callback);
    },
    DashboardV2_PipelineAll: function(callback) { 
        return db.query("CALL DashboardV2_PipelineAll()", [], callback);
    },
    DashboardV2_PipelineMetrics: function(callback) { 
        return db.query("CALL DashboardV2_PipelineMetrics()", [], callback);
    },
    DashboardV2_PulseMetrics: function(callback) { 
        return db.query("CALL DashboardV2_PulseMetrics()", [], callback);
    },
    DashboardV2_SourceMetrics: function(callback) { 
        return db.query("CALL DashboardV2_SourceMetrics()", [], callback);
    }
};

module.exports = DashboardV2;
