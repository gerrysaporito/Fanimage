// File: middleware/secruity
// Description: Contains middleware that pertains to security.

import express, { Router } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import csurf from "csurf";

/*
 * Ensures number of requesets is below a reasonable amount to defer spam/bots.
 *
 * @return null
 */
export const handleRateLimit = (router: Router) => {
  const limit = rateLimit({
    max: 100, // limit each IP to 100 requests per windowMs
    windowMs: 0.5 * 60 * 1000, // 1 mins, the timeframe for which requests are checked/remembered.
    message: "Too many requests",
  });

  router.use(limit);
};

/*
 * Checks size of requests body to prevent overload/crashing.
 *
 * @return null
 */
export const handleJSONBodyLimit = (router: Router) => {
  router.use(express.json({ limit: "10kb" })); // limit body to 10kb
};

/*
 * Uses helmet to validate http headers.
 *
 * @return null
 */
export const handleHTTPHeaders = (router: Router) => {
  router.use(helmet());
};

/*
 * Uses csurf to validate csurf cookies.
 *
 * @return null
 */
export const handleCSRF = (router: Router) => {
  router.use(
    csurf({
      cookie: true,
    })
  );
};
