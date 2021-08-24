import React from "react";

import LoginFormHooks from "./LoginFormHooks";

export interface ILoginFormComponentProps {
    token?: "string";
}

const LoginForm: React.FunctionComponent<ILoginFormComponentProps> = (props) => {
    const { componentState, handleSubmit, handleInputChange } = LoginFormHooks();
    const { identifier } = componentState;

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="form__inputs">

                {/* Username or Email */}
                <label htmlFor="identifier">Username/E-mail <span className="asterisk">*</span></label>
                <input id="identifier" name="identifier" onChange={handleInputChange} value={identifier || ""} type="text" />

                {/* Password */}
                <label htmlFor="password">Password <span className="asterisk">*</span></label>
                <input id="password" onChange={handleInputChange} name="password" type="password" />

            </div>
            <span className="button button--large button--primary">
                <button type="submit">Submit</button>
            </span>
        </form>
    );
};

export default LoginForm;
