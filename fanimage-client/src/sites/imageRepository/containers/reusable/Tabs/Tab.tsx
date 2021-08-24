import React from "react";

interface IComponentProps {
    activeTab: string;
    label: string;
    onClick: (tab: string) => void;
}

class Tab extends React.Component<IComponentProps> {

    onClick = () => {
        const { label, onClick } = this.props;
        onClick(label);
    }

    render() {
        const { label, activeTab } = this.props;

        const classes = ["tabs-list__item"];

        if (activeTab === label) {
            classes.push("tabs-list__item--active");
        }

        return (
            <li className={classes.join(" ")} onClick={this.onClick} >
                {label}
            </li>
        );
    }
}

export default Tab;
