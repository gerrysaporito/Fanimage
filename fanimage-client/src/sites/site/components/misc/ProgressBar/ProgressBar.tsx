import React from "react";
import Checkpoints from "./Checkpoints";
import ProgressBarHooks from "./ProgressBarHooks";

export interface IProgressBarComponentProps {
    // List of checkpoints and their content
    children: any;
    // Style of checkpoints: circle
    circle?: boolean
}

interface IComponentState {
    activeCheckpoint: string;
}

const ProgressBar: React.FunctionComponent<IProgressBarComponentProps> = (props: IProgressBarComponentProps): React.ReactElement => {
    const { children, circle } = props;
    const { componentState, onClickCheckpointItem } = ProgressBarHooks(props);
    const { activeCheckpoint } = componentState;

    const classes: string[] = ["checkpoint__list"];

    if (circle) {
        classes.push("checkpoint__list--circle");
    }

    return (
        <div className="checkpoints">
            <ol className={classes.join(" ")}>
                {children.map((child: any, i: number) => {
                    const { label } = child.props;

                    return (
                        <Checkpoints
                            activeCheckpoint={activeCheckpoint}
                            key={label}
                            label={label}
                            index={i + 1}
                            onClick={onClickCheckpointItem}
                        />
                    );
                })}
            </ol>
            <div className="checkpoint-content">
                {children.map((child: any, i: number) => {
                    if (child.props.label !== activeCheckpoint) {
                        return undefined;
                    }

                    const props = {
                        onClickCheckpointItem: onClickCheckpointItem,
                        label: i + 1 < children.length ? children[i + 1].props.label : children[0].props.label,
                    };

                    return (
                        <React.Fragment key={i}>
                            {React.cloneElement(child.props.children, props)}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
}

export default ProgressBar;
