// src/pages/public/Home.jsx
import React from "react";
import ProductSecton from "../../components/ProductSecton";

const Home = ({ onAddToCart, cartItems = [] }) => {
  return (
    <div>
      <ProductSecton onAddToCart={onAddToCart} cartItems={cartItems} />
    </div>
  );
};

export default Home;