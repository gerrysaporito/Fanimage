import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { IUserRegisterFormInputs } from "./UserRegisterFormInputs";
import { SITE_ROUTES } from "../../misc/Routes/routes";
import { authUser } from "../../../../../store/dispatches/site/user";
import { useHistory } from "react-router-dom";


interface IComponentState extends IUserRegisterFormInputs {
    [key: string]: string | undefined | File;
}

const UserRegisterFormHooks = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [componentState, setState] = React.useState<IComponentState>({
        email: "",
        password: "",
        confirmPassword: "",
    });

    /* Handler for on form submit */
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        new Promise((resolve, reject) => {
            const res = dispatch(authUser("register", componentState))
            resolve(res)
        })
            .then((res) => {
                history.push(SITE_ROUTES.home.route);
            })
    }

    /* Handler for when a user types in a form */
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();

        setState((prevComponentState: IComponentState) => ({
            ...prevComponentState,
            [e.target.name]: e.target.value
        }));
    };

    return {
        componentState,
        handleInputChange,
        handleSubmit,
    };
};

export default UserRegisterFormHooks;
