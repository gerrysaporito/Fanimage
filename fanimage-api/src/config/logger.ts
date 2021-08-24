// File: config/logger
// Description: Initializes Winston logger.

import { createLogger, format, transports, Logger } from "winston";
import dotenv from "dotenv";
dotenv.config();

const logger: Logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.Console({ handleExceptions: true }),
    new transports.File({
      filename: "./logs/error.log",
      level: "error",
    }),
    new transports.File({
      filename: "./logs/warn.log",
      level: "warn",
    }),
    new transports.File({
      filename: "./logs/info.log",
      level: "info",
    }),
  ],
});

export default logger;
