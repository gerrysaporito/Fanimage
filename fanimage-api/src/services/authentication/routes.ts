// File: services/authentication/routes
// Description: Array of authentication routes and respective handlers.

import loginUser from "./handlers/loginUser";
import registerUser from "./handlers/registerUser";

export default [
    {
        path: "/api/auth/v1/login",
        method: "post",
        handler: [
            loginUser
        ],
    },
    {
        path: "/api/auth/v1/register",
        method: "post",
        handler: [
            registerUser
        ],
    },
];
