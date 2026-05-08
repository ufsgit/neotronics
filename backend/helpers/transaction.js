const db = require("../dbconnection");

function normalizeParams(params) {
  if (!Array.isArray(params)) return params;
  return params.map((p) => (p === undefined ? null : p));
}

async function withTransaction(fn, { timeoutMs = 60000, log } = {}) {
  const pool = db.promise();
  const connection = await pool.getConnection();
  try {
    if (log) log.info("tx.begin");
    await connection.beginTransaction();

    const query = async (sql, params = []) => {
      const p = normalizeParams(params);
      if (log) log.debug("tx.query", { sql });
      return connection.query({ sql, timeout: timeoutMs }, p);
    };

    const result = await fn({ connection, query });

    await connection.commit();
    if (log) log.info("tx.commit");
    return result;
  } catch (err) {
    try {
      await connection.rollback();
      if (log) log.warn("tx.rollback", { code: err && err.code, message: err && err.message });
    } catch (rollbackErr) {
      if (log) log.error("tx.rollback_failed", { message: rollbackErr && rollbackErr.message });
    }
    throw err;
  } finally {
    connection.release();
    if (log) log.debug("tx.release");
  }
}

module.exports = {
  withTransaction,
  normalizeParams,
};

