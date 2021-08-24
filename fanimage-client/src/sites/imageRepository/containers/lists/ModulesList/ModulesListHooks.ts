import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addAlert, ALERT_TYPES } from "../../../../../store/actions/alert";
import { getModulesFromOrganization, removeModuleByModuleId } from "../../../../../store/dispatches/imageRepository/module";
import { IRootState } from "../../../../../store/reducers";
import { SITE_ROUTES } from "../../../../site/containers/misc/Routes/routes";

interface IComponentState {
    // List of modules under organization
    modulesList: [];
    // Form to create new module 
    showCreateForm: boolean;
    // Updates list on change
    updateList: boolean;
    // Instructional Popup
    showPopup: boolean;
}


const ModulesListHooks = () => {
    const dispatch = useDispatch();
    const { userState } = useSelector((state: IRootState) => state);

    const [componentState, setState] = React.useState<IComponentState>({
        modulesList: [],
        showCreateForm: false,
        updateList: false,
        showPopup: false,
    });

    const fetchData = async () => {
        const modulesListResp: any = await dispatch(getModulesFromOrganization());

        if (modulesListResp) {
            setState((prevComponentState: IComponentState) => {
                const showPopup = modulesListResp.length > 0 ? false : true;

                return {
                    ...prevComponentState,
                    modulesList: modulesListResp,
                    showPopup: showPopup
                };
            });
        }
    };

    const handleFormStateChange = async function () {
        if (!userState.authenticated) {
            dispatch(addAlert("Please log in or register first.", ALERT_TYPES.ERROR))
        } else {
            await setState((componentState: any) => ({
                ...componentState,
                showCreateForm: !componentState.showCreateForm,
            }));
        }
    };

    const handleListStateChange = async function () {
        await setState((componentState: any) => ({
            ...componentState,
            updateList: !componentState.updateList,
        }));
    };

    const handleRemoveModule = async function (moduleId: string | number) {
        const modulesListResp: any = await dispatch(removeModuleByModuleId(moduleId));

        if (modulesListResp) {
            await setState((componentState: any) => ({
                ...componentState,
                modulesList: modulesListResp,
            }));
        }

        handleListStateChange();
    };

    const handleInputChangeInstructionPopupState = async function () {
        await setState((prevComponentState: IComponentState) => ({
            ...prevComponentState,
            showPopup: !prevComponentState.showPopup,
        }));
    };

    return {
        componentState,
        userState,
        handleFormStateChange,
        fetchData,
        handleRemoveModule,
        handleListStateChange,
        handleInputChangeInstructionPopupState,
    };
};

export default ModulesListHooks;
