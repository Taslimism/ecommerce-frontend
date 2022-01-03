import React, { useEffect, useState } from 'react';

const AuthContext = React.createContext({
    isLoggedIn: false,
    name: '',
    token: '',
    user_id: '',
    handleLogin: () => { },
    handleLogout: () => { }
})

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [name, setName] = useState();
    const [token, setToken] = useState();
    const [user_id, setUserId] = useState();

    const handleLogin = (name, token, user_id) => {
        setIsLoggedIn(true);
        setToken(token);
        setName(name);
        setUserId(user_id);

        localStorage.setItem('book-token', token);
        localStorage.setItem('book-userId', user_id);
        localStorage.setItem('book-name', name);
    }

    const handleLogout = () => {
        setIsLoggedIn(false);
        setToken(null);
        setName('');
        setUserId('');

        localStorage.setItem('book-token', null);
        localStorage.setItem('book-userId', "");
        localStorage.setItem('book-name', "");
    }

    useEffect(() => {
        if (!localStorage.getItem('book-token')) {
            localStorage.setItem('book-token', 'null');
            localStorage.setItem('cart', JSON.stringify([]));
        }

        if (localStorage.getItem('book-token') !== 'null') {
            // localStorage.setItem('cart', JSON.stringify([]));
            handleLogin(localStorage.getItem('book-name'), localStorage.getItem('book-token'), localStorage.getItem('book-userId'));
        }
    }, [])

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                name: name,
                token: token,
                user_id: user_id,
                handleLogin: handleLogin,
                handleLogout: handleLogout
            }}>
            {props.children}
        </AuthContext.Provider>);
}


export default AuthContext;
