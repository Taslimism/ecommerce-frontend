import React from 'react';

import style from './Order.module.css';

const Order = (props) => {

    return <>
        {
            <div className={style["order-container"]}>{
                props.order.items.map((item) => {
                    return <div className={style["cartitem-container"]}>
                        <img src={item.thumbnail} alt="book-cover" />
                        <div className={style["info-container"]}>
                            <p>name : {item.title}</p>
                            <p>author : {item.author} </p>
                            <p>price : {item.price}</p>
                            <p>quantity : {item.quantity} </p>
                            <p>total price : {item.totalPrice}</p>

                        </div>
                    </div>
                })
            }
                <h2 className={style["message"]}>Congrats, Order Successfully placed! for &#8377; {props.order.amount / 100}</h2>
            </div>
        }

    </>
}

export default Order;