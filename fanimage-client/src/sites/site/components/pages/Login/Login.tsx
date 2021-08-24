import React from "react";

import LoginForm from "../../../containers/forms/LoginForm/LoginForm";
import Card from "../../reusable/Card/Card";

import { SITE_ROUTES } from "../../../containers/misc/Routes/routes";

interface IComponentProps {
    themeType: string;
}

const Login: React.FunctionComponent<IComponentProps> = (props) => {
    return (
        <section className="login">
            <div className="form--card-width">
                <Card float>
                    <div className="login__card">
                        <h2>Welcome Back.</h2>
                        <LoginForm {...props} />
                    </div>
                </Card>
            </div>
        </section>
    );
};

export default Login;
