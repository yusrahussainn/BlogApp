import React from "react";

const InputField = React.forwardRef(({ type = "text", placeholder, ...rest }, ref) => (

  <input
    type={type}
    placeholder={placeholder}
    ref={ref}
    {...rest}
    className="blog-input"
  />
  
));

export default InputField;
