import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { IMatchParams, module_identifier } from "../../../../../common/variables/routes";
import { getModuleByModuleId } from "../../../../../store/dispatches/imageRepository/module";

interface IComponentState {
    // Id of module
    moduleId: string;
    // Module information
    moduleInfo: any;
    // AWS Response
    file: any;
}

const DisplayFileHooks = () => {
    const dispatch = useDispatch();
    const params = useParams<IMatchParams>();
    const history = useHistory();

    const [componentState, setState] = React.useState<IComponentState>({
        moduleId: params[module_identifier] || "",
        moduleInfo: {},
        file: null,
    });

    const previousPage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        history.goBack();
    };

    const fetchData = async () => {
        const moduleResp: any = await dispatch(getModuleByModuleId(componentState.moduleId || ""));

        if (moduleResp) {
            setState((prevComponentState: IComponentState) => ({
                ...prevComponentState,
                moduleInfo: moduleResp.moduleInfo,
                file: moduleResp.file,
            }));
        }
    };

    return {
        componentState,
        fetchData,
        previousPage,
    };
};

export default DisplayFileHooks;
