const { inspect } = require("util");
const levels = require("../levels");
const { getKeyByValue } = require("../tools");

const formatTimestamp = timestamp => {
  const year = timestamp.getFullYear();
  let month = timestamp.getMonth();
  if (month < 10) month = `0${month}`;
  let day = timestamp.getDay();
  if (day < 10) day = `0${day}`;

  let hours = timestamp.getHours();
  if (hours < 10) hours = `0${hours}`;
  let minutes = timestamp.getMinutes();
  if (minutes < 10) minutes = `0${minutes}`;
  let seconds = timestamp.getSeconds();
  if (seconds < 10) seconds = `0${seconds}`;

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const formatLevel = level => {
  const levelName = getKeyByValue(levels, level).toUpperCase();

  return levelName;
};

const formatMessage = message => {
  const newMessage =
    typeof message === "string"
      ? message
      : inspect(message, { colors: false, compact: false, depth: 3 });

  return newMessage;
};

const prettyFile = () => {
  const serialize = log => {
    const newTimestamp = formatTimestamp(log.timestamp);
    const newLevel = formatLevel(log.level);
    const newMessage = formatMessage(log.message);
    const formattedLog = `${newTimestamp} ${newLevel}: ${newMessage}`;
    return formattedLog;
  };

  return { serialize };
};

module.exports = prettyFile;
