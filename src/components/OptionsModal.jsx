import React from "react";
import "../style.css";
import { OPTIONS } from "../constants";

export default function OptionsModal({ isVisible, onClose , onProfileClick}) {
  return (
    <div
      className={`modal-overlay ${isVisible ? "show" : "hide"}`}
      onClick={onClose}
    >
      <div className="options-box" onClick={(e) => e.stopPropagation()}>
        <ul className="options-list">
          {OPTIONS.map((item, index) => (
            <li
              key={index}
              className="options-item"
              onClick={() => {
                if (item.toLowerCase().includes("view profile") && onProfileClick) {
                  onProfileClick();
                  onClose();
                }
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
