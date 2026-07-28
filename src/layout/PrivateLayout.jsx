import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

function PrivateLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default PrivateLayout;
