import React from "react";
import { useDispatch } from "react-redux";
import { removeAlert } from "../../../../../store/actions/alert";
import { IProgressBarComponentProps } from "./ProgressBar";


interface IComponentState {
    activeCheckpoint: string;
}

const ProgressBarHooks = (props: IProgressBarComponentProps) => {
    const dispatch = useDispatch();

    const [componentState, setState] = React.useState<IComponentState>({
        activeCheckpoint: props.children[0].props.label,
    });

    const onClickCheckpointItem = (tab: string) => {
        setState((prevComponentState: IComponentState) => ({
            ...prevComponentState,
            activeTab: tab
        }));
        dispatch(removeAlert());
    };

    return {
        componentState,
        onClickCheckpointItem
    };
};

export default ProgressBarHooks;
