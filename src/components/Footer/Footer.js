import React from "react";
import { Link } from "react-router-dom"; // ← ADD THIS LINE

function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 pt-4 pb-4">
      <div className="container text-center">
        <div className="mb-2">
          <Link to="/" className="text-white me-3">
            Home
          </Link>
          <Link to="/bags" className="text-white me-3">
            Bags
          </Link>
          <Link to="/sunglasses" className="text-white me-3">
            Sunglasses
          </Link>
          <Link to="/watches" className="text-white me-3">
            Watches
          </Link>
          <Link to="/jewelry" className="text-white">
            Jewelry
          </Link>
        </div>
        <p className="mb-0">© 2026 Glamify. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
