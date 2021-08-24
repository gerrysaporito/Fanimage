import { IAction } from "./action";
import { USER_ACTIONS } from "../actionTypes";

export interface IUserInfo {
    email: string;
    id: number | undefined;
}
export interface IUserPayload {
    userInfo: IUserInfo | undefined;
    authenticated: boolean;
}

export type TUserDispatchType = (args: IAction<IUserPayload>) => IAction<IUserPayload>;

export function setCurrentUser(userInfo: IUserInfo | undefined = undefined): IAction<IUserPayload> {
    return {
        type: USER_ACTIONS.SET_USER,
        payload: {
            userInfo: userInfo,
            authenticated: Object.keys(userInfo || {}).length > 0,
        }
    };
}
