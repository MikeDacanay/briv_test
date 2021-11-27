import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export const Title = props => {
    const {displayName} = useContext(AuthContext);
    const [title, setTitle] = useState('')


    useEffect(() => {
        setTitle(displayName);
    }, [displayName])


    return (
        <div className="Title" style={{'fontSize': '40px', 'fontWeight': 'bold'}}>Welcome! {title}</div>
    )
}; 