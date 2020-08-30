import React, {Component} from 'react';
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import {removeFromCart} from "../actions/cartAction";
import {connect} from "react-redux"

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCheckout: false,
            name: "",
            email: "",
            address: ""
        }
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    createOrder = (e) => {
        e.preventDefault();
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartItems
        }
        this.props.createOrder(order)
    }

    render() {
        const {cartItems} = this.props
        return (
            <div>
                {cartItems.length === 0 ? <div className="cart cart-header"> Giỏ hàng trống </div> :
                    <div className="cart cart-header">Bạn có {cartItems.length} trong giỏ hàng{" "}</div>}

                <div className="cart">
                    <Fade left cascade>
                        <ul className="cart-items">
                            {cartItems.map(item => (
                                <li key={item._id}>
                                    <div>
                                        <img src={item.image} alt={item.title}/>
                                    </div>
                                    <div>
                                        <div>{item.description}</div>
                                        <div className="right">
                                            {item.price} x {item.count}
                                            <button className="button" onClick={() => this.props.removeFromCart(item)}>
                                                Remove
                                            </button>
                                        </div>

                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Fade>
                </div>
                {cartItems.length !== 0 && (
                    <div>
                        <div className="cart">
                            <div className="total">
                                <div>
                                    Tổng tiền: {" "}
                                    {cartItems.reduce((a, c) => a + c.price * c.count, 0)}
                                </div>
                                <button
                                    className="button primary"
                                    onClick={() => {
                                        this.setState({showCheckout: true})
                                    }}
                                >
                                    Thanh toán
                                </button>
                            </div>
                        </div>
                        {this.state.showCheckout && (
                            <Fade right casade>
                                <div className="cart">
                                    <form onSubmit={this.createOrder}>
                                        <ul className="form-container">
                                            <li>
                                                <label>Email</label>
                                                <input type="email"
                                                       name="email"
                                                       required
                                                       onChange={this.handleInput}
                                                />
                                            </li>
                                            <li>
                                                <label>Name</label>
                                                <input type="text"
                                                       name="name"
                                                       required
                                                       onChange={this.handleInput}
                                                />
                                            </li>
                                            <li>
                                                <label>Address</label>
                                                <input type="text"
                                                       name="address"
                                                       required
                                                       onChange={this.handleInput}
                                                />
                                            </li>
                                            <li>
                                                <button className="button primary" type="submit">Checkout</button>
                                            </li>
                                        </ul>
                                    </form>
                                </div>
                            </Fade>
                        )}
                    </div>
                )}

            </div>
        );
    }
}

export default connect((state) => ({
        cartItems: state.cart.cartItems
    }),
    removeFromCart)(Cart);