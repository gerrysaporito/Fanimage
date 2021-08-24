import React from "react";
import { DATE_FORMAT, formatDate } from "../../../../../common/middleware/dates";
import DisplayFileHooks from "./DisplayFileHooks";



/*
 * Profile for a user.
 */
const DisplayFile: React.FunctionComponent = (): React.ReactElement => {
    const { componentState, fetchData, previousPage } = DisplayFileHooks();
    const { moduleInfo } = componentState;
    const { title, tags, updatedAt } = moduleInfo;

    React.useEffect(() => {
        fetchData();
    }, []);

    const url = componentState.file || "";

    return (
        <section className="display-file">
            <div className="display-file__header">
                <h2>{title}</h2>
                <button className="back-btn" onClick={previousPage}><i className="fas fa-arrow-left" /> GO BACK</button>
            </div>
            <div className="display-file--info">
                {tags && (<p className="display-file__tags">Tags: {tags.join(", ")}</p>)}
                {updatedAt && (<p className="display-file__updated-time">Last Updated: {formatDate(updatedAt, DATE_FORMAT.SLASH)}</p>)}
            </div>
            <img className="file-viewer" src={url} />
        </section>
    );
};

export default DisplayFile;
