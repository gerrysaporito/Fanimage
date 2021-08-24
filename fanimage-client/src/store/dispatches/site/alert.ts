import { addAlert, ALERT_TYPES, removeAlert } from "../../actions/alert";
import { TDispatchType } from "../../actions/dispatchType";

export const dispatchAlert = (message: string | null = null, type: ALERT_TYPES | null = null): any => {
    if (!message || !type) {
        return (dispatch: TDispatchType) => {
            dispatch(removeAlert());
        };
    }

    return (dispatch: TDispatchType) => {
        dispatch(addAlert(message, type));
    };
};
