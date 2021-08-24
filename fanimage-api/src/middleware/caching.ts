// File: middleware/caching
// Description: Checks cache for requests in memory.

import { Response, NextFunction } from "express";
import { promisify } from "util";
import { redisClient } from "../config/cache";

const getAsync = promisify(redisClient.get).bind(redisClient);

/*
 * Checks to see if request has already been called and stored in local memory.
 *
 * return null
 */
const getFromCache = async (key: string, res: Response, next: NextFunction) => {
  let data = await getAsync(key);

  if (data) {
    res.status(200).send(data);
  } else {
    next();
  }
};

export { getFromCache };
