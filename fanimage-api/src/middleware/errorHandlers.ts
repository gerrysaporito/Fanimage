// File: middlware/errorHandlers
// Description: Error middlware to route the proper error destination on encounter.

import { Request, Response, NextFunction, Router } from "express";
import * as ErrorHandler from "../utils/errorHandler";
import { HTTP403Error } from "../utils/httpErrors";

/*
 * Reroutes to 404 Error route.
 *
 * @return null
 */
const handle404Error = (router: Router) => {
  router.use((req: Request, res: Response) => {
    ErrorHandler.notFoundError();
  });
};

type ErrorWithCode = Error & { code?: string };

/*
 * Reroutes to Client Error route.
 *
 * @return null
 */
const handleClientError = (router: Router) => {
  router.use(
    (err: ErrorWithCode, req: Request, res: Response, next: NextFunction) => {
      if (err.code == "EBADCSRFTOKEN") {
        err = new HTTP403Error();
      }
      ErrorHandler.clientError(err, res, next);
    }
  );
};

/*
 * Reroutes to Server Error route.
 *
 * @return null
 */
const handleServerError = (router: Router) => {
  router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    ErrorHandler.serverError(err, res, next);
  });
};

export default [handle404Error, handleClientError, handleServerError];
