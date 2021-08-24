// File: utils/index
// Description: Utility functions to connect services with middleware.

import { Router } from "express";
import { Route, Wrapper } from "./definitions";

/*
 * Apply the middlewares to the services when called.
 *
 * @param: middlewareWrappers: Array<Wrapper>
 * @param router: Router
 * @return: null
 */
export const applyMiddleware = (
  middlewareWrappers: Wrapper[],
  router: Router
) => {
  for (const wrapper of middlewareWrappers) {
    wrapper(router);
  }
};

/*
 * Add the routes and their respective services to router.
 *
 * @param routes: Array<Routes>
 * @param router: Router
 * @return: null
 */
export const applyRoutes = (routes: Route[], router: Router) => {
  for (const route of routes) {
    const { method, path, handler } = route;
    (router as any)[method](`${path}`, handler);
  }
};
