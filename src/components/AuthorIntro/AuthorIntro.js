import React from 'react';
import { Link } from 'react-router-dom'
import style from './AuthorIntro.module.css';

const AuthorIntro = () => {


    return <>
        <div className={style.subheading}>
            <h2 className={style["subheading-text"]}>get books of your favorite authors -
                <span className={style["subheading-info"]}>more authors coming soon</span>
            </h2>
        </div>
        <div className={style["main-container"]}>
            <div className={style.overview}>
                <Link to="/taleb">
                    <button className={style.btnt}>buy taleb's book</button>
                </Link>
            </div>
            <div className={style["img-container-t"]}>
                <img className={style.img} src="/images/taleb.jpg" alt="author Taleb" />
            </div>
            <div className={style["img-container-k"]}>
                <img className={style.img} src="/images/knuth.jpeg" alt="author Knuth" />
            </div>
            <div className={style.overview}>
                <Link to="knuth">
                    <button className={style.btnk}>buy knuth's book</button>
                </Link>
            </div>
        </div>
    </>
}

export default AuthorIntro;