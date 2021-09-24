import React from 'react';
import { clearTheCart } from '../../utilities/storage';
import './Cart.css';

const Cart = props => {
    const { cart } = props;
    const itemsOrdered = cart.reduce((accumulator, current) => accumulator + (!current.quantity ? 1 : current.quantity), 0);
    const items = cart.reduce((accumulator, current) => accumulator + current.price * (!current.quantity ? 1 : current.quantity), 0);
    const shipping = cart.reduce((accumulator, current) => accumulator + current.shipping * (!current.quantity ? 1 : current.quantity), 0);
    const totalBeforeTax = items + shipping;
    const estimatedTax = totalBeforeTax * 0.15; //let 15% tax included
    const orderTotal = totalBeforeTax + estimatedTax;

    return (
        <div>
            <h3>Order Summury</h3>
            <p>Items Ordered: {itemsOrdered}</p>
            <table>
                <tr>
                    <td>Items:</td>
                    <td>${items.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Shipping & Handling:</td>
                    <td>${shipping.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Total before Tax:</td>
                    <td>${totalBeforeTax.toFixed(2)}</td>
                </tr>
                <tr>
                    <td >Extimated Tax:</td>
                    <td>${estimatedTax.toFixed(2)}</td>
                </tr>
                <tr className="order-total">
                    <td>Order Total:</td>
                    <td>${orderTotal.toFixed(2)}</td>
                </tr>
            </table>
            <button
                className="clear-btn"
                onClick={() => {
                    clearTheCart();
                    window.location.reload()
                }}
            >Clear Cart</button>
        </div>
    );
};

export default Cart;