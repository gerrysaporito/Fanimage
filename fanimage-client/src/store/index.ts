import { composeWithDevTools } from 'redux-devtools-extension';

import { TActions } from "./actions/action";
import { rootReducer, IRootState } from "./reducers";
import { createStore, applyMiddleware, compose, Store } from "redux";
import thunk from "redux-thunk";
import { TDispatchType } from "./actions/dispatchType";


export const configureStore = (): Store => {

    const store: Store<IRootState, TActions> & { dispatch: TDispatchType } = createStore(
        rootReducer,
        composeWithDevTools(
            applyMiddleware(thunk),
        )
    );
    return store;
}
