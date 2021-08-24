import React from "react";

export interface IUserRegisterFormInputs {
    // User related attributes
    email?: string;
    password?: string;
    confirmPassword?: string;
}

interface IUserRegisterFormInputsComponentProps extends IUserRegisterFormInputs {
    // Function to update inputs
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserRegisterFormInputs: React.FunctionComponent<IUserRegisterFormInputsComponentProps> = (props: IUserRegisterFormInputsComponentProps): React.ReactElement => {
    const { handleInputChange, email } = props;

    return (
        <React.Fragment>
            {/* Email */}
            <label htmlFor="email">Email <span className="asterisk">*</span></label>
            <input required id="email" name="email" onChange={handleInputChange} value={email || ""} type="text" />

            {/* Password & Confirm Password */}
            <div className="form__double">
                <div className="form__double--half">
                    <label htmlFor="password">Password <span className="asterisk">*</span></label>
                    <input required id="password" onChange={handleInputChange} name="password" type="password" />
                </div>
                <div className="form__double--half">
                    <label htmlFor="confirmPassword">Confirm Password <span className="asterisk">*</span></label>
                    <input required id="confirmPassword" onChange={handleInputChange} name="confirmPassword" type="password" />
                </div>
            </div>

        </React.Fragment>
    );
};

export default UserRegisterFormInputs;