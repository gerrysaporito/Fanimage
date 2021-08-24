import React from "react";
import Tab from "./Tab";

interface IComponentProps {
    // List of tabs and their content
    children: any;
}

interface IComponentState {
    activeTab: string;
}

class FolderTabs extends React.Component<IComponentProps, IComponentState> {

    state: Readonly<IComponentState> = {
        // @ts-ignore
        activeTab: this.props.children[0].props.label,
    }

    onClickTabItem = (tab: string) => {
        this.setState({ activeTab: tab });
    }

    render() {
        const { children } = this.props;
        const { activeTab } = this.state;

        const classes: string[] = ["tab__list--box"];

        return (
            <div className="folder-tabs">
                <ol className={classes.join(" ")}>
                    {children.map((child: any) => {
                        const { label } = child.props;

                        return (
                            <Tab
                                activeTab={activeTab}
                                key={label}
                                label={label}
                                onClick={this.onClickTabItem}
                            />
                        );
                    })}
                </ol>
                <div className="tab-content">
                    {children.map((child: any, i: number) => {
                        if (child.props.label !== activeTab) {
                            return undefined;
                        }

                        const props = {
                            onClickTabItem: this.onClickTabItem,
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
}

export default FolderTabs;
