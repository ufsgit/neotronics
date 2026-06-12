var db = require('../dbconnection');

function numberOrZero(value) {
    var numberValue = Number(value);
    return Number.isFinite(numberValue) ? numberValue : 0;
}

function textOrEmpty(value) {
    return value === undefined || value === null ? '' : value;
}

var Price_Response = {
    Save_Price_Response: function (Price_Response_Master_, callback) {
        db.getConnection(function (connectionError, connection) {
            if (connectionError) return callback(connectionError);

            connection.beginTransaction(function (transactionError) {
                if (transactionError) {
                    connection.release();
                    return callback(transactionError);
                }

                var masterId = numberOrZero(Price_Response_Master_.Price_Response_Master_Id);
                var masterValues = [
                    textOrEmpty(Price_Response_Master_.Price_Response_No),
                    Price_Response_Master_.EntryDate,
                    numberOrZero(Price_Response_Master_.Supplier_Id),
                    textOrEmpty(Price_Response_Master_.Response_No),
                    textOrEmpty(Price_Response_Master_.Reference_No),
                    numberOrZero(Price_Response_Master_.Currency_Id),
                    numberOrZero(Price_Response_Master_.Total_Amount),
                    numberOrZero(Price_Response_Master_.Vat_Amount),
                    numberOrZero(Price_Response_Master_.Net_Amount),
                    textOrEmpty(Price_Response_Master_.Description1),
                    numberOrZero(Price_Response_Master_.Payment_Term_Description)
                ];

                var saveDetails = function (savedMasterId) {
                    var details = Array.isArray(Price_Response_Master_.Price_Response_Details)
                        ? Price_Response_Master_.Price_Response_Details
                        : [];

                    var detailValues = details.map(function (item) {
                        return [
                            savedMasterId,
                            numberOrZero(item.Item_Id || item.ItemId),
                            textOrEmpty(item.Item_Name || item.ItemName),
                            textOrEmpty(item.Part_No || item.Item_Code),
                            textOrEmpty(item.Description),
                            numberOrZero(item.Brand_Id),
                            textOrEmpty(item.Brand_Name || item.Brand),
                            numberOrZero(item.Quantity),
                            numberOrZero(item.Supplier_Price || item.UnitPrice),
                            numberOrZero(item.Profit_Percentage || item.Profit),
                            numberOrZero(item.Profit_Amount),
                            numberOrZero(item.Sale_Rate || item.SaleRate),
                            numberOrZero(item.Total_Amount || item.Amount)
                        ];
                    });

                    if (detailValues.length === 0) {
                        return connection.commit(function (commitError) {
                            connection.release();
                            if (commitError) return callback(commitError);
                            callback(null, [[{ Price_Response_Master_Id_: savedMasterId }]]);
                        });
                    }

                    connection.query(
                        `INSERT INTO price_response_details
                        (Price_Response_Master_Id, Item_Id, Item_Name, Part_No, Description, Brand_Id, Brand_Name, Quantity, Supplier_Price, Profit_Percentage, Profit_Amount, Sale_Rate, Total_Amount)
                        VALUES ?`,
                        [detailValues],
                        function (detailsError) {
                            if (detailsError) {
                                return connection.rollback(function () {
                                    connection.release();
                                    callback(detailsError);
                                });
                            }

                            connection.commit(function (commitError) {
                                connection.release();
                                if (commitError) return callback(commitError);
                                callback(null, [[{ Price_Response_Master_Id_: savedMasterId }]]);
                            });
                        }
                    );
                };

                if (masterId > 0) {
                    connection.query(
                        `UPDATE price_response_master SET
                        Price_Response_No = ?, EntryDate = ?, Supplier_Id = ?, Response_No = ?, Reference_No = ?,
                        Currency_Id = ?, Total_Amount = ?, Vat_Amount = ?, Net_Amount = ?, Description1 = ?, Payment_Term_Description = ?
                        WHERE Price_Response_Master_Id = ?`,
                        masterValues.concat([masterId]),
                        function (masterError) {
                            if (masterError) {
                                return connection.rollback(function () {
                                    connection.release();
                                    callback(masterError);
                                });
                            }

                            connection.query(
                                'DELETE FROM price_response_details WHERE Price_Response_Master_Id = ?',
                                [masterId],
                                function (deleteError) {
                                    if (deleteError) {
                                        return connection.rollback(function () {
                                            connection.release();
                                            callback(deleteError);
                                        });
                                    }
                                    saveDetails(masterId);
                                }
                            );
                        }
                    );
                    return;
                }

                connection.query(
                    `INSERT INTO price_response_master
                    (Price_Response_No, EntryDate, Supplier_Id, Response_No, Reference_No, Currency_Id, Total_Amount, Vat_Amount, Net_Amount, Description1, Payment_Term_Description)
                    VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
                    masterValues,
                    function (masterError, result) {
                        if (masterError) {
                            return connection.rollback(function () {
                                connection.release();
                                callback(masterError);
                            });
                        }
                        saveDetails(result.insertId);
                    }
                );
            });
        });
    },
    Search_Price_Response: function (Look_In_Date, From_Date, To_Date, Supplier_Id, Price_RequestNo, callback) {
        return db.query("CALL Search_Price_Response(?,?,?,?,?)", [Look_In_Date, From_Date, To_Date, Supplier_Id || 0, Price_RequestNo || ''], callback);
    },
    Get_Price_Response: function (Price_Response_Master_Id, callback) {
        return db.query("CALL Get_Price_Response(?)", [Price_Response_Master_Id], callback);
    },
    Delete_Price_Response: function (Price_Response_Master_Id, callback) {
        return db.query("CALL Delete_Price_Response(?)", [Price_Response_Master_Id], callback);
    },
    Get_Next_Price_Response_No: function (EntryDate_, callback) {
        return db.query("CALL Get_Next_Price_Response_No(?)", [EntryDate_], callback);
    }
};

module.exports = Price_Response;
