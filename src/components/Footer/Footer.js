import React from 'react';
import style from './Footer.module.css';

const Footer = () => {
    return <div className={style.footer}>
        <p className={style.text}>
            Made with
            <span className="heart"> <i className="em em-heart" aria-label="HEAVY BLACK HEART"></i> </span>
            by
            <a className={style.link} href="https://github.com/Taslimism" target="_blank" rel="noreferrer" > Taslim </a>
        </p>
    </div>
}


export default Footer;