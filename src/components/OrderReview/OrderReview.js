import React from 'react';
import { useHistory } from 'react-router';
import { removeFromLocalStorage } from '../../utilities/storage';
import Cart from '../Cart/Cart';
import useCart from '../hooks/useCart';
import ReviewItem from '../ReviewItem/ReviewItem';

const OrderReview = () => {
    const [cart, setCart] = useCart();
    const history = useHistory();

    const handleRemove = key => {
        const newCart = cart.filter(product => product.key !== key);
        removeFromLocalStorage(key);
        setCart(newCart);
    }

    const handleProceedToPay = () => {
        history.push('/shipping');
    }
    return (
        <div>
            <div className="shop-container">
                <div className="product-container">
                    <h2>Products you ordered:</h2>
                    {
                        cart.map(product => <ReviewItem
                            key={product.key}
                            product={product}
                            handleRemove={handleRemove}
                        ></ReviewItem>)
                    }
                </div>
                <div className="cart-container">
                    <div className="top-title">
                        <Cart cart={cart}>
                            <button
                                className="add-to-cart-btn"
                                onClick={handleProceedToPay}
                            >Proceed to Pay</button>
                        </Cart>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderReview;