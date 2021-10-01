import React from 'react';
import Rating from 'react-rating';

const ReviewItem = (props) => {
    const { name, seller, price, quantity, star, img, key } = props.product;
    return (
        <div className="product">
            <div className="product-info" style={{ marginLeft: '50px' }}>
                <h3 className="product-title"><b>{name}</b></h3>
                <p className="price">Price: <b>${price}</b></p>
                <Rating
                    initialRating={star}
                    emptySymbol="far fa-star rating-color-empty"
                    fullSymbol="fas fa-star rating-color-full"
                    readonly
                ></Rating>
                <br />
                <p className="price">Quantity: <b>{quantity}</b></p>
                <p><small>by: <b>{seller}</b></small></p>
                <button
                    className="add-to-cart-btn"
                    style={{ marginTop: '50px' }}
                    onClick={() => props.handleRemove(key)}
                >Remove</button>
            </div>
            <div>
                <img src={img} alt="" />
            </div>
        </div>
    );
};

export default ReviewItem;