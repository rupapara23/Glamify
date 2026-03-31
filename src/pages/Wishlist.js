// import "./Wishlist.css";
// import { useContext } from "react";
// import { WishlistContext } from "../pages/WishlistContext";

// function Wishlist() {
//   const { wishlist, removeFromWishlist, addFromWishlist } = useContext(WishlistContext);

//   return (
//     <div className="wishlist-container">
//       <h2 className="text-center mb-4">My Wishlist ....</h2>

//       {wishlist.length === 0 ? (
//         <p className="text-center">Empty Wishlist</p>
//       ) : (
//         <div className="row">
//           {wishlist.map((item) => (
//             <div className="col-md-3 mb-4" key={item.id}>
//               <div className="wishlist-card">

//                 <img
//                   src={item.image}
//                   className="wishlist-img"
//                   alt={item.name}
//                 />

//                 <div className="wishlist-body">
//                   <h6 className="wishlist-title">{item.name}</h6>
//                   <p className="wishlist-price">₹{item.price}</p>
//                   <button
//                     className="wish-add-btn"
//                     onClick={() => addFromWishlist(item.id)}
//                   >
//                     Add to Cart
//                   </button>

//                   <button
//                     className="wish-remove-btn"
//                     onClick={() => removeFromWishlist(item.id)}
//                   >
//                     ✕ Remove
//                   </button>
//                 </div>

//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Wishlist;
import "./Wishlist.css";
import { useContext } from "react";
import { WishlistContext } from "./WishlistContext"; 

function Wishlist() {
  const { wishlist, removeFromWishlist, addFromWishlist } = useContext(WishlistContext);

  return (
    <div className="wishlist-container">
      <h2 className="text-center mb-4">My Wishlist ....</h2>

      {wishlist.length === 0 ? (
        <p className="text-center">Empty Wishlist</p>
      ) : (
        <div className="row">
          {wishlist.map((item) => (
            <div className="col-md-3 mb-4" key={item.id}>
              <div className="wishlist-card">
                <img src={item.image} className="wishlist-img" alt={item.name} />
                <div className="wishlist-body">
                  <h6 className="wishlist-title">{item.name}</h6>
                  <p className="wishlist-price">₹{item.price}</p>
                  <button
                    className="wish-add-btn"
                    onClick={() => addFromWishlist(item.id)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="wish-remove-btn"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    ✕ Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;