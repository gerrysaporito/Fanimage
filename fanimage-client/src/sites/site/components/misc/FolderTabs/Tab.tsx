import React from "react";

interface IComponentProps {
    activeTab: string;
    label: string;
    onClick: (label: string) => void;
}

class Tab extends React.Component<IComponentProps> {

    onClick = () => {
        const { label, onClick } = this.props;
        onClick(label);
    }

    render() {
        const { label, activeTab } = this.props;

        const classes = ["tab__list--item"];

        if (activeTab === label) {
            classes.push("tab__list--active");
        }

        return (
            <li className={classes.join(" ")} onClick={this.onClick} >
                {label}
            </li>
        );
    }
}

export default Tab;
