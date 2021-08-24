import { USER_ACTIONS } from "../actionTypes";
import { IAction } from "../actions/action";
import { IUserInfo, IUserPayload } from "../actions/user";

export interface IUserState {
    authenticated: boolean;
    userInfo: IUserInfo | undefined;
}

const DEFAULT_STATE: IUserState = {
    authenticated: false,
    userInfo: {
        email: "",
        id: undefined
    },
};

const user = (state: IUserState = DEFAULT_STATE, action: IAction<IUserPayload>): IUserState => {
    switch (action.type) {
        case USER_ACTIONS.SET_USER: {
            return {
                authenticated: action.payload.userInfo ? true : false,
                userInfo: action.payload.userInfo,
            };
        }
        default: {
            return state;
        }
    }
};

export default user;
