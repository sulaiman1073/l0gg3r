const { inspect } = require("util");
const chalk = require("chalk");
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

  const colorizedTimestamp = chalk.white.bgMagenta.bold(
    ` ${year}-${month}-${day} ${hours}:${minutes}:${seconds} `
  );

  return colorizedTimestamp;
};

const formatLevel = level => {
  const levelName = getKeyByValue(levels, level).toUpperCase();
  let colorizedLevel;

  if (levelName === "DEBUG") {
    colorizedLevel = chalk.bgBlue.bold(` ${levelName} `);
  } else if (levelName === "INFO") {
    colorizedLevel = chalk.bgGreen.bold(` ${levelName}  `);
  } else if (levelName === "WARN") {
    colorizedLevel = chalk.bgYellow.bold(` ${levelName}  `);
  } else if (levelName === "ERROR") {
    colorizedLevel = chalk.bgRed.bold(` ${levelName} `);
  }

  return colorizedLevel;
};

const formatMessage = message => {
  const newMessage =
    typeof message === "string"
      ? message
      : inspect(message, { colors: true, compact: false, depth: 2 });

  return newMessage;
};

const prettyConsole = () => {
  const serialize = log => {
    const newTimestamp = formatTimestamp(log.timestamp);
    const newLevel = formatLevel(log.level);
    const newMessage = formatMessage(log.message);
    const formattedLog = `${newTimestamp}${newLevel}: ${newMessage}`;

    return formattedLog;
  };

  return { serialize };
};

module.exports = prettyConsole;
