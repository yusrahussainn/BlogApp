import React from "react";

const InputField = ({ type = "text", placeholder, value, onChange, required }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    required={required}
    className="blog-input"
  />
);

export default InputField;
