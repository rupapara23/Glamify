// import React from "react";
// import "./Megamenu.css";
// import { GiNecklace, GiEarrings, GiLinkedRings, GiRing } from "react-icons/gi";
// import { FaGem } from "react-icons/fa";
// import { MdDiamond } from "react-icons/md";
// import { Link } from "react-router-dom";

// const jewelryItems = [
//   { icon: <GiNecklace />, label: "Necklaces" },
//   { icon: <GiEarrings />, label: "Earrings" },
//   { icon: <GiLinkedRings />, label: "Bracelets" },
//   { icon: <GiRing />, label: "Rings" },
//   { icon: <FaGem />, label: "Gold" },
//   { icon: <MdDiamond />, label: "Silver" },
// ];
// // const buttonStyle = {
// //   marginTop: "10px",
// //   padding: "2px 16px",
// //   backgroundColor: "#606163",
// //   color: "white",
// //   border: "none",
// //   borderRadius: "4px",
// //   cursor: "pointer",
// // };

// function JewelryMenu({ onMouseEnter, onMouseLeave }) {
//   return (
//     <div
//       className="jewelry-simple-menu"
//       onMouseEnter={onMouseEnter}
//       onMouseLeave={onMouseLeave}
//     >
//       <div className="jewelry-menu-container">
//         <h4 className="jewelry-menu-heading"> 
//         <Link to="/Jewelry">
//           <button >Shop All</button>
//         </Link>
//         </h4>

        
//         <ul className="jewelry-menu-list">
//           {jewelryItems.map((item) => (
//             <li key={item.label} className="jewelry-menu-item">
//               <span className="jewelry-icon">{item.icon}</span>
//               <div className="jewelry-text">
//                 <span className="jewelry-label">{item.label}</span>
//                 <span className="jewelry-desc">{item.desc}</span>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default JewelryMenu;
import React from "react";
import "./Megamenu.css";
import { Link } from "react-router-dom";
import { GiNecklace, GiEarrings, GiLinkedRings, GiRing } from "react-icons/gi";
import { FaGem } from "react-icons/fa";
import { MdDiamond } from "react-icons/md";

const jewelryItems = [
  { icon: <GiNecklace />,    label: "Necklaces" },
  { icon: <GiEarrings />,    label: "Earrings"  },
  { icon: <GiLinkedRings />, label: "Bracelets" },
  { icon: <GiRing />,        label: "Rings"     },
  { icon: <FaGem />,         label: "Gold"      },
  { icon: <MdDiamond />,     label: "Silver"    },
];

function JewelryMenu({ onMouseEnter, onMouseLeave, onClose }) {
  return (
    <div
      className="jewelry-simple-menu"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="jewelry-menu-container">
        <h4 className="jewelry-menu-heading">Shop Jewelry</h4>
        <ul className="jewelry-menu-list">
          {jewelryItems.map((item) => (
            <li key={item.label} onClick={onClose}>
              <Link
                to={`/jewelry/${item.label.toLowerCase()}`}
                style={{ textDecoration: "none" }}
              >
                <div className="jewelry-menu-item">
                  <span className="jewelry-icon">{item.icon}</span>
                  <div className="jewelry-text">
                    <span className="jewelry-label">{item.label}</span>
                    <span className="jewelry-desc">{item.desc}</span>
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

export default JewelryMenu;