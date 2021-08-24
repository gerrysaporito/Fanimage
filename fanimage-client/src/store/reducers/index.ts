import { combineReducers } from "redux";
import user from "./user";
import alert from "./alert";
import theme from "./theme";

export const rootReducer = combineReducers({
    alertState: alert,
    themeState: theme,
    userState: user,
});

export type IRootState = ReturnType<typeof rootReducer>;
