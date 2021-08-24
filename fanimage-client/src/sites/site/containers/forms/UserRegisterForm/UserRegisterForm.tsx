import React from "react";

import UserRegisterFormHooks from "./UserRegisterFormHooks";
import UserRegisterFormInputs from "./UserRegisterFormInputs";


/*
 * React form component to handle a user registration. 
 */
const UserRegisterForm: React.FunctionComponent = (): React.ReactElement => {
    const { componentState, handleSubmit, handleInputChange } = UserRegisterFormHooks();

    const formInputs = (
        <div className="user-register-form">
            <div className="form__inputs">
                <UserRegisterFormInputs {...componentState} handleInputChange={handleInputChange} />
            </div>
            <span className="button button--large button--primary">
                <button type="submit">Register</button>
            </span>
        </div >
    );

    return (
        <form className="form" onSubmit={handleSubmit}>
            {formInputs}
        </form>
    );
};

export default UserRegisterForm;
