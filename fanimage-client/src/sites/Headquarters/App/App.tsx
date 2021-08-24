import React from "react";

import Alert from "../../site/containers/misc/Alert/Alert";
import Navbar from "../../site/containers/misc/Navbar/Navbar";
import Footer from "../../site/components/misc/Footer/Footer";
import { styles__theme } from "./atoms";
import AppHooks from "./AppHooks";
import { THEME_TYPES } from "../../../store/actions/theme";
import generateRoutes from "../Routes/generateRoutes";
import { Switch } from "react-router-dom";


const App: React.FunctionComponent = (): React.ReactElement => {
    const { themeState } = AppHooks();

    const routes = generateRoutes();

    return (
        <div style={styles__theme} className={`theme--${themeState.type || THEME_TYPES.RETRO}`}>
            <div className="app">
                <Navbar />
                <div className="content">
                    <Alert />

                    <Switch>
                        {routes}
                    </Switch>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default App;
