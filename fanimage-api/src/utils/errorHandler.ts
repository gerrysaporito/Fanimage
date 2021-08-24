// File: utils/errorHandler
// Desecription: Handlers for error types.

import { Response, NextFunction } from "express";
import { HTTPClientError, HTTP404Error } from "./httpErrors";
import logger from "../config/logger";

/*
 * Default error if error not specified.
 *
 * @return: null
 */
export const notFoundError = () => {
  throw new HTTP404Error("Method not found.");
};

/*
 * Handler to deal with client errors.
 *
 * @return: null
 */
export const clientError = (err: Error, res: Response, next: NextFunction) => {
  if (err instanceof HTTPClientError) {
    console.warn(err);
    logger.error({
      message: err,
    });
    res.status(err.statusCode).send(err.message);
  } else {
    next(err);
  }
};

/*
 * Handler to deal with internal errors.
 *
 * @return: null
 */
export const serverError = (err: Error, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === "production") {
    res.status(500).send("Internal Server Error");
  } else {
    res.status(500).send(err.stack);
  }
};
