import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css'
import Rating from 'react-rating';

const Product = (props) => {
    const { name, img, seller, price, stock, star } = props.product;
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div className="product-info">
                <h3 className="product-title">{name}</h3>
                <p><small>by: {seller}</small></p>
                <p className="price">Price: ${price}</p>
                <Rating
                    initialRating={star}
                    emptySymbol="far fa-star rating-color-empty"
                    fullSymbol="fas fa-star rating-color-full"
                    readonly
                ></Rating>
                <p><small>only {stock} left in stock - order soon</small></p>
                <button
                    className="add-to-cart-btn"
                    onClick={() => props.handleAddToCart(props.product)}
                ><FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>
            </div>
        </div>
    );
};

export default Product;