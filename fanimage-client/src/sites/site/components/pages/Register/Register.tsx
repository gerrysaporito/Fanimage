import React from "react";

import UserRegisterForm from "../../../containers/forms/UserRegisterForm/UserRegisterForm";
import Card from "../../reusable/Card/Card";


const Register: React.FunctionComponent = () => {

    return (
        <section className="register">
            <div className="form--card-width">
                <Card float>
                    <div className="register__card">
                        <h2>Ride the flying nimbus with us.</h2>
                        <UserRegisterForm />
                    </div>
                </Card>
            </div>
        </section>
    );
};

export default Register;
