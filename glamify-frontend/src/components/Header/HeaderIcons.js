// import React, { useState, useRef, useEffect } from "react";
// import { FaUser, FaHeart, FaShoppingCart, FaSignOutAlt, FaChevronDown } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../../pages/AuthSlice";
// import { WishlistContext } from "../../pages/WishlistContext";
// import { CartContext } from "../../pages/CartContext";
// import { useContext } from "react";
// import "./Header.css";
// import "./HeaderIcons.css";

// function HeaderIcons() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const { wishlist } = useContext(WishlistContext);
//   const { cart } = useContext(CartContext);

//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const handleClick = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClick);
//     return () => document.removeEventListener("mousedown", handleClick);
//   }, []);

//   const handleLogout = () => {
//     dispatch(logout());
//     setDropdownOpen(false);
//     navigate("/");
//   };

//   return (
//     <div className="header-icons">

//       {/* 👤 USER */}
//       <div className="user-dropdown" ref={dropdownRef}>
//         <button
//           className={`user-btn ${!user ? "guest-btn" : ""}`}
//           onClick={() => setDropdownOpen(!dropdownOpen)}
//         >
//           {user ? (
//             <>
//               <div className="user-avatar">
//                 {user.name.charAt(0).toUpperCase()}
//               </div>
//               <span className="user-name">{user.name.split(" ")[0]}</span>
//             </>
//           ) : (
//             <FaUser />
//           )}
//           <FaChevronDown className={`chevron ${dropdownOpen ? "open" : ""}`} />
//         </button>

//         {dropdownOpen && (
//           <div className="dropdown-menu-custom">
//             {user ? (
//               <>
//                 <div className="dropdown-user-info">
//                   <strong>{user.name}</strong>
//                   <small>{user.email}</small>
//                 </div>
//                 <hr className="dropdown-divider" />
//                 <button className="dropdown-logout" onClick={handleLogout}>
//                   <FaSignOutAlt /> Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <button className="dropdown-option" onClick={() => { navigate("/login"); setDropdownOpen(false); }}>
//                   Login
//                 </button>
//                 <button className="dropdown-option" onClick={() => { navigate("/register"); setDropdownOpen(false); }}>
//                   Register
//                 </button>
//               </>
//             )}
//           </div>
//         )}
//       </div>

//       {/* ❤️ WISHLIST */}
//       <div className="icon-box">
//         <FaHeart title="Wishlist" onClick={() => navigate("/wishlist")} />
//         {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
//       </div>

//       {/* 🛒 CART */}
//       <div className="icon-box">
//         <FaShoppingCart title="Cart" onClick={() => navigate("/cart")} />
//         {cart.length > 0 && <span className="badge">{cart.length}</span>}
//       </div>

//     </div>
//   );
// }

// export default HeaderIcons;
import React, { useState, useRef, useEffect } from "react";
import { FaUser, FaHeart, FaShoppingCart, FaSignOutAlt, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../pages/AuthSlice";
import { WishlistContext } from "../../pages/WishlistContext";
import { CartContext } from "../../pages/CartContext";
import { useContext } from "react";
import "./Header.css";
import "./HeaderIcons.css";

function HeaderIcons() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { wishlist } = useContext(WishlistContext);
  const { cart } = useContext(CartContext);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <div className="header-icons">

      {/* 👤 USER */}
      <div className="user-dropdown" ref={dropdownRef}>
        <button
          className={`user-btn ${!user ? "guest-btn" : ""}`}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {user ? (
            <>
              <div className="user-avatar">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="user-name">{user.name.split(" ")[0]}</span>
            </>
          ) : (
            <FaUser />
          )}
          <FaChevronDown className={`chevron ${dropdownOpen ? "open" : ""}`} />
        </button>

        {dropdownOpen && (
          <div className="dropdown-menu-custom">
            {user ? (
              <>
                <div className="dropdown-user-info">
                  <strong>{user.name}</strong>
                  <small>{user.email}</small>
                </div>
                <hr className="dropdown-divider" />
                <button className="dropdown-logout" onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </button>
              </>
            ) : (
              <>
                <button className="dropdown-option" onClick={() => { navigate("/login"); setDropdownOpen(false); }}>
                  Login
                </button>
                <button className="dropdown-option" onClick={() => { navigate("/register"); setDropdownOpen(false); }}>
                  Register
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* ❤️ WISHLIST */}
      <div className="icon-box">
        <FaHeart title="Wishlist" onClick={() => navigate("/wishlist")} />
        {wishlist.length > 0 && <span className="icon-badge">{wishlist.length}</span>}
      </div>

      {/* 🛒 CART */}
      <div className="icon-box">
        <FaShoppingCart title="Cart" onClick={() => navigate("/cart")} />
        {cart.length > 0 && <span className="icon-badge">{cart.length}</span>}
      </div>

    </div>
  );
}

export default HeaderIcons;