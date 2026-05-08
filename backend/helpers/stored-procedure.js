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
   * Excute and get the results
   */
  result() {
    let params = this.params;
    for (const key in params) {
      if (params[key] === undefined) {
        params[key] = null;
      }
      if (isPlainObject(params[key])) {
        params[key] = JSON.stringify(params[key]);
      }
      if (Array.isArray(params[key])) {
        if (params[key][0] && isPlainObject(params[key][0])) {
          params[key] = JSON.stringify(params[key]);
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
            res(s && s[0]);
          }
        });

        // If it returns a Promise (mysql2 promise-based), handle it
        if (queryObj && typeof queryObj.then === 'function') {
          queryObj.then((result) => {
            // mysql2 promise returns [rows, fields]
            const rows = Array.isArray(result) ? result[0] : result;
            res(rows && rows[0]);
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
