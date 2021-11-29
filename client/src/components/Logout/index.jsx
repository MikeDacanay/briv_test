import React, { useContext } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "../UI/Button";

export const Logout = props => {
    const history = useHistory();
    const {displayNameHandlr, loginHandlr} = useContext(AuthContext);

    const logoutHandlr = () => {        
        window.localStorage.clear();
        displayNameHandlr(null);
        loginHandlr(null);
        history.replace('/welcome');
    };
  
    return (
        <Button 
            clicked={logoutHandlr}>Logout</Button>
    )
}; 