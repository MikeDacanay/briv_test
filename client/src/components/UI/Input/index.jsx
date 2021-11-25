import React from "react";

export const Input = ({label ,name, variant, ...rest}) => {

  const tempCss = variant === 'textarea-0' ? {'height': '100px', 'width': '50%'} : {};

  return (
    <div className="Input__container">        
        { label && <label htmlFor={name}> {label} </label>}
        <input
          style={tempCss}
          name={name}
          {...rest}/>
    </div>
  )
};