import React, { useState } from "react";
import img from "../assets/Search.png";
import "../style.css";
import { filterBlogs } from "../redux/blogsSlice";
import { useDispatch } from "react-redux";

export default function SearchBar({ onSearch }) {
  const [term, setTerm] = useState("");
   const dispatch = useDispatch();

  const handleSearch = () => {
    if (term.trim()) {
      dispatch(filterBlogs(term));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="search-bar-container">

      <div className="search-bar-box">

        <input
          type="text"
          placeholder="Search"
          className="search-input"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <div className="search-icon-container">

          <div className="divider" />
          
          <button type="button" className="search-button" onClick={handleSearch}>
            <img src={img} alt="search" className="search-img" />
          </button>

        </div>

      </div>

    </div>
  );
}