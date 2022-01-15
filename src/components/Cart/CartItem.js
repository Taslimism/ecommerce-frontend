import React, { useRef } from 'react';
// import axios from 'axios';

// import AuthContext from '../../store/AuthContext';

import style from './CartItem.module.css';

const CartItem = (props) => {
    // const ctx = useContext(AuthContext);
    const cartItem = useRef();

    // const deleteHandler = async () => {

    //     const uid = ctx.user_id;
    //     const pid = cartItem.current.value;
    //     if (ctx.isLoggedIn) {
    //         const { data } = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}cart/${pid}/${uid}`);

    //         console.log(data);
    //         window.reload();
    //     } else {

    //     }
    // }

    return (
        <div className={style["cartitem-container"]}>
            <img src={props.cartData.thumbnail} alt="book-cover" />
            <div className={style["info-container"]}>
                <p>name : {props.cartData.title}</p>
                <p>author : {props.cartData.author} </p>
                <p>price : {props.cartData.price}</p>
                <p>quantity : {props.cartData.quantity} </p>
                <p>total price : {props.cartData.totalPrice}</p>
                <input ref={cartItem} type="hidden" value={props.cartData["_id"]} />
            </div>
            {/* <div className={style["delete-icon"]} onClick={deleteHandler}>
                <img src="/images/icon-delete.svg" alt="delete icon" />
            </div> */}
        </div>
    );
}

export default CartItem;