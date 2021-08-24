// File: services/imageRepository/routes
// Description: Array of imageRepository routes and respective handlers.

import createModule from "./handlers/createModule";
import removeModule from "./handlers/removeModule";
import editModule from "./handlers/editModule";
import getModules from "./handlers/getModules";
import getModule from "./handlers/getModule";
import { ensureCorrectUser, loginRequired } from "../../middleware/authenticate";

export default [
    {
        path: "/api/image-repository/v1/modules",
        method: "post",
        handler: [
            getModules
        ],
    },
    {
        path: "/api/image-repository/v1/module/create",
        method: "post",
        handler: [
            loginRequired,
            createModule
        ],
    },
    {
        path: "/api/image-repository/v1/module/delete",
        method: "post",
        handler: [
            ensureCorrectUser,
            removeModule
        ],
    },
    {
        path: "/api/image-repository/v1/module/get",
        method: "post",
        handler: [
            getModule
        ],
    },
    {
        path: "/api/image-repository/v1/module/edit",
        method: "post",
        handler: [
            ensureCorrectUser,
            editModule
        ],
    },
];
