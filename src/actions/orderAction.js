import {CLEAR_CART, CLEAR_ORDER, CREATE_ORDER} from "../types";

export const createOrder = (order) => (dispatch) => {
    const data = {
        _id: 1,
        __v: 2,
        address: order.address,
        name: order.name,
        email: order.email,
        total: order.total,
        cartItems: order.cartItems,

    }

    dispatch({
        type: CREATE_ORDER,
        payload: data
    });
    localStorage.clear("cartItems");
    dispatch({
        type: CLEAR_CART
    });

    // fetch("api/orders", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type" : "application/json"
    //     },
    //     body: JSON.stringify(order),
    // }).then((res) => res.json()).then((data) => {
    //
    // });
};

export const clearOrder = () => (dispatch) => {
    dispatch({
        type: CLEAR_ORDER
    });
}