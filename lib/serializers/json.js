const fastRedact = require("fast-redact");
const { stringify, isEveryArrayElementRedactString } = require("../tools");

const replacer = (_, val) => {
  if (val === "[Circular]") {
    return;
  }

  if (val instanceof Error) {
    const newError = {
      name: val.name,
      message: val.message,
      stack: val.stack
    };

    Object.entries(val).forEach(([k, v]) => {
      if (k !== "name" && k !== "message" && k !== "stack" && k !== "cause") {
        newError[k] = v;
      }
    });

    if (val.cause) {
      newError.cause = val.cause;
    }

    return newError;
  }

  return val;
};

const defaultOptions = {
  meta: null,
  redact: null
};

const json = (opts = {}) => {
  const meta = opts.meta || defaultOptions.meta;
  const redact = opts.redact || defaultOptions.redact;

  if (meta) {
    if (typeof meta !== "object") throw new Error("meta must be an object");
  }

  if (redact) {
    if (!Array.isArray(redact)) throw new Error("redact must be an array");
    if (!isEveryArrayElementRedactString(redact))
      throw new Error("some array elements aren't redact strings");
  }

  const serialize = log => {
    // eslint-disable-next-line no-param-reassign
    log.timestamp = log.timestamp.getTime();

    if (meta) {
      Object.assign(log, meta);
    }

    if (redact) {
      return fastRedact({
        paths: redact,
        serialize: o => stringify(o, replacer)
      })(log);
    }

    return stringify(log, replacer);
  };

  return {
    meta,
    redact,
    serialize
  };
};

module.exports = json;
