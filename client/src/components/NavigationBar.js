import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <>
      <nav>
        <Link to="/entertainme">Home</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/tv">Tv Series</Link>
        <Link to="/favorites">My Favorites</Link>
      </nav>
    </>
  );
};
