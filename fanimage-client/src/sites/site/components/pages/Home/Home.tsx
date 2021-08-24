import React from "react";

import ModulesList from "../../../../imageRepository/containers/lists/ModulesList/ModulesList";
import Card from "../../reusable/Card/Card";

const Home: React.FunctionComponent = () => {
    const title = "Your favourite fan-made anime and shiba inu images."
    const subTitle = "Made by the community, for the community."

    return (
        <section className="home">
            <Card>
                <div className="list--headers">
                    <h5 className="list--headers-title">{title}</h5>
                    <p className="list--headers-sub-title">{subTitle}</p>
                </div>
            </Card>

            <ModulesList />
        </section>
    );
};

export default Home;
