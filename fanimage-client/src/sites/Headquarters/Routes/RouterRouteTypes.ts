export enum ROUTER_ROUTE_METHOD {
    REDIRECT = "REDIRECT",
    ROUTE = "ROUTE",
}

export enum ROUTER_RENDER_METHOD {
    COMPONENT = "COMPONENT",
    RENDER = "RENDER",
}

interface IRouterRoutes {
    renderRouteMethod: ROUTER_ROUTE_METHOD;
}

export interface IRouterRedirect extends IRouterRoutes {
    renderRouteMethod: ROUTER_ROUTE_METHOD.REDIRECT
    to: string;
    from: string;
    exact?: boolean
}

export interface IRouterRoute extends IRouterRoutes {
    renderRouteMethod: ROUTER_ROUTE_METHOD.ROUTE;
    renderMethod: ROUTER_RENDER_METHOD;
    Component: React.FunctionComponent<any>;
    path?: string;
    HOC?: React.FunctionComponent<any>;
    isAllowed?: boolean;
    otherProps?: Record<string, unknown>;
    exact?: boolean;
}

export type TRouterRoutes = IRouterRedirect | IRouterRoute;
