// import React, { useState, useEffect, useRef } from "react";
// import { Link, NavLink } from "react-router-dom";
// import Bagsmenu from "../Meghamenu/Bagsmenu";
// import MegaMenuSunglasses from "../Meghamenu/MegaMenuSunglasses";
// import JewelryMenu from "../Meghamenu/JewelryMenu";
// import WatchesMenu from "../Meghamenu/WatchesMenu";
// import SearchBar from "../SearchBar";
// import "../Meghamenu/Megamenu.css";
// import "./Header.css";
// import HeaderIcons from "./HeaderIcons";

// function Header() {
//   const [openMenu, setOpenMenu] = useState(null);
//   const menuRef = useRef(null);

//   const toggleMenu = (menuName) => {
//     setOpenMenu(prev => prev === menuName ? null : menuName);
//   };

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (
//         menuRef.current &&
//         !menuRef.current.contains(e.target) &&
//         !e.target.closest(".mega-menu") &&
//         !e.target.closest(".jewelry-simple-menu") &&
//         !e.target.closest(".watches-simple-menu")
//       ) {
//         setOpenMenu(null);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <nav
//       className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3"
//       style={{ position: "sticky", top: 0, zIndex: 1050 }}
//     >
//       <div className="container">

//         {/* Logo */}
//         <Link className="navbar-brand fw-bold text-dark" to="/">
//           Glamify
//         </Link>

//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav mx-auto" ref={menuRef}>

//             {/* Home */}
//             <li className="nav-item">
//               <NavLink
//                 to="/"
//                 className="nav-link"
//                 onClick={() => setOpenMenu(null)}
//               >
//                 Home
//               </NavLink>
//             </li>

           

//             {/* Bags */}
//             <li className="nav-item position-relative menu-wrapper">
//               <span
//                 className="nav-link"
//                 style={{ cursor: "pointer" }}
//                 onClick={() => toggleMenu("bags")}
//               >
//                 Bags
//               </span>
//               {openMenu === "bags" && <Bagsmenu />}
//             </li>

//             {/* Sunglasses */}
//             <li className="nav-item position-relative menu-wrapper">
//               <span
//                 className="nav-link"
//                 style={{ cursor: "pointer" }}
//                 onClick={() => toggleMenu("sunglasses")}
//               >
//                 Sunglasses
//               </span>
//               {openMenu === "sunglasses" && <MegaMenuSunglasses />}
//             </li>

//             {/* Watches */}
//             <li className="nav-item position-relative menu-wrapper">
//               <span
//                 className="nav-link"
//                 style={{ cursor: "pointer" }}
//                 onClick={() => toggleMenu("watches")}
//               >
//                 Watches
//               </span>
//               {openMenu === "watches" && <WatchesMenu />}
//             </li>

//             {/* Jewelry */}
//             <li className="nav-item position-relative menu-wrapper">
//               <span
//                 className="nav-link"
//                 style={{ cursor: "pointer" }}
//                 onClick={() => toggleMenu("jewelry")}
//               >
//                 Jewelry
//               </span>
//               {openMenu === "jewelry" && <JewelryMenu />}
//             </li>

//           </ul>

//           <SearchBar />

//           <div className="d-flex align-items-center gap-3">
//             <HeaderIcons />
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Header;
import React, { useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import Bagsmenu from "../Meghamenu/Bagsmenu";
import MegaMenuSunglasses from "../Meghamenu/MegaMenuSunglasses";
import JewelryMenu from "../Meghamenu/JewelryMenu";
import WatchesMenu from "../Meghamenu/WatchesMenu";
import SearchBar from "../SearchBar";
import "../Meghamenu/Megamenu.css";
import "./Header.css";
import HeaderIcons from "./HeaderIcons";

function Header() {

  const [showBags,       setShowBags]       = useState(false);
  const [showSunglasses, setShowSunglasses] = useState(false);
  const [showWatches,    setShowWatches]    = useState(false);
  const [showJewelry,    setShowJewelry]    = useState(false);

  const bagsTimer       = useRef(null);
  const sunglassesTimer = useRef(null);
  const watchesTimer    = useRef(null);
  const jewelryTimer    = useRef(null);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3"
      style={{ position: "sticky", top: 0, zIndex: 1050 }}
    >
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand fw-bold text-dark" to="/">
          Glamify
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">

            {/* Home */}
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>

            {/* Bags */}
            <li
              className="nav-item position-relative menu-wrapper"
              onMouseEnter={() => {
                clearTimeout(bagsTimer.current);
                setShowBags(true);
              }}
              onMouseLeave={() => {
                bagsTimer.current = setTimeout(() => setShowBags(false), 150);
              }}
            >
              <NavLink to="/bags" className="nav-link">
                Bags
              </NavLink>
              {showBags && (
                <Bagsmenu
                  onMouseEnter={() => {
                    clearTimeout(bagsTimer.current);
                    setShowBags(true);
                  }}
                  onMouseLeave={() => {
                    bagsTimer.current = setTimeout(() => setShowBags(false), 150);
                  }}
                  onClose={() => setShowBags(false)}
                />
              )}
            </li>

            {/* Sunglasses */}
            <li
              className="nav-item position-relative menu-wrapper"
              onMouseEnter={() => {
                clearTimeout(sunglassesTimer.current);
                setShowSunglasses(true);
              }}
              onMouseLeave={() => {
                sunglassesTimer.current = setTimeout(() => setShowSunglasses(false), 150);
              }}
            >
              <NavLink to="/sunglasses" className="nav-link">
                Sunglasses
              </NavLink>
              {showSunglasses && (
                <MegaMenuSunglasses
                  onMouseEnter={() => {
                    clearTimeout(sunglassesTimer.current);
                    setShowSunglasses(true);
                  }}
                  onMouseLeave={() => {
                    sunglassesTimer.current = setTimeout(() => setShowSunglasses(false), 150);
                  }}
                  onClose={() => setShowSunglasses(false)}
                />
              )}
            </li>

            {/* Watches */}
            <li
              className="nav-item position-relative menu-wrapper"
              onMouseEnter={() => {
                clearTimeout(watchesTimer.current);
                setShowWatches(true);
              }}
              onMouseLeave={() => {
                watchesTimer.current = setTimeout(() => setShowWatches(false), 150);
              }}
            >
              <NavLink to="/watches" className="nav-link">
                Watches
              </NavLink>
              {showWatches && (
                <WatchesMenu
                  onMouseEnter={() => {
                    clearTimeout(watchesTimer.current);
                    setShowWatches(true);
                  }}
                  onMouseLeave={() => {
                    watchesTimer.current = setTimeout(() => setShowWatches(false), 150);
                  }}
                  onClose={() => setShowWatches(false)}
                />
              )}
            </li>

            {/* Jewelry */}
            <li
              className="nav-item position-relative menu-wrapper"
              onMouseEnter={() => {
                clearTimeout(jewelryTimer.current);
                setShowJewelry(true);
              }}
              onMouseLeave={() => {
                jewelryTimer.current = setTimeout(() => setShowJewelry(false), 150);
              }}
            >
              <NavLink to="/jewelry" className="nav-link">
                Jewelry
              </NavLink>
              {showJewelry && (
                <JewelryMenu
                  onMouseEnter={() => {
                    clearTimeout(jewelryTimer.current);
                    setShowJewelry(true);
                  }}
                  onMouseLeave={() => {
                    jewelryTimer.current = setTimeout(() => setShowJewelry(false), 150);
                  }}
                  onClose={() => setShowJewelry(false)}
                />
              )}
            </li>

          </ul>

          <SearchBar />

          <div className="d-flex align-items-center gap-3">
            <HeaderIcons />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;