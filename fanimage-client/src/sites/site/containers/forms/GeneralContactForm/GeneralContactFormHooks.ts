import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { generalContactUs } from "../../../../../store/dispatches/site/contact";

import { IRootState } from "../../../../../store/reducers";
import { IGeneralContactFormComponentProps } from "./GeneralContactForm";


export enum GENERAL_CONTACT_FORM_TYPES {
    GENERAL = "GENERAL",
    DEMO = "DEMO"
}

interface IComponentState {
    // Contact for user
    email: string;
    // Message to send to us
    message: string
}

const GeneralContactFormHooks = (props: IGeneralContactFormComponentProps) => {
    const { userInfo } = useSelector((state: IRootState) => state.userState);
    const dispatch = useDispatch();

    const [componentState, setState] = React.useState<IComponentState>({
        email: userInfo?.email || "",
        message: ""
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(generalContactUs(componentState));

        setState((prevState: IComponentState) => ({
            ...prevState,
            email: "",
            message: "",
        }));

    };
    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.persist();

        setState((prevState: IComponentState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();

        setState((prevState: IComponentState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    return {
        componentState,
        handleSubmit,
        handleInputChange,
        handleTextareaChange,
    };
};

export default GeneralContactFormHooks;
