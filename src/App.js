import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/style.css";
import Layout from "./Layout";
import Homepage from "./pages/Homepage";
import Page404 from "./pages/Page404";
import About from "./pages/About";
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />}></Route>
            <Route path="about" element={<About />}></Route>
            <Route path="*" element={<Page404 />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
