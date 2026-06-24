/**
 * Call a stored procedure using Sequelize query method
 * @author Rahul om <rahulom666@gmail.com>
 */

const db = require("../dbconnection");

function isPlainObject(value) {
  if (value === null || typeof value !== "object") return false;
  if (Array.isArray(value)) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

class StoredProcedure {
  constructor(name, params, db1, options) {
    this.db = db1;
    this.name = name;
    this.params = params;
    this.options = options || {};
    this.buildQuery();

  }

  /**
   * Build the Stored procedure query
   */
  buildQuery() {
    this.query = `call ${this.name} (`;
    for (let i = 1; i <= this.params.length; i++) {
      this.query += `?`;
      if (this.params.length != i) {
        this.query += ",";
      }
    }
    this.query += ")";
  }

  /**
   * Execute and get the results
   */
  result() {
    let params = this.params;
    for (let i = 0; i < params.length; i++) {
      if (params[i] === undefined) {
        params[i] = null;
      }
      if (isPlainObject(params[i])) {
        params[i] = JSON.stringify(params[i]);
      }
      if (Array.isArray(params[i])) {
        if (params[i][0] && isPlainObject(params[i][0])) {
          params[i] = JSON.stringify(params[i]);
        }
      }
    }

    return new Promise((res, rej) => {
      const dbCall = this.db ? this.db : db;
      const timeout = Number(process.env.DB_QUERY_TIMEOUT_MS || this.options.timeoutMs || 60000);
      
      try {
        // Try calling with callback (for regular pool/connection)
        const queryObj = dbCall.query({ sql: this.query, timeout }, params, (er, s) => {
          // If this is a promise connection, this callback might never be called.
          if (er) {
            rej(er);
          } else {
            // For standard callback, s is already the results (array of result sets)
            // For CALL, s[0] is usually the first result set (array of rows)
            res(s && s[0]);
          }
        });

        // If it returns a Promise (mysql2 promise-based), handle it
        if (queryObj && typeof queryObj.then === 'function') {
          queryObj.then((result) => {
            // mysql2 promise returns [result, fields]
            // For CALL, result is [ [rows], {metadata} ]
            let finalResult = Array.isArray(result) ? result[0] : result;
            if (Array.isArray(finalResult) && Array.isArray(finalResult[0])) {
               // This is a CALL result, return the first result set (array of rows)
               res(finalResult[0]);
            } else {
               res(finalResult);
            }
          }).catch((err) => {
            rej(err);
          });
        }
      } catch (err) {
        rej(err);
      }
    });
  }
}
StoredProcedure.isPlainObject = isPlainObject;
module.exports = StoredProcedure;
