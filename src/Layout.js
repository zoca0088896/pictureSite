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
            <Link to="/">首頁</Link>
          </li>
          <li>
            <Link to="/about">關於這個網站</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
