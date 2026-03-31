
import React from "react";
import "./Megamenu.css";
import { Link } from "react-router-dom";
import { GiPocketWatch, GiDigitalTrace } from "react-icons/gi";
import { MdWatch, MdDiamond } from "react-icons/md";
import { BsSmartwatch } from "react-icons/bs";

const watchItems = [
  { icon: <GiPocketWatch />,  label: "Analog"      },
  { icon: <GiDigitalTrace />, label: "Digital"     },
  { icon: <BsSmartwatch />,   label: "Smart Watch" },
  { icon: <MdDiamond />,      label: "Luxury"      },
  { icon: <MdWatch />,        label: "Casual"      },
];

function WatchesMenu({ onMouseEnter, onMouseLeave, onClose }) {
  return (
    <div
      className="watches-simple-menu"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="watches-menu-container">
        <h4 className="watches-menu-heading">Shop Watches</h4>
        <ul className="watches-menu-list">
          {watchItems.map((item) => (
            <li key={item.label} onClick={onClose}>
              <Link
                to={`/watches/${item.label.toLowerCase().replace(/ /g, "-")}`}
                style={{ textDecoration: "none" }}
              >
                <div className="watches-menu-item">
                  <span className="watches-icon">{item.icon}</span>
                  <div className="watches-text">
                    <span className="watches-label">{item.label}</span>
                    <span className="watches-desc">{item.desc}</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default WatchesMenu;