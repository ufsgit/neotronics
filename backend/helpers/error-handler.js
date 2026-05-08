const { sendFailure } = require("./api-response");

module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    // If response already started, delegate to default Express handler
    if (res.headersSent) return next(err);

    const log = req && req.log ? req.log : null;
    const message = (err && err.message) ? err.message : (typeof err === "string" ? err : "Unknown error");

    if (log) {
        log.error("api.error", {
            name: err && err.name,
            code: err && err.code,
            errno: err && err.errno,
            sqlState: err && err.sqlState,
            message,
        });
    }

    // custom application error
    if (typeof err === "string") {
        return sendFailure(res, { status: 400, message: err, data: [] });
    }

    // jwt authentication error
    if (err && err.name === "UnauthorizedError") {
        return sendFailure(res, { status: 401, message: "Invalid Token", data: [] });
    }

    // MySQL / MySQL2 common codes
    const mysqlCode = err && err.code;
    if (mysqlCode === "ER_BAD_FIELD_ERROR" || mysqlCode === "ER_PARSE_ERROR" || mysqlCode === "ER_TRUNCATED_WRONG_VALUE") {
        return sendFailure(res, {
            status: 400,
            message: message,
            data: [{
                code: mysqlCode,
                sqlMessage: err && err.sqlMessage,
            }],
        });
    }

    if (mysqlCode === "ER_LOCK_DEADLOCK" || mysqlCode === "ER_LOCK_WAIT_TIMEOUT") {
        return sendFailure(res, {
            status: 409,
            message: "Database concurrency error. Please retry.",
            data: [{
                code: mysqlCode,
                sqlMessage: err && err.sqlMessage,
            }],
        });
    }

    // default to 500 server error
    return sendFailure(res, {
        status: 500,
        message,
        data: [{
            code: mysqlCode,
        }],
    });
}
