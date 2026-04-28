import React, { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Bagsmenu from "../Meghamenu/Bagsmenu";
import MegaMenuSunglasses from "../Meghamenu/MegaMenuSunglasses";
import JewelryMenu from "../Meghamenu/JewelryMenu";
import WatchesMenu from "../Meghamenu/WatchesMenu";
import SearchBar from "./SearchBar";

function NavMenu() {
  const [showBagsMenu, setShowBagsMenu] = useState(false);
  const [showSunglassesMenu, setShowSunglassesMenu] = useState(false);
  const [showJewelryMenu, setShowJewelryMenu] = useState(false);
  const [showWatchesMenu, setShowWatchesMenu] = useState(false);

  const bagsTimeout = useRef(null);
  const sunTimeout = useRef(null);
  const jewelryTimeout = useRef(null);
  const watchesTimeout = useRef(null);

  const location = useLocation();

  const closeAllMenus = () => {
    setShowBagsMenu(false);
    setShowSunglassesMenu(false);
    setShowJewelryMenu(false);
    setShowWatchesMenu(false);
    clearTimeout(bagsTimeout.current);
    clearTimeout(sunTimeout.current);
    clearTimeout(jewelryTimeout.current);
    clearTimeout(watchesTimeout.current);
  };
  console.log("showBagsMenu:", showBagsMenu);

  // ✅ Route change થાય એટલે બધા menus બંધ
  useEffect(() => {
    closeAllMenus();
  }, [location.pathname]);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Bags", path: "/bags" },
    { name: "Sunglasses", path: "/sunglasses" },
    { name: "Watches", path: "/watches" },
    { name: "Jewelry", path: "/jewelry" },
  ];

  return (
    <>
      <nav className="flex gap-6 relative">
        {menuItems.map((item) => {
          if (item.name === "Bags") {
            return (
              // ✅ position relative li પર
              <li
                className="nav-item"
                key={item.name}
                style={{ position: "relative" }}
              >
                <div
                  onMouseEnter={() => {
                    clearTimeout(bagsTimeout.current);
                    setShowBagsMenu(true);
                  }}
                  onMouseLeave={() => {
                    bagsTimeout.current = setTimeout(
                      () => setShowBagsMenu(false),
                      200,
                    );
                  }}
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive
                        ? "text-pink-600 font-bold"
                        : "hover:text-pink-600 font-medium"
                    }
                  >
                    {item.name}
                  </NavLink>

                  {showBagsMenu && (
                    <Bagsmenu
                      onMouseEnter={() => {
                        clearTimeout(bagsTimeout.current);
                        setShowBagsMenu(true);
                      }}
                      onMouseLeave={() => {
                        bagsTimeout.current = setTimeout(
                          () => setShowBagsMenu(false),
                          200,
                        );
                      }}
                      onClose={closeAllMenus} // ✅ aa jaruri che
                    />
                  )}
                </div>
              </li>
            );
          }

          if (item.name === "Sunglasses") {
            return (
              <li
                className="nav-item"
                key={item.name}
                style={{ position: "relative" }}
              >
                <div
                  onMouseEnter={() => {
                    clearTimeout(sunTimeout.current);
                    setShowSunglassesMenu(true);
                  }}
                  onMouseLeave={() => {
                    sunTimeout.current = setTimeout(
                      () => setShowSunglassesMenu(false),
                      200,
                    );
                  }}
                >
                  <NavLink
                    to="/sunglasses"
                    className={({ isActive }) =>
                      isActive
                        ? "text-pink-600 font-bold"
                        : "hover:text-pink-600 font-medium"
                    }
                  >
                    {item.name}
                  </NavLink>
                  {showSunglassesMenu && (
                    <MegaMenuSunglasses
                      onMouseEnter={() => {
                        clearTimeout(sunTimeout.current);
                        setShowSunglassesMenu(true);
                      }}
                      onMouseLeave={() => {
                        sunTimeout.current = setTimeout(
                          () => setShowSunglassesMenu(false),
                          200,
                        );
                      }}
                    />
                  )}
                </div>
              </li>
            );
          }

          if (item.name === "Watches") {
            return (
              <li
                className="nav-item"
                key={item.name}
                style={{ position: "relative" }}
                onMouseEnter={() => {
                  clearTimeout(watchesTimeout.current);
                  setShowWatchesMenu(true);
                }}
                onMouseLeave={() => {
                  watchesTimeout.current = setTimeout(
                    () => setShowWatchesMenu(false),
                    200,
                  );
                }}
              >
                <NavLink
                  to="/watches"
                  className={({ isActive }) =>
                    isActive
                      ? "text-pink-600 font-bold"
                      : "hover:text-pink-600 font-medium"
                  }
                >
                  {item.name}
                </NavLink>
                {showWatchesMenu && (
                  <WatchesMenu
                    onMouseEnter={() => {
                      clearTimeout(watchesTimeout.current);
                      setShowWatchesMenu(true);
                    }}
                    onMouseLeave={() => {
                      watchesTimeout.current = setTimeout(
                        () => setShowWatchesMenu(false),
                        200,
                      );
                    }}
                  />
                )}
              </li>
            );
          }

          if (item.name === "Jewelry") {
            return (
              <li
                className="nav-item"
                key={item.name}
                style={{ position: "relative" }}
                onMouseEnter={() => {
                  clearTimeout(jewelryTimeout.current);
                  setShowJewelryMenu(true);
                }}
                onMouseLeave={() => {
                  jewelryTimeout.current = setTimeout(
                    () => setShowJewelryMenu(false),
                    200,
                  );
                }}
              >
                <NavLink
                  to="/jewelry"
                  className={({ isActive }) =>
                    isActive
                      ? "text-pink-600 font-bold"
                      : "hover:text-pink-600 font-medium"
                  }
                >
                  {item.name}
                </NavLink>
                {showJewelryMenu && (
                  <JewelryMenu
                    onMouseEnter={() => {
                      clearTimeout(jewelryTimeout.current);
                      setShowJewelryMenu(true);
                    }}
                    onMouseLeave={() => {
                      jewelryTimeout.current = setTimeout(
                        () => setShowJewelryMenu(false),
                        200,
                      );
                    }}
                  />
                )}
              </li>
            );
          }

          return (
            <li className="nav-item" key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-pink-600 font-bold"
                    : "hover:text-pink-600 font-medium"
                }
              >
                {item.name}
              </NavLink>
            </li>
          );
        })}

        <SearchBar />
        <NavLink to="/wishlist">❤️ Wishlist</NavLink>
      </nav>
    </>
  );
}

export default NavMenu;
