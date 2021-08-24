import React from "react";

interface IComponentState {
    // Form to create new module 
    editing: boolean;
}


const ModulesListItemHooks = () => {
    const [componentState, setState] = React.useState<IComponentState>({
        editing: false,
    });

    const handleEditFormStateChange = () => {
        setState((componentState: any) => ({
            ...componentState,
            editing: !componentState.editing
        }));
    };

    return {
        handleEditFormStateChange,
        componentState,
    };
};

export default ModulesListItemHooks;
