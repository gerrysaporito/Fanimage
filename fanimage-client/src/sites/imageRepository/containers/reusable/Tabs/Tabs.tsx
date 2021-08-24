import React from "react";
import Tab from "./Tab";
import TabsHooks from "./TabsHooks";

export interface ITabsComponentProps {
    children: any,
}

const Tabs: React.FunctionComponent<ITabsComponentProps> = (props: ITabsComponentProps) => {
    const { children } = props;
    const { componentState, onClickTabItem } = TabsHooks(props);
    const { activeTab } = componentState;

    return (
        <div className="tabs">
            <ol className="tabs-list">
                {children.map((child: any) => {
                    const { label } = child.props;

                    return (
                        <Tab
                            activeTab={activeTab}
                            key={label}
                            label={label}
                            onClick={onClickTabItem}
                        />
                    );
                })}
            </ol>
            <div className="tab-content">
                {children.map((child: any) => {
                    if (child.props.label !== activeTab) return undefined;
                    return child.props.children;
                })}
            </div>
        </div>
    );

};

export default Tabs;
