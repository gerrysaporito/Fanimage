import React from "react";

import NotFoundHooks from "./NotFoundHooks";

const Login: React.FunctionComponent = () => {
    const { goBack } = NotFoundHooks();

    const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        goBack();
    };

    return (
        <section className="not-found">
            <div className="not-found--container clearfix">

                <div className="not-found--logo-container">
                    <div className="not-found--image-block">
                        Sorry this page doesn't exist yet.
                        {/* <img src={NOT_FOUND_IMAGE} alt="Not Found Image" className="not-found--image" /> */}
                        <button className="not-found--back-button button button--primary" onClick={onClick}>GO BACK</button>
                    </div>
                </div>

            </div>
        </section >
    );
};

export default Login;
