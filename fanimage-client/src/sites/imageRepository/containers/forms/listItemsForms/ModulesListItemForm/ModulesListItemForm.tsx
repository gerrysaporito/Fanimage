import React from "react";
import Card from "../../../../../site/components/reusable/Card/Card";

import ModulesListItemFormHooks, { IModuleAttributes } from "./ModulesListItemFormHooks";


export interface IModulesListItemFormComponentProps extends IModuleAttributes {
    // Function to hide form on exit
    handleFormStateChange: () => void;
    // Function to update list
    handleListStateChange: () => void;
    // Current user's username
    profileUsername?: string;
    // Current user's organization's username
    organizationUsername?: string;
    // Edit form
    edit?: boolean;
    // Create form
    create?: boolean;
}

/*
 * Item for the ModuleList
 */
const ModulesListItemForm: React.FunctionComponent<IModulesListItemFormComponentProps> = (props: IModulesListItemFormComponentProps): React.ReactElement => {
    const { handleFormStateChange, edit, create, id } = props;
    const { componentState, handleCreateSubmit, handleInputChange, handleEditSubmit, handleFileInputChange } = ModulesListItemFormHooks(props);

    let submitFunction: (event: React.FormEvent<HTMLFormElement>) => void = () => { return };
    let title = "";
    switch (true) {
        case edit: {
            submitFunction = handleEditSubmit(id || "");
            title = "Edit your item:";
            break;
        }
        case create: {
            submitFunction = handleCreateSubmit();
            title = "Add a new image";
            break;
        }
    }


    return (
        <Card padding="medium">
            <form onSubmit={submitFunction} className="modules-list-item-form">

                <h3>{title}</h3>

                <div className="modules-list-item-form__container" >
                    {/* Title */}
                    <label htmlFor="title">Give your file a title:</label>
                    <input required type="text" name="title" defaultValue={componentState.title || ""} onChange={handleInputChange} placeholder="Title" />

                    {/* Tags */}
                    <label htmlFor="tags" className="modules-list-item-form--label">Tag your file:</label>
                    <p className="modules-list-item-form--sub-label">Seperate with a comma.</p>
                    <input required type="text" name="tags" defaultValue={componentState.tags || ""} onChange={handleInputChange} placeholder="Title" />

                    {/* Upload */}
                    {create && (
                        <React.Fragment>
                            <p className="modules-list-item-form--drop-zone-label">Upload an image:</p>
                            <div className="modules-list-item-form--drop-zone">
                                <label htmlFor="file" className="file-input-label">
                                    <span className="modules-list-item-form--drop-zone-inner-label">Upload Content</span>
                                    <span className="modules-list-item-form--drop-zone-upload-icon"><i className="fas fa-cloud-upload-alt" /></span>
                                    <input required id="file" type="file" name="file" onChange={handleFileInputChange} hidden />
                                </label>
                            </div>
                            <p className="modules-list-item-form--drop-zone-file-name">{componentState.file.name}</p>
                        </React.Fragment>
                    )}
                </div>

                <span className="button button--primary button--large">
                    <button>POST</button>
                </span>

                <span className="close">
                    <button onClick={handleFormStateChange}><i className="fas fa-times button--close" /></button>
                </span>
            </form >
        </Card>
    );
};

export default ModulesListItemForm;
