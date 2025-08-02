import React from "react";
import SearchBar from "./SearchBar";
import OptionButton from "./OptionsButton";
import ProfileButton from "./ProfileButton";

export default function Header({ onSearch, onOptionClick, onProfileClick }) {
  return (
    <div className="header-maroon">
      <div className="header-controls">
        <SearchBar onSearch={onSearch} />
        <OptionButton onClick={onOptionClick} />
        <ProfileButton onClick={onProfileClick} />
      </div>
      <div className="header-title">Blogging my Way thru Life</div>
    </div>
  );
}
