import { IAlertPayload } from "./alert";
import { IThemePayload } from "./theme";
import { IUserPayload } from "./user";

export interface IAction<T> {
    type: string;
    payload: T;
    error?: boolean;
    meta?: unknown;
}

export type TActions = IAction<
    IUserPayload | IAlertPayload | IThemePayload
>;