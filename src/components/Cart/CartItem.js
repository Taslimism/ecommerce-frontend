import React from 'react';
import style from './CartItem.module.css';

const CartItem = (props) => {



    return (
        <div className={style["cartitem-container"]}>
            <img src={props.cartData.thumbnail} alt="book-cover" />
            <div className={style["info-container"]}>
                <p>name : {props.cartData.title}</p>
                <p>author : {props.cartData.author} </p>
                <p>price : {props.cartData.price}</p>
                <p>quantity : {props.cartData.quantity} </p>
                <p>total price : {props.cartData.totalPrice}</p>
            </div>
        </div>
    );
}

export default CartItem;