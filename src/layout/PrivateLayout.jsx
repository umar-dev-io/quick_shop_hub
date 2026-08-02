import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivateLayout = ({
  cartCount,
  cartItems,
  setCartItems, 
  onAddToCart,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        cartCount={cartCount}
        cartItems={cartItems}
        onUpdateQuantity={onUpdateQuantity}
        onRemoveItem={onRemoveItem}
      />
      <main className="flex-1 pt-16">
        {/* Pass cartItems and setCartItems down to child routes like Proceed */}
        <Outlet 
          context={{ 
            onAddToCart, 
            cartItems, 
            setCartItems 
          }} 
        />
      </main>
      <Footer />
    </div>
  );
};

export default PrivateLayout;