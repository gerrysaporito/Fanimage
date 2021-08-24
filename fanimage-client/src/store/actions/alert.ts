import { ALERT_ACTIONS } from "../actionTypes";
import { IAction } from "./action";

export interface IAlertPayload {
    message: string | null;
    type: ALERT_TYPES | null;
}

export type TAlertDispatchType = (args: IAction<IAlertPayload>) => IAction<IAlertPayload>;

export enum ALERT_TYPES {
    ERROR = "Error",
    SUCCESS = "Success"
}

export const addAlert = (message: string, type: ALERT_TYPES): IAction<IAlertPayload> => ({
    type: ALERT_ACTIONS.ADD_ALERT,
    payload: {
        message: message,
        type: type
    }
});

export const removeAlert = (): IAction<IAlertPayload> => ({
    type: ALERT_ACTIONS.REMOVE_ALERT,
    payload: {
        message: null,
        type: null
    }
});
