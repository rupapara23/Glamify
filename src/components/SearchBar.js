import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

function SearchBar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const pageRoutes = {
    bags: "/bags",
    sunglasses: "/sunglasses",
    watches: "/watches",
    jewelry: "/jewelry",
    home: "/",
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      const key = search.trim().toLowerCase();
      const route = pageRoutes[key];

      if (route) {
        navigate(route);
      } else {
        alert(`"${search}" no Anyone `);
      }
      setSearch("");
    }
  };

  return (
    <form className="searchbar-form" onSubmit={handleSearch}>
      <input
        className="searchbar-input"
        type="search"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="searchbar-btn" type="submit">
        <i className="bi bi-search"></i>
      </button>
    </form>
  );
}

export default SearchBar;
