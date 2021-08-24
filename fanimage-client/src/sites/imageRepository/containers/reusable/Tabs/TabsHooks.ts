import React from "react";
import { useDispatch } from "react-redux";
import { removeAlert } from "../../../../../store/actions/alert";
import { ITabsComponentProps } from "./Tabs";


interface IComponentState {
    activeTab: string;
}

const TabsHooks = (props: ITabsComponentProps) => {
    const dispatch = useDispatch();

    const [componentState, setState] = React.useState<IComponentState>({
        activeTab: props.children[0].props.label,
    });

    const onClickTabItem = (tab: string) => {
        setState((prevComponentState: IComponentState) => ({
            ...prevComponentState,
            activeTab: tab
        }));
        dispatch(removeAlert());
    };

    return {
        componentState,
        onClickTabItem
    };
};

export default TabsHooks;
