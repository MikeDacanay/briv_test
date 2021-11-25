import React from "react";

export const Input = ({label ,name, ...rest}) => {
  return (
    <div className="Input__container">        
        { label && <label htmlFor="name"> {label} </label>}
        <input
          id={name}
          name={name}
          {...rest}/>
    </div>
  )
};