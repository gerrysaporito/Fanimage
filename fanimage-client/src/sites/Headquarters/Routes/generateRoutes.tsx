import React from "react";
import { Redirect, Route } from "react-router-dom";
import OnboardRoutes from "../../imageRepository/containers/misc/Routes/ImageRepositoryRoutes";
import SiteRoutes from "../../site/containers/misc/Routes/SiteRoutes";
import { IRouterRedirect, IRouterRoute, ROUTER_RENDER_METHOD, ROUTER_ROUTE_METHOD, TRouterRoutes } from "./RouterRouteTypes";

const generateRoutes = () => {
    const routes: React.ReactElement[] = [];

    const onboardRoutesData = OnboardRoutes();
    const siteRoutesData = SiteRoutes();

    const onboardRoutes: (React.ReactElement)[] = GenerateRoutes(onboardRoutesData);
    const siteRoutes: (React.ReactElement)[] = GenerateRoutes(siteRoutesData);

    routes.push(...onboardRoutes)
    /* !!! MUST BE LAST FOR 404 !!! */
    routes.push(...siteRoutes)

    return routes
}

export default generateRoutes;

const GenerateRoutes = (routerRoutes: TRouterRoutes[]): React.ReactElement[] => {
    const routes: (React.ReactElement)[] = routerRoutes.map((routerRoute: TRouterRoutes, i: number) => {
        switch (routerRoute.renderRouteMethod) {
            case ROUTER_ROUTE_METHOD.REDIRECT: {
                return <GenerateRedirect key={i} {...routerRoute} />
            }
            case ROUTER_ROUTE_METHOD.ROUTE: {
                return <GenerateRoute key={i} {...routerRoute} />
            }
            default: {
                return <React.Fragment />;
            }
        }
    })

    return routes
}

const GenerateRedirect: React.FunctionComponent<IRouterRedirect> = (routerRoute: IRouterRedirect): React.ReactElement => {
    const { to, from, exact } = routerRoute;

    return <Redirect exact={exact} from={from} to={to} />
}

const GenerateRoute: React.FunctionComponent<IRouterRoute> = (routerRoute: IRouterRoute): React.ReactElement => {
    const { path, renderMethod, Component, HOC, isAllowed, otherProps, exact } = routerRoute;
    if (HOC) {
        switch (renderMethod) {
            case ROUTER_RENDER_METHOD.COMPONENT: {
                return <Route exact={exact} path={path} component={() => <HOC ComponentToBeRendered={Component} isAllowed={isAllowed} otherProps={otherProps} />} />
            }
            case ROUTER_RENDER_METHOD.RENDER: {
                return <Route exact={exact} path={path} render={() => <HOC ComponentToBeRendered={Component} isAllowed={isAllowed} otherProps={otherProps} />} />
            }
        }
    }

    switch (renderMethod) {
        case ROUTER_RENDER_METHOD.COMPONENT: {
            return <Route exact={exact} path={path} component={() => <Component {...otherProps} />} />
        }
        case ROUTER_RENDER_METHOD.RENDER: {
            return <Route exact={exact} path={path} render={() => <Component {...otherProps} />} />
        }
    }
}

