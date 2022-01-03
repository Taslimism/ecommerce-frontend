import React from 'react';
import { Link } from 'react-router-dom';
import style from './Header.module.css';

import Navigation from './../Navigation/Navigation'

const Header = () => {
    return <header className={style["main-header"]}>
        <div className={style["brand"]} >
            <Link className={style["brand-link"]} to="/">
                <img className={style["logo"]} src="/images/icon-bookshelf.png" alt="logo" />
            </Link>
            <Link className={style["brand-link"]} to="/">
                <h1 className={style["brand-name"]}>bookshelf</h1>
            </Link>
        </div>
        <Navigation />
    </header>

}

export default Header;