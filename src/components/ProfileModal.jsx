import React from "react";
import "../style.css";
import { PROFILE } from "../constants";

export default function Profile({ isVisible, onClose }) {
  return (

    <div
      className={`profileModal-overlay ${isVisible ? "show" : "hide"}`}
      onClick={onClose}
    >

      <div className="profile-options-box" onClick={(e) => e.stopPropagation()}>

        <ul className="options-list">
          {PROFILE.map((item, index) => (

            <li key={index} className="options-item">
              {item}
            </li>

          ))}

        </ul>

      </div>

    </div>
    
  );
}
