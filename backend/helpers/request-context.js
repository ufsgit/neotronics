const crypto = require("crypto");
const uuid = require("uuid");
const { child } = require("./logger");

module.exports = function requestContext({ timeoutMs = 60000 } = {}) {
  return function requestContextMiddleware(req, res, next) {
    const requestId =
      req.headers["x-request-id"] ||
      (typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : (typeof uuid.v4 === "function" ? uuid.v4() : String(Date.now())));
    req.requestId = requestId;
    req.log = child({
      requestId,
      method: req.method,
      path: req.originalUrl || req.url,
    });

    const startedAt = Date.now();
    req.log.info("api.start", { ip: req.ip });

    // Express/Node socket timeout: ensure frontend loader is not stuck forever
    res.setTimeout(timeoutMs, () => {
      if (res.headersSent) return;
      req.log.warn("api.timeout", { timeoutMs });
      res.status(504).json({ success: false, message: "Request timeout", data: { timeoutMs } });
    });

    res.on("finish", () => {
      req.log.info("api.finish", { status: res.statusCode, ms: Date.now() - startedAt });
    });

    next();
  };
};
