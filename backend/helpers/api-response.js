function successPayload(message = "OK", data = []) {
  return { success: true, message, data };
}

function failurePayload(message = "Error", data = []) {
  return { success: false, message, data };
}

function sendSuccess(res, { status = 200, message = "OK", data = [] } = {}) {
  return res.status(status).json(successPayload(message, data));
}

function sendFailure(res, { status = 500, message = "Error", data = [] } = {}) {
  return res.status(status).json(failurePayload(message, data));
}

module.exports = {
  successPayload,
  failurePayload,
  sendSuccess,
  sendFailure,
};
