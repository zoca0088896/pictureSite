import React from "react";
import { Outlet, Link } from "react-router-dom";
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/danbooru">Danbooru</Link>
          </li>
          <li>
            <Link to="/gelbooru">Gelbooru</Link>
          </li>
          <li>
            <Link to="/safebooru">Safebooru(SFW)</Link>
          </li>
          <li>
            <Link to="/pexels">Pexels</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
