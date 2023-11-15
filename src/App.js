import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/style.css";
import Layout from "./Layout";
import Homepage from "./pages/Homepage";
import Page404 from "./pages/Page404";
import Danbooru from "./pages/Danbooru";
import Gelbooru from "./pages/Gelbooru";
import Safebooru from "./pages/Safebooru";
import Pexels from "./pages/Pexels";
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />}></Route>
            <Route path="danbooru" element={<Danbooru />}></Route>
            <Route path="gelbooru" element={<Gelbooru />}></Route>
            <Route path="safebooru" element={<Safebooru />}></Route>
            <Route path="pexels" element={<Pexels />}></Route>
            <Route path="*" element={<Page404 />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
