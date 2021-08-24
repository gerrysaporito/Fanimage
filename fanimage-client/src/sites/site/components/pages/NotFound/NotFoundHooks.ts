import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { invite_token } from "../../../../../common/variables/routes";

interface IComponentState {
    // Type of user registration form to redirect to
    authentication: string | null;
    token: string;
    profileType: string;
}

const NotFoundHooks = () => {
    const history = useHistory();

    const goBack = () => {
        history.goBack();
    }
    return {
        goBack,
    };
};

export default NotFoundHooks;
