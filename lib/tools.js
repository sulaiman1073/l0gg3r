const safeStringify = require("fast-safe-stringify");
const levels = require("./levels");

const getLevelNum = levelWord =>
  Object.entries(levels).find(([k]) => k === levelWord)[1];

const getKeyByValue = (obj, value) =>
  Object.keys(obj).find(key => obj[key] === value);

const isEveryArrayElementRedactString = arr =>
  arr.length > 0 && arr.every(e => typeof e === "string" && e.includes("."));

const stringify = (obj, replacer, spaces) => {
  try {
    return JSON.stringify(obj, replacer, spaces);
  } catch (_) {
    return safeStringify(obj, replacer, spaces);
  }
};

module.exports = {
  getLevelNum,
  getKeyByValue,
  isEveryArrayElementRedactString,
  stringify
};
