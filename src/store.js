import {createStore, applyMiddleware, combineReducers, compose} from "redux";
import thunk from "redux-thunk";
import {productsReducer} from "./reducers/productReducers";

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENDSION_COMPOSE__ || compose;
const store = createStore(
    combineReducers({
        product: productsReducer
    }),
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);
export default store