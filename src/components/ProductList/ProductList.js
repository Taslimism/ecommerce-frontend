import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

import styles from './ProductList.module.css';


const ProductList = (prop) => {
    const [products, setProducts] = useState([]);
    const authorName = prop.authorName;
    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}products/${authorName}`);
            setProducts(data.data);
        })();
    }, [authorName]);

    console.log(products)
    let avgRating = 0;
    if (products.length > 0) {
        let len = 0
        let sum = 0;
        products.forEach(product => {
            product.rating.forEach(product => {
                sum += product;
                len++;
            }
            )
        }); avgRating = sum / len;
    }

    return (
        <div className={styles["product-container"]}>
            {products.length > 0 && products.map((product) => {
                return (
                    <div key={uuid()} className={styles["main-container"]} >
                        <div className={styles["img-container"]}>
                            <Link to={`${product._id}`}><img src={product.thumbnail} alt="thumbnail" /></Link>
                        </div>
                        <div className={styles["info-container"]}>
                            <p className={styles.name}>name :<Link to={`${product._id}`}> {product.title}</Link></p>
                            <p className={styles.about}>about : {product.subtitle}</p>
                            <p className={styles.authorName}>author : {product.author} </p>
                            <div className={styles["rating-container"]}>
                                <p>Avg rating : <span>{avgRating || 0}</span></p>
                                <p>total rating: <span>{product.rating.length}</span></p>
                                <p>Your Rating: <span>{product.rating[0] || 0}</span></p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div >
    );
}




export default ProductList;