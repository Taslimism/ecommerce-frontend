import React from 'react';

import style from './Order.module.css';

const Order = (props) => {

    return <div className={style["cartitem-container"]}>
        <img src={props.order.thumbnail} alt="book-cover" />
        <div className={style["info-container"]}>
            <p>name : {props.order.title}</p>
            <p>author : {props.order.author} </p>
            <p>price : {props.order.price}</p>
            <p>quantity : {props.order.quantity} </p>
            <p>total price : {props.order.totalPrice}</p>
        </div>
    </div>
}

export default Order;