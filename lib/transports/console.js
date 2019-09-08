const { json } = require("../serializers");
const levels = require("../levels");
const { getLevelNum } = require("../tools");

const defaultOptions = {
  level: Object.values(levels)[0],
  serializer: json()
};

const consoleTransport = (opts = {}) => {
  const level = opts.level ? getLevelNum(opts.level) : defaultOptions.level;
  const serializer = opts.serializer || defaultOptions.serializer;

  const write = log => {
    process.stderr.write(`${log}\n`);
  };

  return {
    level,
    serializer,
    write
  };
};

module.exports = consoleTransport;
