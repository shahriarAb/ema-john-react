import React, { useEffect, useState } from 'react';
import { addToLocalStorage, clearTheCart } from '../../utilities/storage';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import useCart from '../hooks/useCart';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useCart(products);
    //products to render on UI
    const [displayProducts, setDisplayProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const size = 10;

    useEffect(() => {
        fetch(`https://ancient-reef-85789.herokuapp.com/products?page=${page}&&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                setDisplayProducts(data.products);
                const count = data.count;
                const pageNumbers = Math.ceil(count / size);
                setPageCount(pageNumbers);
            });
    }, [page]);

    const handleAddToCart = product => {
        let newCart = [];
        const exists = cart.find(pd => pd.key === product.key);
        if (exists) {
            const rest = cart.filter(pd => pd.key !== product.key);
            exists.quantity += 1;
            newCart = [...rest, exists];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
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
                <p style={{ color: 'whitesmoke' }} className="product-count">{cart.reduce((accumulator, current) => accumulator + (!current.quantity ? 1 : current.quantity), 0)}</p>
            </div>
            <div className="shop-container">
                <div id="products" className="product-container">
                    <h2>Products</h2>
                    {
                        displayProducts.map(product => <Product
                            key={product.key}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        ></Product>)
                    }

                    <div className="pagination">
                        {
                            [...Array(pageCount).keys()]
                                .map(number => <a href="#products">
                                    <button
                                        className={number === page ? 'selected' : ''}
                                        key={number}
                                        onClick={() => setPage(number)}
                                    >{number + 1}</button>
                                </a>)
                        }
                    </div>
                </div>
                <div className="cart-container">
                    <div className="top-title">
                        <Cart cart={cart}>
                            <Link to="/review">
                                <button
                                    className="add-to-cart-btn"
                                >Review Your Order</button>
                            </Link>
                            <button
                                className="clear-btn"
                                onClick={() => {
                                    clearTheCart();
                                    setCart([]);
                                }}
                            >Clear Cart</button>
                        </Cart>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Shop;