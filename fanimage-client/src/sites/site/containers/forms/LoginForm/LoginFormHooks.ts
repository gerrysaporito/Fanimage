import React from "react";

import { IMatchParams, invite_token } from "../../../../../common/variables/routes";
import { useDispatch } from "react-redux";
import { authUser } from "../../../../../store/dispatches/site/user";
import { useHistory, useParams } from "react-router-dom";
import { SITE_ROUTES } from "../../misc/Routes/routes";

interface IComponentState {
    identifier: string;
    password: string;
    inviteToken: string;
}


const LoginFormHooks = () => {
    const dispatch = useDispatch();
    const params = useParams<IMatchParams>();
    const history = useHistory();

    const [componentState, setState] = React.useState<IComponentState>({
        identifier: "",
        password: "",
        inviteToken: params[invite_token] || "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();

        setState((prevComponentState: IComponentState) => ({
            ...prevComponentState,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        new Promise((resolve, reject) => {
            const res = dispatch(authUser("login", componentState))
            resolve(res)
        })
            .then((res) => {
                history.push(SITE_ROUTES.home.route);
            })
    };

    return {
        componentState,
        handleInputChange,
        handleSubmit,
    };
};

export default LoginFormHooks;
