import {createStore, applyMiddleware, combineReducers, compose} from "redux";
import thunk from "redux-thunk";
import {productsReducer} from "./reducers/productReducers";
import {cartReducers} from "./reducers/cartReducers";

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    combineReducers({
        products: productsReducer,
        cart: cartReducers,
    }),
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);
export default store