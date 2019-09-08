const transports = require("./transports");
const serializers = require("./serializers");
const levels = require("./levels");

const defaultOptions = {
  transports: [transports.consoleTransport()]
};

const logger = (opts = {}) => {
  const loggerTransports = opts.transports || defaultOptions.transports;
  const debugNumLevel = levels.debug;
  const infoNumLevel = levels.info;
  const warnNumLevel = levels.warn;
  const errorNumLevel = levels.error;

  const logMsg = (lvl, msg) => {
    const timestamp = new Date();

    loggerTransports.forEach(transport => {
      if (lvl >= transport.level) {
        const log = { level: lvl, timestamp, message: msg };
        const serializedLog = transport.serializer.serialize(log);
        transport.write(serializedLog);
      }
    });
  };

  const debug = msg => {
    logMsg(debugNumLevel, msg);
  };
  const info = msg => {
    logMsg(infoNumLevel, msg);
  };
  const warn = msg => {
    logMsg(warnNumLevel, msg);
  };
  const error = msg => {
    logMsg(errorNumLevel, msg);
  };

  return {
    transports: loggerTransports,
    debug,
    info,
    warn,
    error
  };
};

logger.transports = transports;
logger.serializers = serializers;

module.exports = logger;
