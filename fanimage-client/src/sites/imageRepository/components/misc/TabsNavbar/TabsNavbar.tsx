import React from "react";
import { Link } from "react-router-dom";

interface ITabsNavbarComponentProps {
    // List of tabs and their names
    tabsInfo: ITabsNavbarTab[];
}

export interface ITabsNavbarTab {
    route: string;
    name: string;
    active: boolean;
}

/*
 * Page with tabs to see the people associated with the organization.
 */
const TabsNavbar: React.FunctionComponent<ITabsNavbarComponentProps> = (props: ITabsNavbarComponentProps): React.ReactElement => {
    const { tabsInfo } = props;

    const tabs = tabsInfo.map((tabInfo: ITabsNavbarTab, i: number) => {
        const classes = ["tabs-navbar--tab-name"]
        if (tabInfo.active) {
            classes.push("tabs-navbar--tab-name-active")
        }

        return (
            <span key={i} className={classes.join(" ")}>
                <Link to={tabInfo.route} >
                    {tabInfo.name}
                </Link>
            </span>
        )
    })

    return (
        <div className="tabs-navbar">
            {tabs}
        </div>
    );
};

export default TabsNavbar;
