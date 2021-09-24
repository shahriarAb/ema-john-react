import React, { useEffect, useState } from 'react';
import { addToLocalStorage, getData } from '../../utilities/storage';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [displayProducts, setDisplayProducts] = useState([]);

    useEffect(() => {
        fetch('./products.JSON')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setDisplayProducts(data);
            });
    }, []);

    useEffect(() => {
        if (products.length) {
            const savedCart = getData();
            const storedCart = [];
            for (const key in savedCart) {
                const addedProduct = products.find(product => product.key === key);
                if (addedProduct) {
                    const quantity = savedCart[key];
                    addedProduct.quantity = quantity;
                    storedCart.push(addedProduct);
                }
            }
            setCart(storedCart);
        }
    }, [products]);

    const handleAddToCart = product => {
        const newCart = [...cart, product]
        setCart(newCart);
        //adding items into local storage
        addToLocalStorage(product.key);
    }

    const handleSearch = (e) => {
        const searchedText = e.target.value;
        const matchedProduct = products.filter(product => product.name.toLowerCase().includes(searchedText.toLowerCase()));
        setDisplayProducts(matchedProduct);
    }

    return (
        <>
            <div className="search-container">
                <input
                    type="text"
                    onChange={handleSearch}
                    placeholder="search for products" />
                <FontAwesomeIcon style={{ color: 'whitesmoke', marginLeft: '20px', fontSize: '20px' }} icon={faShoppingCart} />
                <p className="product-count">{cart.reduce((accumulator, current) => accumulator + (!current.quantity ? 1 : current.quantity), 0)}</p>
            </div>
            <div>
                <div className="shop-container">
                    <div className="product-container">
                        <h2>Products</h2>
                        {
                            displayProducts.map(product => <Product
                                key={product.key}
                                product={product}
                                handleAddToCart={handleAddToCart}
                            ></Product>)
                        }
                    </div>
                    <div className="cart-container">
                        <div className="top-title">
                            <Cart cart={cart}></Cart>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Shop;