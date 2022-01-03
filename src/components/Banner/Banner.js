import React from 'react';
import styles from './Banner.module.css';


const Banner = () => {
    return <div className={styles.banner}>
        <img className={styles["banner-img"]} src="./images/library.jpg" alt="hero" />

        <p className={styles.quote}>“charm is the ability to insult people without offending them; nerdiness the reverse”
            ― nassim nicholas taleb</p>

    </div>

}

export default Banner;