import { IRouteObject, reset_password_token, invite_token, profile_type } from "../../../../../common/variables/routes";

export const SITE_ROUTES: IRouteObject = {
    contactUs: {
        route: `/contact/us`,
        name: "CONTACT",
        description: "Email Form to contact FANIMAGE."
    },
    home: {
        route: `/flying-nimbus`,
        name: "HOME",
        description: "Root directory of site."
    },
    login: {
        route: `/login`,
        name: "LOGIN",
        description: "Log in a user."
    },
    pageNotFound: {
        route: `/page-not-found`,
        name: "PAGE NOT FOUND",
        description: "This page does not exist."
    },
    register: {
        route: `/register`,
        name: "SIGNUP",
        description: "Log in a user."
    },
    root: {
        route: `/`,
        name: "HELLO",
        description: "Root directory."
    },

};
