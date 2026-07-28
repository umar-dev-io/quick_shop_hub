import React from "react";
import { Link } from "react-router";
const Navbar = () => {
  return (
      <nav className="bg-amber-800">
        <ul className="flex gap-10 text-white px-10 py-4">
          <Link to={"/"}>Home</Link>
          <Link to={"/about"}>About</Link>
        </ul>
      </nav>
  );
};

export default Navbar;
