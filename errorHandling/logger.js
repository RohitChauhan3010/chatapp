const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const fs = require("fs");

const logger = winston.createLogger({
  transports: [],
});

const logError = (error, req) => {
  const logFilename = `logs/error-${new Date().toISOString().slice(0, 10)}.log`;

  fs.readdirSync("logs").forEach((file) => {
    if (file.startsWith("error-") && file.endsWith(".log")) {
      fs.unlinkSync(`logs/${file}`);
    }
  });

  const errorLog = new DailyRotateFile({
    filename: logFilename,
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    level: "error",
    format: winston.format.combine(
      winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      }),
      winston.format.errors({ stack: true }),
      winston.format.splat(),
      winston.format.json() 
    ),
  });

  logger.clear();
  logger.add(errorLog);

  logger.error({ message: `Error: ${error.message}, Request: ${req.originalUrl}` });
};

module.exports = { logger, logError };
