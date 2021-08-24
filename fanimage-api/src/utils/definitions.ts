// File: utils/definitions
// Desecription: Typescript definitions for utility functions and parameters.

import { Router, Request, Response, NextFunction } from "express";

export type Wrapper = (router: Router) => void;

// Route handler type definition.
export type Handler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

// Route type definition.
export type Route = {
  path: string;
  method: string;
  handler: Handler | Handler[];
};
