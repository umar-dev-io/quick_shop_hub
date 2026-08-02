import { Navigate, Outlet } from "react-router";
import { LogInOutUse } from "../context/LogInOutContext";
function ProtctedLayout() {
  const { isLoggedIn } = LogInOutUse();

  return isLoggedIn ? <Outlet /> : <Navigate to={"/login"} replace />;
}
export default ProtctedLayout;
