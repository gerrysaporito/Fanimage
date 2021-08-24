import jwtDecode from "jwt-decode";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom";

import App from "./sites/Headquarters/App";
import * as serviceWorker from "./serviceWorker";
import { configureStore } from "./store";
import { setCurrentUser } from "./store/actions/user";
import { setAuthorizationToken } from "./store/dispatches/site/user";

import "./index.scss";
import { setTheme } from "./store/actions/theme";

const store = configureStore();

if (localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken);
    try {
        const jwtTokenStorage = jwtDecode(localStorage.jwtToken) as Record<string, any>;
        store.dispatch(setCurrentUser(jwtTokenStorage.userInfo));
        store.dispatch(setTheme(localStorage.theme || ""));

    } catch (err) {
        store.dispatch(setCurrentUser());
    }
}

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </Router>
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
