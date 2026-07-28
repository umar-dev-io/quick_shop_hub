import { Navigate, Outlet } from "react-router";

function ProtctedLayout({ isLoggedIn }) {
  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }
  return <Outlet />;
}

export default ProtctedLayout;
