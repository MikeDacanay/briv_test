import React from "react";

export const Input = ({label ,name, defaultValue, variant, changed, style, value, ...rest}) => {

  const tempCss = variant === 'textarea-0' ? {'height': '100px', 'width': '50%'} : {};

  return (
    <div className="Input__container">        
        { label && <label htmlFor={name}> {label} </label>}
          <input
          style={style ? style: tempCss}
          onChange={changed}
          name={name}
          value={value}
          defaultValue={defaultValue}
          {...rest}/>
    </div>
  )
};