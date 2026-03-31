// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import { WishlistProvider } from "./pages/WishlistContext";
// import { CartProvider } from "./pages/CartContext";
// import "./index.css"; 
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <CartProvider>
//     <WishlistProvider>
//     <App />
//    </WishlistProvider>
//     </CartProvider>
// );
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./Store.js";
import { WishlistProvider } from "./pages/WishlistContext";
import { CartProvider } from "./pages/CartContext";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <CartProvider> 
      <WishlistProvider>
        <App />
      </WishlistProvider>
    </CartProvider>
  </Provider>
);