import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAlert, ALERT_TYPES } from "../../../../../../store/actions/alert";

import { createModuleForOrganization, editModuleByModuleId } from "../../../../../../store/dispatches/imageRepository/module";
import { IRootState } from "../../../../../../store/reducers";
import { IModulesListItemFormComponentProps } from "./ModulesListItemForm";


interface IComponentState extends IModuleAttributes {
    [key: string]: string | undefined | File;
}

export interface IModuleAttributes {
    // Form Attributes
    title: string;
    file: File;
    tags: string;
    // Module attributes
    createdAt?: string;
    createdByUserId?: string;
    fileType?: string;
    id?: string;
    resourceUrl?: string;
    s3key?: string;
    updatedAt?: string;
    url?: string;
}

const ModulesListItemFormHooks = (props: IModulesListItemFormComponentProps) => {
    const dispatch = useDispatch();
    const { userState: { userInfo } } = useSelector((state: IRootState) => state)

    const [componentState, setState] = React.useState<IComponentState>({
        title: props.title || "",
        tags: props.tags || "",
        file: props.file || {} as File,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e) {
            e.persist();
            e.preventDefault();

            setState((componentState: any) => ({
                ...componentState,
                [e.target.name]: e.target.value
            }));
        }
    };

    const handleCreateSubmit = () => async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", componentState.file);
        formData.append("email", userInfo?.email || "");

        Object.keys(componentState)
            .filter((key: string) => key.toLowerCase() !== "file")
            .forEach((key: string) => {
                formData.append(key, componentState[key] || "");
            });

        await dispatch(createModuleForOrganization(formData));

        setState({
            ...componentState,
            link: "",
            text: "",
            title: "",
            file: {} as File,
            type: "",
        });

        props.handleFormStateChange();
        props.handleListStateChange();
    };

    const handleEditSubmit = (moduleId: string) => async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await dispatch(editModuleByModuleId(moduleId, componentState));

        props.handleFormStateChange();
        props.handleListStateChange();
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();

        if (maxSelectFile(e) && checkMimeType(e) && checkFileSize(e)) {
            setState((prevComponentState: IComponentState) => ({
                ...prevComponentState,
                // Don't touch -- not sure why this works but it does
                file: e.target.files ? e.target.files[0] : prevComponentState.file,
            }));
        }
    };

    const maxSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files || [];
        if (files.length > 1) {
            const err = "Only 1 file can be uploaded at a time";
            dispatch(addAlert(err, ALERT_TYPES.ERROR));
            e.target.value = "";
            return false;
        }
        return true;
    };

    const checkMimeType = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files || [];
        let err = "";
        // list of allowed mime type
        const types = ["application/pdf", "image/png", "image/jpeg", "image/gif"];

        for (let x = 0; x < files.length; x++) {
            // compare file type find doesn't matach
            if (types.every(type => files[x].type !== type)) {
                err += files[x].type + " is not a supported format\n";
            }
        }

        if (err !== "") {
            e.target.value = "";
            dispatch(addAlert(err, ALERT_TYPES.ERROR));
            return false;
        }
        return true;
    };

    const checkFileSize = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files || [];
        const megabyte = 10;
        const size = 1024 * 1024 * megabyte;
        let err = "";

        for (let x = 0; x < files.length; x++) {
            if (files[x].size > size) {
                err += files[x].type + `is too large, please pick a file smaller than ${megabyte}mb\n`;
            }
        }

        if (err !== "") {
            e.target.value = "";
            dispatch(addAlert(err, ALERT_TYPES.ERROR));
            return false;
        }

        return true;

    };


    return {
        componentState,
        handleInputChange,
        handleCreateSubmit,
        handleEditSubmit,
        handleFileInputChange,
    };
};

export default ModulesListItemFormHooks;
