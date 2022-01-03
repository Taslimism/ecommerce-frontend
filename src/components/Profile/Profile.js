import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

import style from './Profile.module.css';
import Order from './Order'

const Profile = () => {

    const [orderData, setOrderData] = useState([]);
    const [price, setPrice] = useState();

    useEffect(() => {

        (async () => {
            const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}order/${localStorage.getItem('book-userId')}`, {

                headers: {
                    'authorization': `Bearer ${localStorage.getItem('book-token')}`
                }

            })

            if (data.data.status === 'success') {
                setPrice(data.data[0][0].amount);
                setOrderData(data.data[0][0].items);
            }
        })();
    }, [])

    console.log(orderData)
    return <div className={style["main-container"]}>
        {orderData && orderData.length > 0 && orderData.map(order => <Order key={uuid()} order={order} />)}
        {price && <h2 className={style["message"]}>Congrats, Order Successfully placed! for &#8377; {price / 100}</h2>}
    </div>
}

export default Profile;