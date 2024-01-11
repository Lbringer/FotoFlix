import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ handleSearch }) => {
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const handleFav = () => {
    navigate("/fav");
  };
  return (
    <div className="nav">
      <Link to="/" className="notLink">
        <div className="logo">
          <span className="italic">Foto</span>Flix
        </div>
      </Link>
      <form onSubmit={(e) => handleSearch(e, text)}>
        <input
          type="text"
          className="input"
          placeholder="Search photo"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="searchBtn">
          <img src="./icons/search (1).svg" alt="search" />
        </button>
      </form>
      <div className="imgCon">
        <img
          src="./icons/heart-fill.svg"
          alt="fav"
          className="favImg"
          onClick={handleFav}
        />
      </div>
    </div>
  );
};

export default Navbar;
