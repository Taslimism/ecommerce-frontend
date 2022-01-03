import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import style from './Cart.module.css';

import AuthContext from './../../store/AuthContext';

import CartItem from './CartItem';
import PaymentButton from './../PaymentButton/PaymentButton';

let priceTotal = 0;
const Cart = () => {
    const ctx = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState();

    useEffect(() => {
        (async () => {
            if (ctx.isLoggedIn) {
                const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}cart/${ctx.user_id}`, {
                    headers: {
                        'authorization': `Bearer ${ctx.token}`
                    }
                })
                console.log(data.data);
                if (data.data.cart.length === 0) {
                    setCartItems([])
                    return;
                } else {
                    const { cart } = data.data;
                    setCartItems(cart[0].items);
                    setTotalPrice(Number.parseInt(cart[0].price).toFixed(2));
                    console.log('logged in');

                }
            } else {
                const product = JSON.parse(localStorage.getItem('cart'));
                let productData = [];
                console.log('not logged in');
                if (product.length > 0) {
                    product.forEach(product => {
                        (async () => {
                            const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}products/authorName/${product.product_id}`)
                            productData.push(data.data);
                            setCartItems([...productData]);
                        })();

                    })

                }



            }
        })();
    }, [ctx.user_id, ctx.token, ctx.isLoggedIn])

    if (!ctx.isLoggedIn && !totalPrice) {
        priceTotal = 0;
        if (cartItems && cartItems.length > 0) {
            cartItems.forEach(item => {
                priceTotal += item.price;
            })
        }
    }

    return (
        <div className={style["cart-container"]}>
            {cartItems && cartItems.length > 0 && cartItems.map(cartItem => <CartItem key={uuid()} cartData={cartItem} />)}
            {
                totalPrice && <div className={style["payment-container"]}>
                    <h3 className={style["total"]}>Total Price: &#8377; {totalPrice}</h3>
                    <PaymentButton text={`pay now`} />
                </div>
            }
            {cartItems && !ctx.isLoggedIn && cartItems.length > 0 && !totalPrice && <div className={style["payment-container"]}>
                <h3 className={style["total"]}>Total Price: &#8377; {priceTotal}</h3>
                <PaymentButton text={`pay now`} />
            </div>}
        </div>

    );
}

export default Cart;