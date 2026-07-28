import { Link, Outlet } from "react-router";

const PublicLayout = () => {
  return (
    <div>
      <header>
        {/* <Link to={"/login"}>login</Link> */}
        {/* <Link to={"/aboutPrivate"}></Link> */}
      </header>
      <Outlet />
    </div>
  );
};

export default PublicLayout;
