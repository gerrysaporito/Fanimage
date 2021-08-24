import React from "react";
import { Link } from "react-router-dom";
import { DATE_FORMAT, formatDate } from "../../../../../common/middleware/dates";
import { module_identifier } from "../../../../../common/variables/routes";
import Card from "../../../../site/components/reusable/Card/Card";
import ModulesListItemForm from "../../../containers/forms/listItemsForms/ModulesListItemForm/ModulesListItemForm";
import { IModuleAttributes } from "../../../containers/forms/listItemsForms/ModulesListItemForm/ModulesListItemFormHooks";
import { IMAGE_REPOSITORY_ROUTES } from "../../../containers/misc/Routes/routes";
import ModulesListItemHooks from "./ModulesListItemHooks";

interface IModulesListItemComponentProps extends IModuleAttributes {
    // Removes a module from the organization
    handleRemoveModule?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    // Updates the list of modules
    fetchModulesData: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    // Updates the list
    handleListStateChange: () => void;
    // Shows buttons to modify posting
    showButtons: boolean;
}


/*
 * Item for the ModuleList
 */
const ModulesListItem: React.FunctionComponent<IModulesListItemComponentProps> = (props: IModulesListItemComponentProps): React.ReactElement => {
    const { handleRemoveModule, showButtons } = props;
    const { componentState, handleEditFormStateChange } = ModulesListItemHooks();
    const { createdAt, id, resourceUrl, title, url } = props;

    if (componentState.editing) {
        return (
            <div className="modules-list-item--border-bottom">
                <ModulesListItemForm
                    handleFormStateChange={handleEditFormStateChange}
                    edit
                    {...props}
                />
            </div>
        );
    }

    const redirectUrl = IMAGE_REPOSITORY_ROUTES.viewModule.route.replace(`:${module_identifier}`, id ? id.toString() : "");

    return (
        <Card>
            <div className="modules-list-item" >
                <Link to={redirectUrl}>
                    <img className="modules-list-item--image" src={url} alt={title} />
                </Link>

                <div className="modules-list-item__info">
                    <span className="modules-list-item__title">
                        <Link to={redirectUrl}>{title}</Link>
                    </span>
                    <span className="modules-list-item__created-at">{formatDate(createdAt, DATE_FORMAT.SLASH)}</span>

                    {showButtons ?
                        (
                            <span className="modules-list-item__buttons">
                                <button onClick={handleEditFormStateChange}><i className="far fa-edit" /></button>
                                <button onClick={handleRemoveModule}><i className="far fa-trash-alt" /></button>
                            </span>
                        ) : (
                            <span></span>
                        )
                    }
                </div>

            </div >
        </Card>
    );
};

export default ModulesListItem;
