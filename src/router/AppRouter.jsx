import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import PublicLayout from "../layout/PublicLayout";
import PrivateLayout from "../layout/PrivateLayout";
import Login from "../pages/private/Login";
import PrivateAbout from "../pages/private/PrivateAbout";
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import PageNotFound from "../pages/PageNotFound";
import ProtctedLayout from "../layout/ProtctedLayout";

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  // 1. Add cart state here
  const [cartItems, setCartItems] = useState([]);

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  // 2. Add function to update cart
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const router = createBrowserRouter([
    {
      element: <PublicLayout />,
      errorElement: <PageNotFound />,
      children: [
        {
          path: "/login",
          element: <Login onLogin={handleLogin} />,
        },
        {
          path: "privateAbout",
          element: <PrivateAbout />,
        },
      ],
    },
    {
      element: <ProtctedLayout isLoggedIn={isLoggedIn} />,
      children: [
        {
          // 3. Pass cart count down to PrivateLayout
          element: (
            <PrivateLayout
              onLogout={handleLogout}
              cartCount={cartItems.length}
            />
          ),
          children: [
            {
              path: "/",
              // 4. Pass handleAddToCart into Home
              element: <Home onAddToCart={handleAddToCart} />,
            },
            {
              path: "/about",
              element: <About />,
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