const { sendSuccess } = require("./api-response");

function shouldWrap(req) {
  const url = (req.originalUrl || req.url || "").toLowerCase();
  if (req.method && req.method.toUpperCase() !== "POST") return false;
  return url.includes("/save_") || url.includes("/save-") || url.includes("/save");
}

module.exports = function autoResponseWrapper() {
  return function (req, res, next) {
    if (!shouldWrap(req)) return next();

    // Store references to original methods
    const originalJson = res.json;
    const originalSend = res.send;
    let isHandled = false;

    res.json = function(payload) {
      if (isHandled) return originalJson.call(this, payload);
      isHandled = true;
      
      // If already wrapped, send as is
      if (payload && typeof payload === "object" && payload.success !== undefined) {
        return originalJson.call(this, payload);
      }

      // Wrap and send
      return originalJson.call(this, {
        success: true,
        message: "Saved Successfully",
        data: Array.isArray(payload) ? payload : [payload]
      });
    };

    res.send = function(payload) {
      if (isHandled) return originalSend.call(this, payload);
      
      // If it's a buffer, send directly
      if (Buffer.isBuffer(payload)) {
        isHandled = true;
        return originalSend.call(this, payload);
      }

      // If it's an object, let res.json handle it
      if (payload && typeof payload === "object") {
        return res.json(payload);
      }

      // Otherwise send as is
      isHandled = true;
      return originalSend.call(this, payload);
    };

    next();
  };
};
