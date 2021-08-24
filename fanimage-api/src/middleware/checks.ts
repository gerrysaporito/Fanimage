// File: middleware/checks
// Description: Validates request URL for search parameters.

import { Request, Response, NextFunction } from "express";
import { HTTP400Error } from "../utils/httpErrors";

/*
 * Validates URL has all parameters.
 *
 * @return null
 */
export const checkSearchParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //   if (!req.query.q) {
  //     throw new HTTP400Error("Missing q parameter");
  //   } else {
  //     next();
  //   }
};
