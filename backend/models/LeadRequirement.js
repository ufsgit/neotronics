const db = require('../dbconnection');

function withConnection(work, callback) {
  db.getConnection((err, connection) => {
    if (err) return callback(err);
    work(connection, (err2, result) => {
      connection.release();
      callback(err2, result);
    });
  });
}

const LeadRequirement = {
  List: function (Lead_Id, callback) {
    const leadId = Number(Lead_Id || 0);
    const sql = `
      SELECT
        LeadRequirementMaster_Id,
        Lead_Id,
        Lead_Name,
        Phone,
        Contact_Person,
        Contact_Number,
        Email,
        Address,
        Requirement_Date,
        Notes,
        Created_At
      FROM lead_requirement_master
      WHERE IFNULL(DeleteStatus, 0) = 0
        AND (? = 0 OR Lead_Id = ?)
      ORDER BY LeadRequirementMaster_Id DESC
    `;
    return db.query(sql, [leadId, leadId], (err, rows) => {
      if (err) return callback(err);
      callback(null, [rows]);
    });
  },

  Get: function (LeadRequirementMaster_Id, callback) {
    const id = Number(LeadRequirementMaster_Id || 0);
    if (!id) return callback(null, [[[]], []]);
    const sqlMaster = `
      SELECT
        LeadRequirementMaster_Id,
        Lead_Id,
        Lead_Name,
        Phone,
        Contact_Person,
        Contact_Number,
        Email,
        Address,
        Requirement_Date,
        Notes,
        Created_At
      FROM lead_requirement_master
      WHERE LeadRequirementMaster_Id = ?
        AND IFNULL(DeleteStatus, 0) = 0
      LIMIT 1
    `;
    const sqlDetails = `
      SELECT
        LeadRequirementDetail_Id,
        LeadRequirementMaster_Id,
        Item,
        Quantity,
        Remarks
      FROM lead_requirement_details
      WHERE LeadRequirementMaster_Id = ?
        AND IFNULL(DeleteStatus, 0) = 0
      ORDER BY LeadRequirementDetail_Id ASC
    `;
    db.query(sqlMaster, [id], (err, masterRows) => {
      if (err) return callback(err);
      db.query(sqlDetails, [id], (err2, detailRows) => {
        if (err2) return callback(err2);
        callback(null, [[masterRows], detailRows]);
      });
    });
  },

  Save: function (payload, callback) {
    const master = payload || {};
    const details = Array.isArray(master.Details) ? master.Details : [];

    const leadId = Number(master.Lead_Id || 0);
    if (!leadId) return callback(null, [{ LeadRequirementMaster_Id_: 0 }]);

    withConnection((connection, done) => {
      connection.beginTransaction(err => {
        if (err) return done(err);

        const sqlInsertMaster = `
          INSERT INTO lead_requirement_master
          (Lead_Id, Lead_Name, Phone, Contact_Person, Contact_Number, Email, Address, Requirement_Date, Notes, Created_At, DeleteStatus)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), 0)
        `;
        const paramsMaster = [
          leadId,
          master.Lead_Name || '',
          master.Phone || '',
          master.Contact_Person || '',
          master.Contact_Number || '',
          master.Email || '',
          master.Address || '',
          master.Requirement_Date ? new Date(master.Requirement_Date) : new Date(),
          master.Notes || ''
        ];

        connection.query(sqlInsertMaster, paramsMaster, (err2, result) => {
          if (err2) {
            return connection.rollback(() => done(err2));
          }
          const newId = result && result.insertId ? Number(result.insertId) : 0;
          if (!newId) {
            return connection.rollback(() => done(null, [{ LeadRequirementMaster_Id_: 0 }]));
          }

          if (details.length === 0) {
            return connection.commit(errCommit => {
              if (errCommit) return connection.rollback(() => done(errCommit));
              done(null, [{ LeadRequirementMaster_Id_: newId }]);
            });
          }

          const sqlInsertDetail = `
            INSERT INTO lead_requirement_details
            (LeadRequirementMaster_Id, Item, Quantity, Remarks, DeleteStatus)
            VALUES ?
          `;
          const values = details.map(d => ([
            newId,
            d.Item || '',
            Number(d.Quantity || 0),
            d.Remarks || '',
            0
          ]));

          connection.query(sqlInsertDetail, [values], (err3) => {
            if (err3) {
              return connection.rollback(() => done(err3));
            }
            connection.commit(errCommit => {
              if (errCommit) return connection.rollback(() => done(errCommit));
              done(null, [{ LeadRequirementMaster_Id_: newId }]);
            });
          });
        });
      });
    }, callback);
  }
};

module.exports = LeadRequirement;

