import React from "react";

import ModulesListHooks from "./ModulesListHooks";
import ModulesListItemForm from "../../forms/listItemsForms/ModulesListItemForm/ModulesListItemForm";
import ModulesListItem from "../../../components/listItems/ModulesListItem/ModulesListItem";
import Card from "../../../../site/components/reusable/Card/Card";


/*
 * Profile for a user.
 */
const ModulesList: React.FunctionComponent = (props): React.ReactElement => {
    const { componentState, userState, fetchData, handleFormStateChange, handleRemoveModule, handleListStateChange, handleInputChangeInstructionPopupState } = ModulesListHooks();
    const { modulesList } = componentState;

    React.useEffect(() => {
        fetchData();
    }, [componentState.updateList]);


    const items = modulesList.map((module: any, i: number) => {
        return <ModulesListItem
            key={module.id}
            fetchModulesData={fetchData}
            handleListStateChange={handleListStateChange}
            handleRemoveModule={handleRemoveModule.bind(null, module.id)}
            showButtons={userState?.userInfo?.id?.toString() === module.createdByUserId.toString()}
            {...module}
        />;
    });

    return (
        <div className="modules-list">

            {!componentState.showCreateForm ?
                (
                    <div className="modules-list--add-btn" >
                        <Card>
                            <button name="invites" type="button" onClick={handleFormStateChange} >Add Image</button>
                        </Card>
                    </div>
                ) : (
                    <ModulesListItemForm
                        create
                        resourceUrl=""
                        title=""
                        createdAt=""
                        tags=""
                        file={{} as File}
                        handleListStateChange={handleListStateChange}
                        handleFormStateChange={handleFormStateChange}
                    />
                )
            }

            {items.length > 0 ? (items) : (null)}

        </div>
    );
};

export default ModulesList;
