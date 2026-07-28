import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const PrivateLayout = ({ onLogout, cartCount }) => {
  return (
    <>
      <Navbar onLogout={onLogout} cartCount={cartCount} />
      <main className="pt-16">
        <Outlet />
      </main>
    </>
  );
};

export default PrivateLayout;