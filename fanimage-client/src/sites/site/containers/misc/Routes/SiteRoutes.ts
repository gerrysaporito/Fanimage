import { useSelector } from "react-redux";

import { IRootState } from "../../../../../store/reducers";
import { TRouterRoutes, ROUTER_RENDER_METHOD, ROUTER_ROUTE_METHOD } from "../../../../Headquarters/Routes/RouterRouteTypes";
import { SITE_ROUTES } from "./routes";
import Home from "../../../components/pages/Home";
import Login from "../../../components/pages/Login";
import Register from "../../../components/pages/Register";
import NotFound from "../../../components/pages/NotFound";
import ContactUs from "../../../components/pages/ContactUs";
import WithoutAuth from "../../../../../hocs/WithoutAuth";


const SiteRoutes = () => {

    const { themeState, userState } = useSelector((state: IRootState) => state);

    const siteRoutes: TRouterRoutes[] = [
        /* 
         * Redirect on for dashboards 
         */
        // Root directory
        {
            renderRouteMethod: ROUTER_ROUTE_METHOD.REDIRECT,
            from: SITE_ROUTES.root.route,
            to: SITE_ROUTES.home.route,
            exact: true
        },

        /* 
         * General Links 
         */
        {
            renderRouteMethod: ROUTER_ROUTE_METHOD.ROUTE,
            path: SITE_ROUTES.home.route,
            renderMethod: ROUTER_RENDER_METHOD.RENDER,
            Component: Home,
            isAllowed: true,
            exact: true,
            otherProps: {}
        },
        {
            renderRouteMethod: ROUTER_ROUTE_METHOD.ROUTE,
            path: SITE_ROUTES.contactUs.route,
            renderMethod: ROUTER_RENDER_METHOD.RENDER,
            Component: ContactUs,
            isAllowed: true,
            exact: true,
            otherProps: {}
        },

        /* 
         * Authentication 
         */
        {
            renderRouteMethod: ROUTER_ROUTE_METHOD.ROUTE,
            path: SITE_ROUTES.login.route,
            renderMethod: ROUTER_RENDER_METHOD.RENDER,
            HOC: WithoutAuth,
            Component: Login,
            isAllowed: true,
            exact: true,
            otherProps: {}
        },
        {
            renderRouteMethod: ROUTER_ROUTE_METHOD.ROUTE,
            path: SITE_ROUTES.register.route,
            renderMethod: ROUTER_RENDER_METHOD.RENDER,
            HOC: WithoutAuth,
            Component: Register,
            isAllowed: true,
            exact: true,
            otherProps: {}
        },

        /*
         * Not Found
         */
        {
            renderRouteMethod: ROUTER_ROUTE_METHOD.ROUTE,
            renderMethod: ROUTER_RENDER_METHOD.RENDER,
            Component: NotFound,
        },

        /* !!! 404 Not Found MUST BE LAST !!! */
    ]
    return siteRoutes;
};

export default SiteRoutes;
