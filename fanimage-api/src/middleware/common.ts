// File: middleware/common
// Description: Middlware for handling miscellaneous parts of the request.

import { Router } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";

/*
 * Allows app to use Cross Origin Resource Sharing (CORS).
 *
 * @return null
 */
export const handleCors = (router: Router) => {
  router.use(cors({ credentials: true, origin: true }));
};

/*
 * Parses text in body of requests as JSON.
 *
 * @return null
 */
export const handleBodyRequestParsing = (router: Router) => {
  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(bodyParser.json({ limit: '11mb' }));
};

/*
 * Compresses the body of the response as it goes through middleware.
 *
 * @return null
 */
export const handleCompression = (router: Router) => {
  router.use(compression());
};

/*
 * Parses cookie header in order to make it available in application.
 *
 * @return null
 */
export const handleCookie = (router: Router) => {
  router.use(cookieParser());
};
