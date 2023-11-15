import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import axios from "axios";
import Safeimgs from "../components/Safeimgs";
import Noresult from "../components/Noresult";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
const Safebooru = () => {
  let [imgs, setimgs] = useState(null);
  const [input, setInput] = useState("");
  let [currenSearch, setCurrentSearch] = useState("");
  let [page, setPage] = useState(0);
  const initialURL = `https://safebooru.org/index.php?page=dapi&s=post&q=index&limit=20&pid=0&json=1`;
  const searchURL = `https://safebooru.org/index.php?page=dapi&s=post&q=index&limit=20&tags=${input}&pid=0&json=1`;
  const searchHandler = async (url) => {
    setPage(0);
    let response = await axios.get(url);
    console.log(response.data);
    setimgs(response.data);
    setCurrentSearch(input);
  };
  const moreImgs = async () => {
    let newURL;
    if (currenSearch === "") {
      newURL = `https://safebooru.org/index.php?page=dapi&s=post&q=index&limit=20&pid=${
        page + 1
      }&json=1`;
    } else {
      newURL = `https://safebooru.org/index.php?page=dapi&s=post&q=index&limit=20&tags=${currenSearch}&pid=${
        page + 1
      }&json=1`;
    }
    setPage(page + 1);
    let response = await axios.get(newURL);
    console.log(response.data);
    setimgs([...imgs, ...response.data]);
  };
  //recommand imgs
  useEffect(() => {
    searchHandler(initialURL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //check result
  const checkResult = () => {
    if (imgs === "" || imgs === undefined) {
      return <Noresult />;
    } else {
      return;
    }
  };
  const toggleMenu = () => {
    const menu = document.querySelector(".rating-menu");
    menu.classList.toggle("show");
  };
  return (
    <div>
      <div className="rating">
        <p>Rating</p>
        <label htmlFor="rating-box" onClick={toggleMenu}>
          <FontAwesomeIcon icon={fas.faBars} />
        </label>
        <div className="rating-menu">
          <label htmlFor="rating-box" onClick={toggleMenu}>
            <FontAwesomeIcon icon={far.faRectangleXmark} size="xl" />
          </label>
          <p className="info">
            This page only has general images <br />
            If you want to check out NSFW content, please use Danbooru/Gelbooru.
          </p>
        </div>
      </div>
      <Search
        searchHandler={() => {
          searchHandler(searchURL);
        }}
        setInput={setInput}
        input={input}
      />
      <div className="imgs">
        {imgs &&
          imgs.map((img) => {
            return <Safeimgs img={img} key={img.id} />;
          })}
        {checkResult()}
      </div>
      <div className="morePicture">
        <button onClick={moreImgs}>更多圖片</button>
      </div>
    </div>
  );
};

export default Safebooru;
