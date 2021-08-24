import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { SITE_ROUTES } from "../../misc/Routes/routes";
import { logout } from "../../../../../store/dispatches/site/user";
import { IRootState } from "../../../../../store/reducers";
import { useHistory } from "react-router-dom";
import { dispatchTheme } from "../../../../../store/dispatches/site/theme";
import { THEME_TYPES } from "../../../../../store/actions/theme";

interface IComponentState {
    theme: string;
}

const NavbarHooks = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { userState, themeState } = useSelector((state: IRootState) => state);

    const [componentState, setState] = React.useState<IComponentState>({
        theme: themeState.type || "",
    });

    /* Button Event to log out user */
    const logoutUser = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        new Promise((resolve, reject) => {
            const status = dispatch(logout());
            resolve(status)
        })
            .then(() => {
                history.push(SITE_ROUTES.home.route);
            })
    }

    const handleSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.persist();

        dispatch(dispatchTheme(e.target.value));

        setState((prevComponentState: IComponentState) => ({
            ...prevComponentState,
            theme: e.target.value || ""
        }));
    }

    return {
        logoutUser,
        handleSelectChange,
        componentState,
        userState,
    };
};

export default NavbarHooks;
