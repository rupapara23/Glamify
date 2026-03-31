// import React from "react";
// import { Link } from "react-router-dom";

// const bagsMenuData = [
//   {
//     heading: "By Category",
//     image: "/images/Begs/b1.jpg",
//     items: ["Totes", "Sling Bags", "Shoulder Bags", "Wallets"],
//   },
//   {
//     heading: "Trending Now",
//     image: "/images/Begs/b2.jpg",
//     items: ["Bag Charm", "Phone Bags"],
//   },
//   {
//     heading: "By Discount",
//     image: "/images/Begs/b3.jpg",
//     items: ["BackPacks", "Pouches", "Nylon Bags"],
//   },
// ];

// const buttonStyle = {
//   marginTop: "10px",
//   padding: "6px 16px",
//   backgroundColor: "#606163",
//   color: "white",
//   borderRadius: "4px",
//   cursor: "pointer",
//   textAlign: "center",
// };

// function Bagsmenu({ onMouseEnter, onMouseLeave, onClose }) {
//   return (
//     <div
//       className="mega-menu"
//       onMouseEnter={onMouseEnter}
//       onMouseLeave={onMouseLeave}
//     >
//       <div className="mega-container">
//         {bagsMenuData.map((section) => (
//           <div className="mega-column" key={section.heading}>
//             <h4>{section.heading}</h4>

//             <div className="mega-image" style={{ marginBottom: "10px" }}>
//               <img
//                 src={section.image}
//                 alt={section.heading}
//                 style={{
//                   width: "120px",
//                   height: "80px",
//                   objectFit: "cover",
//                   borderRadius: "6px",
//                 }}
//               />
//             </div>

//             <ul>
//               {section.items.map((item) => (
//                 <li key={item}>
//                   <span style={{ cursor: "pointer" }}>{item}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}

//         <div className="mega-column">
//           <h4>New Arrivals</h4>

//           <div className="mega-image">
//             <img
//               src="/images/Begs/Brown Modern Minimalist Bag New Collection Instagram Post.jpg"
//               alt="Bags Banner"
//               style={{
//                 width: "160px",
//                 height: "200px",
//                 objectFit: "cover",
//                 borderRadius: "8px",
//               }}
//             />
//             <Link to="/bags" style={{ textDecoration: "none" }}>
//               <div
//                 style={buttonStyle}
//                 onClick={() => {
//                   if (onClose) onClose(); 
//                 }}
//               >
//                 Shop All
//               </div>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Bagsmenu;
import React from "react";
import { Link } from "react-router-dom";

const bagsMenuData = [
  {
    heading: "By Category",
    image: "/images/Begs/b1.jpg",
    items: ["Shop All", "Totes", "Sling Bags", "Shoulder Bags", "Wallets"]
  },
  {
    heading: "Trending Now",
    image: "/images/Begs/b2.jpg",
    items: ["Bag Charm", "Phone Bags"]
  },
  {
    heading: "By Discount",
    image: "/images/Begs/b3.jpg",
    items: ["BackPacks", "Pouches", "Nylon Bags"]
  },
];

function Bagsmenu({ onMouseEnter, onMouseLeave, onClose }) {
  return (
    <div
      className="mega-menu"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="mega-container">
        {bagsMenuData.map((section) => (
          <div className="mega-column" key={section.heading}>
            <h4>{section.heading}</h4>
            <div className="mega-image" style={{ marginBottom: "10px" }}>
              <img
                src={section.image}
                alt={section.heading}
                style={{ width: "120px", height: "80px", objectFit: "cover", borderRadius: "6px" }}
              />
            </div>
            <ul>
              {section.items.map((item) => (
                <li key={item} onClick={onClose}>
                  <Link
                    to={`/bags/${item.toLowerCase().replace(/ /g, "-")}`}
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
              src="/images/Begs/Brown Modern Minimalist Bag New Collection Instagram Post.jpg"
              alt="Bags Banner"
              style={{ width: "160px", height: "200px", objectFit: "cover", borderRadius: "8px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bagsmenu;