import { addAlert, ALERT_TYPES } from "../../actions/alert";
import { TDispatchType } from "../../actions/dispatchType";
import { apiCall, HTTP_REQUEST } from "../../../services/api";
import { IRootState } from "../../reducers";

export const generalContactUs = (contactObj: unknown): any => {
    const endpoint = `/api/email/v1/contact/us/email`;

    return (dispatch: TDispatchType) => {
        return new Promise((resolve, reject) => {
            return apiCall(HTTP_REQUEST.POST, endpoint, contactObj)
                .then(() => {
                    const res = dispatch(addAlert("Message has been sent successfully", ALERT_TYPES.SUCCESS));
                    resolve(res);
                })
                .catch((e: string) => {
                    dispatch(addAlert(e, ALERT_TYPES.ERROR));
                    reject();
                });
        });
    };
};
