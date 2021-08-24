// String Identifiers
export const user_id = "user_id";
export const user_identifier = "user_username";
export const organization_identifier = "organization_username";
export const reset_password_token = "reset_password_token";
export const invite_token = "invite_token";
export const module_identifier = "module_id";
export const profile_type = "profile_type";

// Routes
export interface IRouteObject {
    [route: string]: IRoute;
}

export interface IRoute {
    route: string;
    name: string;
    description: string;
    // type?: any;
}

// Router Match
export interface IMatchParams {
    [route: string]: string;
}

