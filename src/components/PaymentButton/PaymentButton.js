import React, { useContext } from 'react';
import axios from 'axios';

import styles from './PaymentButton.module.css';
import AuthContext from './../../store/AuthContext'

const loadRazorPay = () => {

    return new Promise((resolve) => {
        let script = document.createElement('script');
        script.src = "https://checkout.razorpay.com/v1/checkout.js";

        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        }
        document.getElementById('root').appendChild(script);
    })
}


const PaymentButton = (props) => {
    const ctx = useContext(AuthContext);

    const onSuccess = async (rzp_data, orderId) => {
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_BACKEND_URL}order/${orderId}`, { rzp_data: rzp_data, user_id: localStorage.getItem('book-userId') }, {
                'headers': {
                    'authorization': `Bearer ${ctx.token}`
                }
            });
            window.location = '/profile';
        } catch (err) {
            console.log(err);
        }
    }

    async function initiatePayment() {
        if (!ctx.isLoggedIn) {
            window.location = '/form/login';
            return;
        }
        const res = await loadRazorPay();
        if (!res) {
            alert('Are you online?')
            return;
        }

        await axios.post(`${process.env.REACT_APP_BACKEND_URL}order`, { user_id: `${ctx.user_id}` }, {
            'headers': {
                'authorization': `Bearer ${ctx.token}`
            }
        })
            .then(({ data }) => {
                const orderID = data.rzpOrderId;
                const options = {
                    key: process.env.REACT_APP_RZP_KEY_ID,
                    amount: data.amount,
                    currency: data.currency,
                    order_id: data.rzpOrderId,
                    name: 'bookshelf',
                    image: 'https://b-ookstore.web.app/images/icon-bookshelf.png',
                    description: 'Buy books of your favorite authors',
                    theme: {
                        color: '#010f29',
                    },
                    // modal: {
                    //     ondismiss: paymentHandlers.onDismiss || (() => { }),
                    //     escape: false,
                    // },
                    // handler: response => {
                    //     paymentHandlers.onSuccess &&
                    //         paymentHandlers.onSuccess({
                    //             ...response,
                    //             id: res.orderId,
                    //             amount: res.amount,
                    //             currency: res.currency,
                    //         });
                    // },
                    handler: function (response) {
                        onSuccess({
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature
                        }, orderID);
                        // alert(response.razorpay_payment_id);
                        // alert(response.razorpay_order_id);
                        // alert(response.razorpay_signature);
                    }
                };
                const rzp1 = new window.Razorpay(options);
                rzp1.open();
            })
    }



    return <button className={styles.button} onClick={initiatePayment}>{props.text}</button>
}

export default PaymentButton;