import React from "react";
import { ALERT_TYPES } from "../../../../../store/actions/alert";

import AlertHooks from "./AlertHooks";

const Alert: React.FunctionComponent = (): React.ReactElement => {
    const { alertState, history, closeAlert, handleCloseAlert } = AlertHooks();
    const { message, type } = alertState;

    if (!message || !type) {
        return <div></div>;
    }

    setTimeout(() => {
        closeAlert();
    }, 30000)

    history.listen(() => {
        closeAlert();
    });

    let color = "";

    switch (type) {
        case ALERT_TYPES.ERROR: {
            color += "danger";
            break;
        }
        case ALERT_TYPES.SUCCESS: {
            color += "success";
            break;
        }
        default: {
            return (<div />);
        }
    }

    return (
        <div className={`alert-box ${`alert-box--color-${color}`}`}>
            <div className="alert__inner">
                <p>
                    {message ? message : "Something went wrong"}
                </p>
                <button onClick={handleCloseAlert}><i className="fas fa-times button--close" /></button>
            </div>
        </div>
    );
}

export default Alert;
