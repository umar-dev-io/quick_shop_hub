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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = createBrowserRouter([
    {
      element: <PublicLayout />,
      errorElement: <PageNotFound />,
      children: [
        {
          path: "/login",
          element: <Login onLogin={() => setIsLoggedIn(true)} />,
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
          element: <PrivateLayout />,
          children: [
            {
              path: "/",
              element: <Home />,
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
      element: <PageNotFound />
    }
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
