var db = require('../../../dbconnection');

var PipelineStage = {

    Save_Pipeline_Stage: function (body, callback) {
        var id               = Number(body.PipelineStage_Id || body.Pipeline_Stage_Id || body.id || 0);
        var name             = (body.PipelineStage_Name || body.Pipeline_Stage_Name || body.name || '').trim();
        var stageType        = Number(body.Stage_Type || 1);
        var followupRequired = body.Followup_Required !== undefined ? Number(body.Followup_Required) : 1;
        var color            = body.Color || null;

        // Try calling stored procedure with 5 params; fallback to direct SQL if SP not updated
        db.query(
            'CALL LC_PipelineStage_Save(?, ?, ?, ?, ?)',
            [id || null, name, stageType, followupRequired, color],
            function (err, rows) {
                if (!err) return callback(null, rows);

                // Fallback to direct SQL if stored procedure signature has not been updated
                console.warn('LC_PipelineStage_Save SP error, falling back to direct SQL:', err.message);
                if (id) {
                    db.query(
                        'UPDATE pipeline_stage_master SET PipelineStage_Name = ?, Stage_Type = ?, Followup_Required = ?, Color = ? WHERE PipelineStage_Id = ?',
                        [name, stageType, followupRequired, color, id],
                        function (err2, result) {
                            if (err2) {
                                // If columns don't exist yet, fallback to updating Name only
                                return db.query(
                                    'UPDATE pipeline_stage_master SET PipelineStage_Name = ? WHERE PipelineStage_Id = ?',
                                    [name, id],
                                    function (err3) {
                                        if (err3) return callback(err3);
                                        callback(null, [[{ Id: id, Message: 'Updated' }]]);
                                    }
                                );
                            }
                            callback(null, [[{ Id: id, Message: 'Updated' }]]);
                        }
                    );
                } else {
                    db.query(
                        'INSERT INTO pipeline_stage_master (PipelineStage_Name, Stage_Type, Followup_Required, Color, DeleteStatus) VALUES (?, ?, ?, ?, 0)',
                        [name, stageType, followupRequired, color],
                        function (err2, result) {
                            if (err2) {
                                // If columns don't exist yet, fallback to inserting Name only
                                return db.query(
                                    'INSERT INTO pipeline_stage_master (PipelineStage_Name, DeleteStatus) VALUES (?, 0)',
                                    [name],
                                    function (err3, res3) {
                                        if (err3) return callback(err3);
                                        callback(null, [[{ Id: res3.insertId, Message: 'Saved' }]]);
                                    }
                                );
                            }
                            callback(null, [[{ Id: result.insertId, Message: 'Saved' }]]);
                        }
                    );
                }
            }
        );
    },

    Search_Pipeline_Stage: function (search, callback) {
        db.query(
            'CALL LC_PipelineStage_Search(?)',
            [search || null],
            function (err, rows) {
                if (!err) return callback(null, rows);

                // Fallback to direct SQL
                console.warn('LC_PipelineStage_Search SP error, falling back to direct SQL:', err.message);
                var sql = 'SELECT PipelineStage_Id, PipelineStage_Name, Stage_Type, Followup_Required, Color FROM pipeline_stage_master WHERE IFNULL(DeleteStatus, 0) = 0';
                var params = [];
                if (search && search.trim()) {
                    sql += ' AND PipelineStage_Name LIKE ?';
                    params.push('%' + search.trim() + '%');
                }
                sql += ' ORDER BY PipelineStage_Name ASC';

                db.query(sql, params, function (err2, res2) {
                    if (err2) {
                        var fallbackSql = 'SELECT PipelineStage_Id, PipelineStage_Name FROM pipeline_stage_master WHERE IFNULL(DeleteStatus, 0) = 0';
                        if (search && search.trim()) {
                            fallbackSql += ' AND PipelineStage_Name LIKE ?';
                        }
                        fallbackSql += ' ORDER BY PipelineStage_Name ASC';
                        return db.query(fallbackSql, params, function (err3, res3) {
                            if (err3) return callback(err3);
                            callback(null, [res3]);
                        });
                    }
                    callback(null, [res2]);
                });
            }
        );
    },

    Get_Pipeline_Stage: function (id, callback) {
        db.query(
            'CALL LC_PipelineStage_Get(?)',
            [id],
            function (err, rows) {
                if (!err) return callback(null, rows);

                db.query(
                    'SELECT PipelineStage_Id, PipelineStage_Name, Stage_Type, Followup_Required, Color FROM pipeline_stage_master WHERE PipelineStage_Id = ? AND IFNULL(DeleteStatus, 0) = 0',
                    [id],
                    function (err2, res2) {
                        if (err2) return callback(err2);
                        callback(null, [res2]);
                    }
                );
            }
        );
    },

    Delete_Pipeline_Stage: function (id, callback) {
        db.query(
            'CALL LC_PipelineStage_Delete(?)',
            [id],
            function (err, rows) {
                if (!err) return callback(null, rows);

                db.query(
                    'UPDATE pipeline_stage_master SET DeleteStatus = 1 WHERE PipelineStage_Id = ?',
                    [id],
                    function (err2) {
                        if (err2) return callback(err2);
                        callback(null, [[{ Pipeline_Stage_Id_: id, Message: 'Deleted Successfully' }]]);
                    }
                );
            }
        );
    }
};

module.exports = PipelineStage;
