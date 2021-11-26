import React, { createContext, useState } from 'react';
// import { loginHandlr } from './handlrs';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null); //saves _id
    const [errLogin, setErrLogin] = useState(false);

    const initialValues = {
        isLoggedIn,
        errLogin,
        loginHandlr: (id) => setIsLoggedIn(id),
        errLoginHandlr: () => setErrLogin(prev => !prev),
        errLoginHandlr2: () => setErrLogin(false),
    };

    return (
        <AuthContext.Provider value={initialValues}>
            {children}
        </AuthContext.Provider>
    )
};  