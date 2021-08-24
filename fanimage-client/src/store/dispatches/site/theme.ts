import { TDispatchType } from "../../actions/dispatchType";
import { setTheme, THEME_TYPES } from "../../actions/theme";

export const dispatchTheme = (type: string = THEME_TYPES.RETRO): any => {
    return (dispatch: TDispatchType) => {
        localStorage.setItem("theme", type);

        dispatch(setTheme(type));
    };
};
