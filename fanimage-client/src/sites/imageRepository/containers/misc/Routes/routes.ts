import { IRouteObject, module_identifier } from "../../../../../common/variables/routes";

export const IMAGE_REPOSITORY_ROUTES: IRouteObject = {
    imageList: {
        route: `/image-repository`,
        name: "IMAGES",
        description: "Page to view all images."
    },
    viewModule: {
        route: `/image-repository/:${module_identifier}`,
        name: `View Image`,
        description: "Page to view a single image."
    },
};
