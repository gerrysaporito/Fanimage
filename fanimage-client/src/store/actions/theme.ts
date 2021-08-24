import { THEME_ACTIONS } from "../actionTypes";
import { IAction } from "./action";

export interface IThemePayload {
    type: string
}
export type TThemeDispatchType = (args: IAction<IThemePayload>) => IAction<IThemePayload>;

export enum THEME_TYPES {
    RETRO = "RETRO",
    GRAYSCALE = "GRAYSCALE",
    DARK = "DARK",
}

export const setTheme = (type: string): IAction<IThemePayload> => ({
    type: THEME_ACTIONS.SET_THEME,
    payload: {
        type: type.toString(),
    }
});
