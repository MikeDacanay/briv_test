import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import { submitHandlr, toggleLoginHanldr } from "./handlrs";

import { Input } from "../UI/Input";
import { Button } from "../UI/Button";



export const AuthForm = props => {
    const [isLogin, setIsLogin] = useState(true);
    const authContxt = useContext(AuthContext);
    const history = useHistory();

    return (
        <div className="AuthForm">
            <form onSubmit={(e) => submitHandlr(e, isLogin, authContxt, history)}>
                <Input
                    name="email"
                    label="Email"
                    type="email"
                    placeholder='Email'
                    required
                />
                <Input
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Password"
                    required/>
                {!isLogin && <Input
                    name="display_name"
                    label="Username"
                    type="text"
                    placeholder="Username"
                    required/>}                
                <Input
                    type='submit'
                    value={isLogin ? 'Login' : 'Create User'}/>            
            </form>
            <div className="AuthForm__btn--containers">
                <div className="AuthForm__btn--text">
                    {!isLogin ? 'Already have an account?': 'Need to create a new account?'}
                </div>
                <Button
                    clicked={() => toggleLoginHanldr(setIsLogin, authContxt)}>
                    {!isLogin ? 'Login with Existing Account': 'Create a Free Account'}
                </Button>
            </div>
            {authContxt.errLogin && <div className="">Wrong Account Info or Account Already Existed</div>}            
        </div>
    )
}; 