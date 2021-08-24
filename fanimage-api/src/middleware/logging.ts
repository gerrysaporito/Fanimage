// File: middlware/logging
// Description: Adds logging to requests.

import { Router } from "express";
import { format, transports } from "winston";
import expressWinston from "express-winston";
import dotenv from "dotenv";

dotenv.config();

/*
 * Adds logging to requests to log errors, warnings, etc.
 *
 * @return null
 */
const handleLogging = (router: Router) =>
  router.use(
    expressWinston.logger({
      msg: "HTTP {{req.method}} {{req.url}}",
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
    })
  );

export { handleLogging };
