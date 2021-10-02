import React from 'react';
import image from "../../images/giphy.gif";

const PlaceOrder = () => {
    return (
        <div className="App">
            <h3>Congrats your order has been Accepted.</h3>
            <img src={image} alt="" />
        </div>
    );
};

export default PlaceOrder;