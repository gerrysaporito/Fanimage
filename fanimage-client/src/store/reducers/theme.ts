import { THEME_ACTIONS } from "../actionTypes";
import { IAction } from "../actions/action";
import { IThemePayload, THEME_TYPES } from "../actions/theme";

export interface IThemeState {
    type: string;
}

const DEFAULT_STATE: IThemeState = {
    type: THEME_TYPES.RETRO.toString(),
};

const theme = (state: IThemeState = DEFAULT_STATE, action: IAction<IThemePayload>): IThemeState => {
    switch (action.type) {
        case THEME_ACTIONS.SET_THEME: {
            return {
                ...action.payload
            };
        }
        default: {
            return state;
        }
    }
};

export default theme;
