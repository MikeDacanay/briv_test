import React, { createContext, useState, useEffect } from 'react';
// import { loginHandlr } from './handlrs';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null); //saves _id
    const [displayName, setDisplayName] = useState(null);
    const [errLogin, setErrLogin] = useState(false);
    const localStorageUserId = window.localStorage.getItem('userId');
    const localStorageDisplayName = window.localStorage.getItem('display_name')
    // console.log(isLoggedIn); 

    useEffect(() => {   
        setIsLoggedIn(localStorageUserId);
    }, [localStorageUserId, setIsLoggedIn]);

    useEffect(() => {   
        setDisplayName(localStorageDisplayName);
    }, [localStorageDisplayName, setDisplayName]);

    // useEffect(() => {
    //     console.log(displayName);
    // }, [displayName])

    const initialValues = {
        isLoggedIn,
        errLogin,
        displayName,
        loginHandlr: (id) => setIsLoggedIn(id),
        displayNameHandlr: (name) => setDisplayName(name),
        errLoginHandlr: () => setErrLogin(prev => !prev),
        errLoginHandlr2: () => setErrLogin(false),
    };

    return (
        <AuthContext.Provider value={initialValues}>
            {children}
        </AuthContext.Provider>
    )
};  