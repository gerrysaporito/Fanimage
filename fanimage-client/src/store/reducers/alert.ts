import { ALERT_ACTIONS } from "../actionTypes";
import { IAction } from "../actions/action";
import { ALERT_TYPES, IAlertPayload } from "../actions/alert";

export interface IAlertState {
    type: ALERT_TYPES | null,
    message: string | null,
}

const DEFAULT_STATE: IAlertState = {
    type: null,
    message: null,
};

const alert = (state: IAlertState = DEFAULT_STATE, action: IAction<IAlertPayload>): IAlertState => {
    switch (action.type) {
        case ALERT_ACTIONS.ADD_ALERT: {
            return { ...state, ...action.payload };
        }
        case ALERT_ACTIONS.REMOVE_ALERT: {
            return { ...state, type: null, message: null };
        }
        default: {
            return state;
        }
    }
};

export default alert;
