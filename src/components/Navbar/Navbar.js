import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
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
      <form action="#">
        <input type="text" className="input" placeholder="Search photo" />
        <button type="submit" className="searchBtn">
          <img src="./search (1).svg" alt="search" />
        </button>
      </form>
      <div className="imgCon">
        <img
          src="./heart-fill.svg"
          alt="fav"
          className="favImg"
          onClick={handleFav}
        />
      </div>
    </div>
  );
};

export default Navbar;
