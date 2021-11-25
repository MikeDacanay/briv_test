import React from "react";

export const Button = ({clicked, children, ...rest}) => {
  return (
    <button 
        onClick={clicked}
        {...rest}>
        {children}
    </button>
  )
}; 