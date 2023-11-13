import React from "react";
import { Outlet, Link } from "react-router-dom";
import Footer from "./components/Footer";
import Spark from "./components/Spark";
const Layout = () => {
  return (
    <>
      <Spark />
      <nav>
        <ul>
          <li>
            <Link to="/">Pexels</Link>
          </li>
          <li>
            <Link to="/danbooru">Danbooru</Link>
          </li>
          <li>
            <Link to="/gelbooru">Gelbooru(NSFW)</Link>
          </li>
          <li>
            <Link to="/safebooru">Safebooru(SFW)</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
