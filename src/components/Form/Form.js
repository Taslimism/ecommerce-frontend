import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import AuthContext from './../../store/AuthContext';
import axios from 'axios';

import style from './Form.module.css';

const Form = () => {
    const ctx = useContext(AuthContext);
    const [isSomethingWrong, setIsSomethingWrong] = useState(false);
    const [switchForm, setSwitchForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const path = useLocation().pathname.substring(6);

    useEffect(() => {
        if (path === 'register') {
            setSwitchForm(true);
        } else {
            setSwitchForm(false);
        }
    }, [path])
    console.log(path);

    const formDataHandler = (event) => {

        setFormData(formData => {
            return {
                ...formData,
                [event.target.name]: event.target.value
            }
        })

    }

    const submitHandler = async (event) => {
        event.preventDefault();
        let urlEndPoint;
        if (path === 'register')
            urlEndPoint = 'register';
        else
            urlEndPoint = 'login';
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}users/${urlEndPoint}`, formData);
            console.log(data.status, data);
            if (data.status === 'success') {
                const { user } = data.data;
                console.log(user._id, user.name);
                ctx.handleLogin(user.name, data.token, user._id);
                const cartItems = JSON.parse(localStorage.getItem('cart'));

                console.log(cartItems)

                if (cartItems.length > 0) {
                    cartItems.forEach(item => {
                        (async () => {
                            const cartData = { user_id: localStorage.getItem('book-userId'), product_id: item.product_id, quantity: 1 };
                            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}cart`, cartData);
                            console.log(data);
                        })();
                    })
                    localStorage.setItem('cart', JSON.stringify([]));
                }
                window.location = '/';
            }
        } catch (err) {
            setIsSomethingWrong(true);
        }
        setFormData({
            name: '',
            email: '',
            password: ''
        })
    }



    const switchFormHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (path === 'register')
            window.location = '/form/login';
        else
            window.location = 'register';
        setSwitchForm(!switchForm)

    }

    return <div className={style["form-container"]}>
        <form onSubmit={submitHandler} className={style.form}>
            <div className={style["form-title-container"]}>
                <p className={style["form-title"]}>{switchForm ? 'sign up' : 'log in'}</p>
            </div>
            <hr />
            <div className={style["input-container"]}>
                <label className={style.label} htmlFor="email">email</label>
                <input
                    onInput={formDataHandler}
                    value={formData.email}
                    className={style["input-field"]}
                    id="email"
                    type="text"
                    name="email">
                </input>
            </div>
            {switchForm && <div className={style["input-container"]}>
                <label htmlFor="name" className={style.label}>name</label>
                <input
                    onInput={formDataHandler}
                    value={formData.name}
                    className={style["input-field"]}
                    id="name"
                    type="text"
                    name="name">
                </input>
            </div>
            }
            <div className={style["input-container"]}>
                <label htmlFor="password" className={style.label}>password</label>
                <input
                    onInput={formDataHandler}
                    value={formData.password}
                    className={style["input-field"]}
                    id="password" type="password"
                    name="password">
                </input>
            </div>
            {isSomethingWrong && <div>Please use valid user id</div>}
            <div className={style["btn-container"]}>
                <button onClick={switchFormHandler} className={style["switch-btn"]}>switch to {switchForm ? 'log in' : 'sign up'}</button>
                <button className={style["submit-btn"]}>{switchForm ? 'sign up' : 'log in'}</button>
            </div>
        </form>
    </div>
}

export default Form;