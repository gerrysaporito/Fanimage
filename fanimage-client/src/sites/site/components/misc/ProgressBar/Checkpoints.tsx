import React from "react";

interface IComponentProps {
    activeCheckpoint: string;
    label: string;
    onClick: (tab: string) => void;
    index: number;
}

class Checkpoints extends React.Component<IComponentProps> {

    onClick = () => {
        const { label, onClick } = this.props;
        onClick(label);
    }

    render() {
        const { label, activeCheckpoint, index } = this.props;

        const classes = ["checkpoint__list--item"];

        if (activeCheckpoint === label) {
            classes.push("checkpoint__list--active");
        }

        return (
            <li className={classes.join(" ")} onClick={this.onClick} data-content={index} >
                {label}
            </li>
        );
    }
}

export default Checkpoints;
