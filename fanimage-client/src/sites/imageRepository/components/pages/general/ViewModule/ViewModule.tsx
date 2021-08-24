import React from "react";
import DisplayFile from "../../../../containers/misc/DisplayFile/DisplayFile";

/*
 * Page with tabs to see the people associated with the organization.
 */
const ViewModule: React.FunctionComponent = (): React.ReactElement => {

    return (
        <section className="view-module" >
            <DisplayFile />
        </section>
    );
};

export default ViewModule;
