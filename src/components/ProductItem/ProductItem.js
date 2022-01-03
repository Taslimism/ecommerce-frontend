import React, { useState, useEffect, useRef, useContext } from 'react';
import { v4 as uuid } from 'uuid';
import styles from './ProductItem.module.css';

import Review from './Review'

import axios from 'axios';

import AuthContext from './../../store/AuthContext'

let cart = [];
const ProductItem = (prop) => {
    const ctx = useContext(AuthContext);

    const reviewElement = useRef();
    const ratingElement = useRef();
    const [product, setProduct] = useState([]);
    const [reviews, setReviews] = useState([]);

    const authorName = prop.authorName;
    const productId = prop.productId;

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!ctx.isLoggedIn) {
            window.location = '/form/login';
        }
        try {
            const review = { review: reviewElement.current.value, rating: ratingElement.current.value };
            console.log(ctx);
            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}products/review/${authorName}/${productId}`, { ...review, user_id: ctx.user_id }, {
                'headers': {
                    'authorization': `Bearer ${localStorage.getItem('book-token')}`
                }
            });
            setReviews(data.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        cart = JSON.parse(localStorage.getItem('cart'));
        console.log(cart);
    }, [])

    const cartHandler = async () => {

        try {
            if (ctx.isLoggedIn) {
                const cartData = { user_id: ctx.user_id, product_id: productId, quantity: 1 };
                const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}cart`, cartData);
                alert("Item added to cart");
            } else {

                if (cart && cart.length > 0) {
                    let isOldItem = false;
                    cart.forEach(cartItem => {
                        if (cartItem.product_id === productId) {
                            cartItem.quantity = 1;
                            isOldItem = true;
                        }
                    })
                    if (!isOldItem) {
                        cart.push({ product_id: productId, quantity: 1 });
                    }
                } else {
                    cart.push({ product_id: productId, quantity: 1 });
                }

                localStorage.setItem('cart', JSON.stringify(cart))
                console.log(localStorage.getItem('cart'));
                alert("Item added to cart");
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}products/review/${authorName}/${productId}`);
            setReviews(data);
        })();

    }, []);

    useEffect(() => {
        try {
            (async () => {
                const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}products/${authorName}/${productId}`);
                setProduct(data.data.product);
            })();
        } catch (err) {
            console.log(err);
        }
    }, [authorName, productId]);

    return <div className={styles["super-container"]}>
        <div className={styles["main-container"]} >
            <div className={styles["top-container"]}>
                <div className={styles["img-container"]}>
                    <img src={product.thumbnail} alt="thumbnail" />
                </div>
                <div className={styles["info-container"]}>
                    <p className={styles.name}>name : {product.title} </p>
                    <p className={styles.about}>about : {product.subtitle} </p>
                    <p className={styles.price}>price : &#8377; {product.price}</p>
                    <p className={styles.authorName}>author : {product.author} </p>
                </div>
                <div className={styles["button-container"]}>
                    <button onClick={cartHandler} className={styles["btn"]}>add to cart</button>
                </div>
            </div>
            <hr />
            <div className={styles["description-container"]}>
                <p>{product.description}</p>
            </div>
            <hr />
            <form className={styles.form} onSubmit={submitHandler} >
                <div className={styles["rating-container"]}>
                    <h3 className={styles["rating-title"]}>Rating</h3>
                    <select ref={ratingElement} /*value={review.rating} onChange={handleChange}*/ className={styles.select} name="rating">
                        <option value={+1}>⭐</option>
                        <option value={+2}>⭐⭐</option>
                        <option value={+3}>⭐⭐⭐</option>
                        <option value={+4}>⭐⭐⭐⭐</option>
                        <option value={+5}>⭐⭐⭐⭐⭐</option>
                    </select>
                </div>
                <div className={styles["review-container"]}>
                    <h3 className={styles["review-title"]}>Review</h3>
                    <textarea ref={reviewElement} /*value={review.review} onChange={handleChange}*/ name="review" className={styles.textarea} type="text" />

                </div>
                <button className={styles.submit}>Submit</button>
            </form>
            {
                reviews && reviews.map(review => <Review key={uuid()} review={review} />)
            }

        </div>
    </div>

}

export default ProductItem;