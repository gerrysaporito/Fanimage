import { addAlert, ALERT_TYPES, removeAlert } from "../../actions/alert";
import { TDispatchType } from "../../actions/dispatchType";
import { setTheme } from "../../actions/theme";
import { setCurrentUser } from "../../actions/user";
import { IRootState } from "../../reducers";
import { apiCall, HTTP_REQUEST, setTokenHeader } from "../../../services/api";


export const setAuthorizationToken = (token: string | null = null): void => {
    setTokenHeader(token);
}

export const logout = (): any => {
    return (dispatch: TDispatchType, getState: () => IRootState): any => {
        const { userState } = getState();

        if (!userState.userInfo) {
            dispatch(addAlert("Please log in.", ALERT_TYPES.ERROR));
            return false;
        } else {
            localStorage.clear();
            setAuthorizationToken();
            dispatch(setCurrentUser());
            dispatch(addAlert("Logged out", ALERT_TYPES.SUCCESS));
        }
    };
}

export const authUser = (type: string, userData: unknown): any => {
    let endpoint: string;
    switch (type.toLowerCase()) {
        case "login": {
            endpoint = `/api/auth/v1/login`;
            break;
        }
        case "register": {
            endpoint = `/api/auth/v1/register`;
            break;
        }
        default: {
            endpoint = "";
            break;
        }
    }

    return (dispatch: TDispatchType) => {
        return new Promise((resolve, reject) => {
            return apiCall(HTTP_REQUEST.POST, endpoint, userData)
                .then((res: any) => {
                    localStorage.setItem("jwtToken", res.token);
                    localStorage.setItem("theme", res.themeType);

                    setAuthorizationToken(res.token);
                    dispatch(setCurrentUser(res.userInfo));
                    dispatch(setTheme(res.themeType || ""));
                    dispatch(removeAlert());
                    resolve(res);
                })
                .catch((e: string) => {
                    dispatch(addAlert(e, ALERT_TYPES.ERROR));
                    reject();
                });
        });
    };
}
