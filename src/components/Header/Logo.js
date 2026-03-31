import React from "react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/" className="font-bold text-2xl cursor-pointer text-pink-600">
      Glamify
    </Link>
  );
}

export default Logo;