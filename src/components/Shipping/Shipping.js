import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import useCart from '../hooks/useCart';
import { clearTheCart } from '../../utilities/storage';
import useProducts from '../hooks/useProducts';
import './Shipping.css';
import { getData } from '../../utilities/storage';
import { useHistory } from 'react-router';

const Shipping = () => {
    const { user } = useAuth();
    const history = useHistory();
    const [products] = useProducts();
    const [, setCart] = useCart(products);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const savedCart = getData();
        data.orders = savedCart;

        fetch('https://ancient-reef-85789.herokuapp.com/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result.insertedId) {
                    alert('Request accepted!');
                    setCart([]);
                    clearTheCart();
                    history.push('/placeorder');
                }
            })
    };
    return (
        <div className="shipment-container">
            <div>
                <h2>Shipment page</h2>
                <form className="shipping-form" onSubmit={handleSubmit(onSubmit)}>
                    <input defaultValue={user.displayName} {...register("name")} />
                    <input defaultValue={user.email} {...register("email")} />
                    <input placeholder="Shipping address" {...register("address", { required: true })} />
                    {errors.address && <span className="error">This field is required</span>}
                    <input placeholder="Phone Number" {...register("phone_number", { required: true })} />
                    {errors.phone_number && <span className="error">This field is required</span>}
                    <br />
                    <span>Payment Options:</span>
                    <br />
                    <select className="payment-method" {...register("Payment Method")}>
                        <option value="Visa Master Card">Visa Master Card</option>
                        <option value="Mobile Banking">Mobile Banking</option>
                        <option value="Cash On Delivery">Cash On Delivery</option>
                    </select>
                    <input className="add-to-cart-btn submit" type="Submit" />
                </form>
            </div>
        </div>
    );
};

export default Shipping;