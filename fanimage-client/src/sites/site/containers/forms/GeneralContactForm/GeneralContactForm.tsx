import React from "react";

import GeneralContactFormHooks, { GENERAL_CONTACT_FORM_TYPES } from "./GeneralContactFormHooks";

export interface IGeneralContactFormComponentProps {
    type: GENERAL_CONTACT_FORM_TYPES;
}

const GeneralContactForm: React.FunctionComponent<IGeneralContactFormComponentProps> = (props: IGeneralContactFormComponentProps): React.ReactElement => {
    const { componentState, handleSubmit, handleInputChange, handleTextareaChange } = GeneralContactFormHooks(props);
    const { email, message } = componentState;

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="register__form">
                <div className="register__card__inputs">

                    {/* Email */}
                    <label htmlFor="email">Email <span className="asterisk">*</span></label>
                    <input id="email" name="email" onChange={handleInputChange} value={email || ""} type="text" placeholder="Email" />

                    {/* Message */}
                    <label htmlFor="name">Type your message here <span className="asterisk">*</span></label>
                    <textarea id="message" name="message" onChange={handleTextareaChange} value={message || ""} placeholder="Hi I want to learn more about..." />

                </div>
                <div className="register__card__button">
                    <span className="button button--large button--primary">
                        <button type="submit">Submit</button>
                    </span>
                </div>
            </div>
        </form>
    );
};

export default GeneralContactForm;
