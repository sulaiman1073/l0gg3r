const { createWriteStream } = require("fs");
const { json } = require("../serializers");
const levels = require("../levels");
const { getLevelNum } = require("../tools");

const defaultOptions = {
  level: Object.values(levels)[0],
  serializer: json(),
  file: `${process.cwd()}/l0gg3r.log`
};

const fileTransport = (opts = {}) => {
  const level = opts.level ? getLevelNum(opts.level) : defaultOptions.level;
  const serializer = opts.serializer || defaultOptions.serializer;
  const file = opts.file || defaultOptions.file;
  const stream = createWriteStream(file, { flags: "a" });

  const write = log => {
    stream.write(`${log}\n`);
  };

  return {
    level,
    serializer,
    write
  };
};

module.exports = fileTransport;
