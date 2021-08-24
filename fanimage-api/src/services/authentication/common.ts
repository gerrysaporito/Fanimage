// File: services/recruitment/common
// Description: Contains common types and variables for authentication handlers.

export interface IRefreshOptions {
    path: string;
    maxAge: number;
    httpOnly: boolean;
    secure: boolean;
    signed: boolean;
}

export const jwtExpires = "7 days";

export const refreshOptions: IRefreshOptions = {
    path: "/api/auth/v1/refresh/token",
    maxAge: 1000 * 60 * 60 * 24 * 90, // would expire after 90 days
    httpOnly: true,
    secure: false,
    signed: false,
};
