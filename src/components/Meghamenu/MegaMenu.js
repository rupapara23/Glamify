import React from "react";
import "./Megamenu.css";

function MegaMenu({ menuData, bannerImage }) {
  return (
    <div className="mega-menu">
      <div className="mega-container">
    
        {menuData.map((column, index) => (
          <div className="mega-column" key={index}>
            <h4>{column.heading}</h4>
            <ul>
              {column.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
        <div className="mega-image">
          <img src={bannerImage} alt="Banner" />
        </div>
      </div>
    </div>
  );
}

export default MegaMenu;