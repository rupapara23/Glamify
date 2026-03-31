import React from "react";
import { Link } from "react-router-dom";

const sunglassesMenuData = [
  {
    heading: "By Style",
    image: "/images/SunGlassess/m1.jpg",
    items: ["Aviator", "Round", "Square", "Cat Eye"]
  },
  {
    heading: "By Gender",
    image: "/images/SunGlassess/m2.jpg",
    items: ["Men", "Women", "Unisex"]
  },
  {
    heading: "Trending",
    image: "/images/SunGlassess/m3.jpg",
    items: ["Polarized", "Gradient", "UV Protection"]
  },
  {
    heading: "By Discount",
    image: "/images/SunGlassess/m4.jpg",
    items: ["Eye Protection", "Lenskart"]
  },
];

function MegaMenuSunglasses({ onMouseEnter, onMouseLeave, onClose }) {
  return (
    <div
      className="mega-menu"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="mega-container">
        {sunglassesMenuData.map((section) => (
          <div className="mega-column" key={section.heading}>
            <h4>{section.heading}</h4>
            <div className="mega-image" style={{ marginBottom: "10px" }}>
              <img
                src={section.image}
                alt={section.heading}
                style={{
                  width: "120px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />
            </div>
            <ul>
              {section.items.map((item) => (
                <li key={item} onClick={onClose}>
                  <Link
                    to={
                      item === "Men" ? "/sunglasses" :
                      item === "Women" ? "/womens" :
                      `/sunglasses/${item.toLowerCase().replace(/ /g, "-")}`
                    }
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Right Side Banner */}
        <div className="mega-column">
          <h4>New Arrivals</h4>
          <div className="mega-image">
            <img
              src="/images/SunGlassess/Blue brown cream begie Shop Now Instagram Post .jpg"
              alt="Sunglasses Banner"
              style={{
                width: "160px",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MegaMenuSunglasses;