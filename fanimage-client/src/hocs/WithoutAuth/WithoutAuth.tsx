import React, { useEffect } from "react";

import WithoutAuthHooks from "./WithoutAuthHooks";


export interface IWithoutAuthComponentProps {
    ComponentToBeRendered: React.FunctionComponent<any>;
    isAllowed: boolean;
    otherProps: Record<string, unknown>;
}

const WithoutAuth: React.FunctionComponent<IWithoutAuthComponentProps> = (props: IWithoutAuthComponentProps): React.ReactElement => {
    const { ComponentToBeRendered, otherProps } = props;
    const { validateAuthentication } = WithoutAuthHooks(props);

    useEffect(() => {
        validateAuthentication();
    })

    return <ComponentToBeRendered {...otherProps} />;
}

export default WithoutAuth;
