import { SITE_ROUTES } from "./routes";
import { IRoute } from "../../../../../common/variables/routes";
import { IMAGE_REPOSITORY_ROUTES } from "../../../../imageRepository/containers/misc/Routes/routes";

export interface INavbar {
    [index: string]: INavbarRoutes
}

export interface INavbarRoutes {
    [index: string]: INavbarTabs;
}

export interface INavbarTabs {
    [index: string]: ITabs[],
}

export interface ITabs {
    type: string;
    routes: IRoute[];
    button?: string;
}


export const NAVBAR_ROUTES: INavbar = {
    authenticated: {
        main: {
            default: [
                {
                    type: "route",
                    routes: [SITE_ROUTES.home]
                },
                {
                    type: "route",
                    routes: [SITE_ROUTES.contactUs]
                },
            ]
        },
        other: {
            default: [
            ]
        }
    },
    default: {
        main: {
            default: [
                {
                    type: "route",
                    routes: [SITE_ROUTES.home],
                },
                {
                    type: "route",
                    routes: [SITE_ROUTES.contactUs],
                },
            ]
        },
        other: {
            default: [
                {
                    type: "route",
                    routes: [SITE_ROUTES.register]
                },
                {
                    type: "route",
                    routes: [SITE_ROUTES.login]
                },
            ]
        }
    },

};
