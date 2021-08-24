import { TUserDispatchType } from "./user";
import { TAlertDispatchType } from "./alert";
import { TThemeDispatchType } from "./theme";

export type TDispatchType = TUserDispatchType & TAlertDispatchType &
    TThemeDispatchType;
