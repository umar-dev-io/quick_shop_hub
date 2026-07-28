import React from "react";
import ProductSecton from "../../components/ProductSecton";

const Home = ({ onAddToCart }) => {
  return (
    <div>
      <ProductSecton onAddToCart={onAddToCart} />
    </div>
  );
};

export default Home;