// File: middlware/index
// Description: Main export of all middleware.

import {
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleCookie,
} from "./common";
import { handleRateLimit, handleHTTPHeaders, handleCSRF } from "./security";
import { handleLogging } from "./logging";

export default [
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleCookie,
  handleRateLimit,
  handleHTTPHeaders,
  // handleCSRF,
  handleLogging,
];
