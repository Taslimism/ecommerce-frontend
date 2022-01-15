import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

import style from './Profile.module.css';
import Order from './Order'

const Profile = () => {

    const [orderData, setOrderData] = useState([]);


    useEffect(() => {

        (async () => {
            const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}order/${localStorage.getItem('book-userId')}`, {

                headers: {
                    'authorization': `Bearer ${localStorage.getItem('book-token')}`
                }

            })
            // console.log(data.data[0]);
            if (data.status === 'success') {

                setOrderData(data.data[0]);
            }
        })();
    }, [])

    console.log(orderData)
    return <div className={style["main-container"]}>
        {orderData && orderData.length > 0 && orderData.map(order => {
            console.log(order);
            return <Order key={uuid()} order={order} />
        })}

    </div>
}

export default Profile;