var db = require('../dbconnection');

var requirementworkflow = {
  List: function (status, callback) {
    const s = (status || 'all').toLowerCase();
    let where = "IFNULL(DeleteStatus,0)=0";
    if (s === 'price_request_pending') {
      where += " AND IFNULL(price_request_status,0)=1 AND IFNULL(quotation_status,0)=0";
    } else if (s === 'quotation_pending') {
      where += " AND IFNULL(quotation_status,0)=1";
    }

    const sql = `
      SELECT
        RequirementMaster_Id,
        RequirementNo,
        EntryDate,
        NetTotal,
        Account_Party_Id,
        price_request_status,
        quotation_master_id,
        quotation_status
      FROM requirementmaster
      WHERE ${where}
      ORDER BY RequirementMaster_Id DESC
    `;

    return db.query(sql, [], (err, rows) => {
      if (err) return callback(err);
      callback(null, [rows]);
    });
  },

  InitiatePriceRequest: function (RequirementMaster_Id, callback) {
    const id = Number(RequirementMaster_Id || 0);
    if (!id) return callback(null, [{ ok: 0 }]);
    const sql = "UPDATE requirementmaster SET price_request_status = 1 WHERE RequirementMaster_Id = ?";
    return db.query(sql, [id], (err, result) => {
      if (err) return callback(err);
      callback(null, [{ ok: 1 }]);
    });
  },

  LinkQuotation: function (RequirementMaster_Id, SalesQuotationMaster_Id, callback) {
    const rid = Number(RequirementMaster_Id || 0);
    const qid = Number(SalesQuotationMaster_Id || 0);
    if (!rid || !qid) return callback(null, [{ ok: 0 }]);
    
    // 1. Update status on requirementmaster
    const sql1 = "UPDATE requirementmaster SET quotation_master_id = ?, quotation_status = 1, price_request_status = 2 WHERE RequirementMaster_Id = ?";
    db.query(sql1, [qid, rid], (err, result) => {
      if (err) return callback(err);
      
      // 2. Insert into mapping table
      const sql2 = "INSERT INTO Reference_Quotation (ReferenceID, QuotationID) VALUES (?, ?)";
      db.query(sql2, [rid, qid], (err2, result2) => {
        if (err2) return callback(err2);
        callback(null, [{ ok: 1 }]);
      });
    });
  },

  LinkPriceRequest: function (RequirementMaster_Id, PriceRequestMaster_Id, callback) {
    const rid = Number(RequirementMaster_Id || 0);
    const pid = Number(PriceRequestMaster_Id || 0);
    if (!rid || !pid) return callback(null, [{ ok: 0 }]);
    
    const sql1 = "UPDATE requirementmaster SET price_request_status = 1 WHERE RequirementMaster_Id = ?";
    db.query(sql1, [rid], (err, result) => {
      if (err) return callback(err);
      
      const sql2 = "INSERT INTO Price_Request_Reference (ReferenceID, RequestID) VALUES (?, ?)";
      db.query(sql2, [rid, pid], (err2, result2) => {
        if (err2) return callback(err2);
        callback(null, [{ ok: 1 }]);
      });
    });
  }
};

module.exports = requirementworkflow;

