import style from './Avatar.module.css'

const Avatar = (props) => {
    const classes = props.avatar;
    return <img className={style.avatar + " " + classes} src="./images/library.png" alt="profile" />
}

export default Avatar;