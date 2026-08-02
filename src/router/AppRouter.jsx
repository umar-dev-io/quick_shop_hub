import { createBrowserRouter, RouterProvider } from "react-router";
import { useState } from "react";
import PublicLayout from "../layout/PublicLayout";
import PrivateLayout from "../layout/PrivateLayout";
import Login from "../pages/private/Login";
import PrivateAbout from "../pages/private/PrivateAbout";
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import PageNotFound from "../pages/PageNotFound";
import ProtctedLayout from "../layout/ProtctedLayout";
import Proceed from "../pages/public/Proceed";
import AdminLogin from "../pages/admin/AdminLogin";
const AppRouter = () => {
  // 1. Cart state
  const [cartItems, setCartItems] = useState([]);

  // 2. Add product (Increases quantity if already in cart)
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.id === product.id,
      );
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // 3. Change product quantity
  const handleUpdateQuantity = (productId, delta) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean),
    );
  };

  // 4. Remove product from cart
  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId),
    );
  };

  // 5. Calculate total item count for Navbar badge
  const totalCartCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  const router = createBrowserRouter([
    {
      element: <PublicLayout />,
      errorElement: <PageNotFound />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/privateAbout",
          element: <PrivateAbout />,
        },
        {
          path: "/admin",
          element: <AdminLogin />,
        },
      ],
    },
    {
      element: <ProtctedLayout />,
      children: [
        {
          // Pass cart state and handlers down to PrivateLayout
          element: (
            <PrivateLayout
              cartCount={totalCartCount}
              cartItems={cartItems}
              setCartItems={setCartItems}
              onAddToCart={handleAddToCart}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveFromCart}
            />
          ),
          children: [
            {
              path: "/",
              element: <Home onAddToCart={handleAddToCart} />,
            },
            {
              path: "/about",
              element: <About />,
            },
            {
              path: "/proceed",
              element: <Proceed />,
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
