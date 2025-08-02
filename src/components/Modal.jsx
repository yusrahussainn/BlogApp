import React from "react";
import "../style.css";

export default function Modal({ isVisible, onClose, children }) {
  return (
    <div className={`m-modal-overlay ${isVisible ? "visible" : "hidden"}`} onClick={onClose}>
      <div
        className="m-modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          className="m-modal-close-button"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
