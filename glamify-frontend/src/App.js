import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Bags from "./pages/Bags";
import Sunglasses from "./pages/SunGlasses";
import Watches from "./pages/Watches";
import Jewelry from "./pages/Jewelry";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import SearchBar from "./components/SearchBar";
import Checkout from "./pages/Checkout";
// import Totes from "./pages/Totes";
// import Mens from "./pages/Mens";


function App() {
  return (
   
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/bags" element={<Bags />} />
          <Route path="/sunglasses" element={<Sunglasses />} />
          <Route path="/watches" element={<Watches />} />
          <Route path="/jewelry" element={<Jewelry />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/searchbar" element={<SearchBar />} />
          {/* <Route path="/mens" element={<Mens />} /> */}
          {/* <Route path="/Bags/Totes" element={<Totes />} /> */}
          
        </Route>
      </Routes>
    </Router>
   
  );
}

export default App;