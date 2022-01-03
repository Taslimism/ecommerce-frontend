
import style from './Review.module.css';
import Avatar from './../Avatar/Avatar';

const Review = (props) => {
    return (
        <div className={style["main-container"]}>
            <div className={style.profile}>
                <Avatar className={style.pic} />
                <h3 className={style.name}>{props.review.name}</h3>
            </div>
            <div className={style["review-container"]}>
                <div className={style.review}><span className={style.title}>Review</span> : {props.review.review}</div>
                <div className={style.rating}><span className={style.title}>Rating</span> : {props.review.rating}</div>
            </div>
        </div>
    );
}

export default Review;