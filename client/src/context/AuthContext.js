import React, { createContext, useState } from 'react';
import { loginHandlr } from './handlrs';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errLogin, setErrLogin] = useState(false);

    const initialValues = {
        isLoggedIn: isLoggedIn,
        errLogin: errLogin,
        loginHandlr: () => setIsLoggedIn(prev => !prev),
        errLoginHandlr: () => setErrLogin(prev => !prev),
        errLoginHandlr2: () => setErrLogin(false),
    };

    return (
        <AuthContext.Provider value={initialValues}>
            {children}
        </AuthContext.Provider>
    )
};  