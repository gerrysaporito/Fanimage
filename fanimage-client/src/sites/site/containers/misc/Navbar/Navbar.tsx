import React from "react";
import { NavLink } from "react-router-dom";

import { NAVBAR_ROUTES } from "../Routes/navbarRoutes";
import { SITE_ROUTES } from "../Routes/routes";
import { IRoute } from "../../../../../common/variables/routes";

import { GenerateTabs } from "./GenerateTabs";
import NavbarHooks from "./NavbarHooks";
import { THEME_TYPES } from "../../../../../store/actions/theme";

/*
 * Navbar used throughout site.
 */
const Navbar: React.FunctionComponent = (): React.ReactElement => {
    const { logoutUser, handleSelectChange, userState, componentState } = NavbarHooks();
    const { theme } = componentState;
    const { userInfo, authenticated } = userState;

    let mainTabs: React.ReactElement[] = [];
    let otherTabs: React.ReactElement[] = [];

    // Creating tabs for unauthenticated users
    if (!authenticated) {
        const routes = NAVBAR_ROUTES.default;
        mainTabs = GenerateTabs(routes.main.default);
        otherTabs = GenerateTabs(routes.other.default);
    }

    // Creating tabs for authenticated users
    if (authenticated) {
        const routes = NAVBAR_ROUTES.authenticated;
        mainTabs = GenerateTabs(routes.main.default);

        /* Logout button */
        mainTabs.push(
            <li key={mainTabs.length} className="nav-item">
                <button onClick={logoutUser}>LOG OUT</button>
            </li>
        );
    }

    return (
        <nav className="navbar navbar-expand-lg fixed-top float">
            <div className="navbar-header">
                <NavLink to={SITE_ROUTES.home.route} className="navbar-brand">
                    FANIMAGE
                </NavLink>
            </div>
            {/* @ts-ignore */}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-rel="noreferrer" target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            < div className="collapse navbar-collapse" id="navbarSupportedContent" >
                <ul className="navbar-nav mr-auto justify-space-evenly">
                    {mainTabs}
                </ul>
                <ul className="navbar-nav ml-auto align-items-center">
                    {otherTabs}
                    <form>
                        <select required value={theme || ""} onChange={handleSelectChange} >
                            {Object.values(THEME_TYPES).map((value: string) => <option key={value} value={value}>{value}</option>)}
                        </select>
                    </form>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;


