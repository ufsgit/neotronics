function nowIso() {
  return new Date().toISOString();
}

function safeJson(value) {
  try {
    return JSON.stringify(value);
  } catch (e) {
    return JSON.stringify({ nonSerializable: true, message: String(e && e.message ? e.message : e) });
  }
}

function baseLog(level, event, meta) {
  const line = {
    ts: nowIso(),
    level,
    event,
    ...meta,
  };
  // Keep console as sink (PM2 collects stdout/stderr)
  // eslint-disable-next-line no-console
  console.log(safeJson(line));
}

function child(defaultMeta = {}) {
  return {
    info: (event, meta = {}) => baseLog("info", event, { ...defaultMeta, ...meta }),
    warn: (event, meta = {}) => baseLog("warn", event, { ...defaultMeta, ...meta }),
    error: (event, meta = {}) => baseLog("error", event, { ...defaultMeta, ...meta }),
    debug: (event, meta = {}) => baseLog("debug", event, { ...defaultMeta, ...meta }),
  };
}

module.exports = {
  child,
};

