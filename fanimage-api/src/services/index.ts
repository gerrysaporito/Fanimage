// File: services/index
// Description: Exports all the routes throughout the application.

import AUTHENTICATION_ROUTES from "./authentication/routes";
import EMAIL_ROUTES from "./email/routes";
import IMAGE_REPOSITORY_ROUTES from "./imageRepository/routes";

export default [...AUTHENTICATION_ROUTES, ...EMAIL_ROUTES, ...IMAGE_REPOSITORY_ROUTES];
