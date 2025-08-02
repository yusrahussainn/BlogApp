import React from "react";
import profileIcon from "../assets/Profile.png";

export default function ProfileButton({ onClick }) {
  return (
    <button onClick={onClick} className="profilee-button">
      <div className="profile-circle">
        <img src={profileIcon} alt="Profile" className="profile-icon" />
      </div>
    </button>
  );
}
