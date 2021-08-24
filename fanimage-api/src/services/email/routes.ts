// File: services/email/routes
// Description: Array of email routes and respective handlers.

import sendContactUs from "./handlers/contact/sendContactUs";


export default [
    {
        path: "/api/email/v1/contact/us/email",
        method: "post",
        handler: [
            sendContactUs
        ],
    },
];
