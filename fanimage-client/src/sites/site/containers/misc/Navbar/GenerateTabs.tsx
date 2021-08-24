import React from "react";
import { NavLink } from "react-router-dom";
import { IRoute, organization_identifier, user_identifier } from "../../../../../common/variables/routes";
import { ITabs } from "../Routes/navbarRoutes";

export const GenerateTabs = (tabsArr: ITabs[]): React.ReactElement[] => {
    const tabs = [];

    for (const tabObj of tabsArr) {
        let newTabs = [];
        switch (tabObj.button) {
            case "primary": {
                newTabs = tabObj.routes.map((tab: IRoute, i: number) => {
                    return (
                        <span key={tab?.name || "NA" + i.toString()} className="button button--primary">
                            <NavLink to={tab?.route || ""} activeClassName={`active-link`}>
                                {tab?.name || "NA"}
                            </NavLink>
                        </span >
                    );
                });
                break;
            }
            default: {
                newTabs = tabObj.routes.map((tab: IRoute, i: number) => {
                    return (
                        <li key={tab?.name || "NA" + i.toString()} className="nav-item">
                            <NavLink to={tab?.route || ""} activeClassName="active-link">
                                {tab?.name || "NA"}
                            </NavLink>
                        </li>
                    );
                });
            }
        }

        tabs.push(...newTabs);
    }

    return tabs;
};
