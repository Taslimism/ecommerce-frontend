import React, { useContext } from 'react';
import { Link } from 'react-router-dom';


import AuthContext from './../../store/AuthContext';
import CartIcon from './../Cart/CartIcon';


import style from './Navigation.module.css';

const Navigation = () => {
    const ctx = useContext(AuthContext);


    return <div className={style["main-header"]}>
        <Link to='/cart'>
            <CartIcon />
        </Link>

        {!ctx.isLoggedIn && <Link to="/form/register">
            <button className={style["btn"]}>sign up</button>
        </Link>}

        {!ctx.isLoggedIn &&
            <Link to="/form/login">
                <button className={style["btn"]}>log in</button>
            </Link>
        }

        {ctx.isLoggedIn && <Link to='/profile'> <button className={style["btn"]}>profile</button></Link>}
        {ctx.isLoggedIn && <button onClick={ctx.handleLogout} className={style["btn"]}>log out</button>}
    </div>

}

export default Navigation;