import React, { useEffect } from "react";
import WithAuthHooks from "./WithAuthHooks";


export interface IWithAuthComponentProps {
    ComponentToBeRendered: React.FunctionComponent<any>;
    isAllowed: boolean;
    otherProps?: Record<string, unknown>;
}

const WithAuth: React.FunctionComponent<IWithAuthComponentProps> = (props: IWithAuthComponentProps): React.ReactElement => {
    const { ComponentToBeRendered, otherProps } = props;
    const { validateAuthentication } = WithAuthHooks(props);

    useEffect(() => {
        validateAuthentication();
    })

    return <ComponentToBeRendered {...otherProps} />;
}

export default WithAuth;
