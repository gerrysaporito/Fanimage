
import { apiCall, HTTP_REQUEST } from "../../../services/api";
import { addAlert, ALERT_TYPES } from "../../actions/alert";
import { IRootState } from "../../reducers";
import { TDispatchType } from "../../actions/dispatchType";

export const getModulesFromOrganization = (): any => {

    return (dispatch: TDispatchType, getState: () => IRootState) => {
        const { userState } = getState();

        if (!userState.userInfo) {
            dispatch(addAlert("Please log in.", ALERT_TYPES.ERROR));
            return false;
        }

        const { userInfo } = userState;

        const endpoint = `/api/image-repository/v1/modules?userId=${userInfo.id}`;

        return apiCall(HTTP_REQUEST.POST, endpoint, {})
            .then((res: any) => {
                return res.data;
            })
            .catch((e: string) => {
                dispatch(addAlert(e, ALERT_TYPES.ERROR));
                return false;
            });
    };
};

export const createModuleForOrganization = (moduleInfo: unknown): any => {

    return (dispatch: TDispatchType, getState: () => IRootState) => {
        const { userState } = getState();

        if (!userState.userInfo) {
            dispatch(addAlert("Please log in.", ALERT_TYPES.ERROR));
            return false;
        }

        const { userInfo } = userState;

        const endpoint = `/api/image-repository/v1/module/create?userId=${userInfo.id}`;

        return apiCall(HTTP_REQUEST.POST, endpoint, moduleInfo)
            .then((res: any) => {
                return res.data;
            })
            .catch(e => {
                dispatch(addAlert(e, ALERT_TYPES.ERROR));
                return false;
            });
    };
};

export const editModuleByModuleId = (moduleId: string, moduleInfo: unknown): any => {

    return (dispatch: TDispatchType, getState: () => IRootState) => {
        const { userState } = getState();

        if (!userState.userInfo) {
            dispatch(addAlert("Please log in.", ALERT_TYPES.ERROR));
            return false;
        }

        const { userInfo } = userState;

        const endpoint = `/api/image-repository/v1/module/edit?userId=${userInfo.id}&moduleId=${moduleId}`;

        return apiCall(HTTP_REQUEST.POST, endpoint, {
            moduleId,
            moduleInfo
        })
            .then((res: any) => {
                return res.data;
            })
            .catch(e => {
                dispatch(addAlert(e, ALERT_TYPES.ERROR));
                return false;
            });
    };
};

export const getModuleByModuleId = (moduleId: string): any => {

    return (dispatch: TDispatchType, getState: () => IRootState) => {
        const { userState } = getState();

        if (!userState.userInfo) {
            dispatch(addAlert("Please log in.", ALERT_TYPES.ERROR));
            return false;
        }

        const { userInfo } = userState;

        const endpoint = `/api/image-repository/v1/module/get?userId=${userInfo.id}`;

        return apiCall(HTTP_REQUEST.POST, endpoint, {
            moduleId
        })
            .then((res: any) => {
                return res.data;
            })
            .catch(e => {
                dispatch(addAlert(e, ALERT_TYPES.ERROR));
                return false;
            });
    };
};

export const removeModuleByModuleId = (moduleId: string | number): any => {

    return (dispatch: TDispatchType, getState: () => IRootState) => {
        const { userState } = getState();

        if (!userState.userInfo) {
            dispatch(addAlert("Please log in.", ALERT_TYPES.ERROR));
            return false;
        }

        const { userInfo } = userState;

        const endpoint = `/api/image-repository/v1/module/delete?userId=${userInfo.id}&moduleId=${moduleId}`;

        return apiCall(HTTP_REQUEST.POST, endpoint, {
            moduleId
        })
            .then((res: any) => {
                return res.data;
            })
            .catch(e => {
                dispatch(addAlert(e, ALERT_TYPES.ERROR));
                return false;
            });
    };
};
