import { TRouterRoutes, ROUTER_RENDER_METHOD, ROUTER_ROUTE_METHOD } from "../../../../Headquarters/Routes/RouterRouteTypes";
import WithAuth from "../../../../../hocs/WithAuth/WithAuth";
import ViewModule from "../../../components/pages/general/ViewModule/ViewModule";
import { IMAGE_REPOSITORY_ROUTES } from "./routes";


const OnboardRoutes = () => {

    const onboardRoutes: TRouterRoutes[] = [

        /* 
         * General Authorized Routes 
         */
        {
            renderRouteMethod: ROUTER_ROUTE_METHOD.ROUTE,
            path: IMAGE_REPOSITORY_ROUTES.viewModule.route,
            renderMethod: ROUTER_RENDER_METHOD.RENDER,
            HOC: WithAuth,
            Component: ViewModule,
            isAllowed: true,
            exact: true,
        },
    ]
    return onboardRoutes;
};

export default OnboardRoutes;
