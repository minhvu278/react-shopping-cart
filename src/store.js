import {createStore, applyMiddleware, combineReducers, compose} from "redux";
import thunk from "redux-thunk";
import {productsReducer} from "./reducers/productReducers";
import {cartReducers} from "./reducers/cartReducers";
import {orderReducer} from "./reducers/orderReducer";

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    combineReducers({
        products: productsReducer,
        cart: cartReducers,
        order: orderReducer
    }),
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);
export default store