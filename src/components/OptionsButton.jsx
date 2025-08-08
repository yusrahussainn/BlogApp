import React from "react";
import optionsIcon from "../assets/Options.png";

export default function OptionButton({ onClick }) {
  return (

    <button onClick={onClick} className="optionss-button">

      <img src={optionsIcon} alt="Options" className="options-icon" />

    </button>
    
  );
}
