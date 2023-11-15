import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import axios from "axios";
import Imgs from "../components/Imgs";
import Noresult from "../components/Noresult";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
const Gelbooru = () => {
  let [imgs, setimgs] = useState(null);
  const [input, setInput] = useState("");
  let [currenSearch, setCurrentSearch] = useState("");
  let [rating, setRating] = useState("");
  const auth = process.env.REACT_APP_GELBOORUKEY;
  let [page, setPage] = useState(0);
  const initialURL = `https://gelbooru.com/index.php?page=dapi&s=post&q=index&json=1&limit=28${auth}&pid=0&tags=${rating}`;
  const searchURL = `https://gelbooru.com/index.php?page=dapi&s=post&q=index&json=1&limit=28${auth}&pid=0&tags=${rating}+${input}`;
  const searchHandler = async (url) => {
    setPage(0);
    let response = await axios.get(url);
    console.log(response.data.post);
    setimgs(response.data.post);
    setCurrentSearch(input);
  };
  //more imgs
  const moreImgs = async () => {
    let newURL;
    if (currenSearch === "") {
      newURL = `https://gelbooru.com/index.php?page=dapi&s=post&q=index&json=1&limit=28${auth}&pid=${
        page + 1
      }&tags=${rating}`;
    } else {
      newURL = `https://gelbooru.com/index.php?page=dapi&s=post&q=index&json=1&limit=28${auth}&pid=${
        page + 1
      }&tags=${rating}+${currenSearch}`;
    }
    setPage(page + 1);
    let response = await axios.get(newURL);
    setimgs([...imgs, ...response.data.post]);
  };
  //recommand imgs
  useEffect(() => {
    searchHandler(initialURL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //check result
  const checkResult = () => {
    console.log(imgs);
    if (imgs === "" || imgs === undefined) {
      return <Noresult />;
    } else {
      return;
    }
  };
  //change image rating function
  const changeRating = async (e) => {
    setPage(0);
    setRating(e.target.value);
    let newURL;
    if (currenSearch === "") {
      newURL = `https://gelbooru.com/index.php?page=dapi&s=post&q=index&json=1&limit=28${auth}&pid=0&tags=${e.target.value}`;
    } else {
      newURL = `https://gelbooru.com/index.php?page=dapi&s=post&q=index&json=1&limit=28${auth}&pid=0&tags=${e.target.value}+${currenSearch}`;
    }
    let res = await axios.get(newURL);
    console.log(res.data.post);
    setimgs(res.data.post);
    const oldBtn = document.querySelector(".btn-active");
    oldBtn.classList.remove("btn-active");
    const newBtn = e.target;
    newBtn.classList.add("btn-active");
    const menu = document.querySelector(".rating-menu");
    menu.classList.toggle("show");
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
          <div className="btns">
            <button value="" onClick={changeRating} className="btn-active">
              None
            </button>
            <button value="rating:general" onClick={changeRating}>
              General
            </button>
            <button value="rating:sensitive" onClick={changeRating}>
              Sensitive
            </button>
            <button value="rating:questionable" onClick={changeRating}>
              Questionable
            </button>
            <button value="rating:explicit" onClick={changeRating}>
              Explicit
            </button>
          </div>
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
        {checkResult()}
        {imgs &&
          imgs.map((img, index) => {
            return <Imgs img={img} key={index} />;
          })}
        {checkResult()}
      </div>
      <div className="morePicture">
        <button onClick={moreImgs}>更多圖片</button>
      </div>
    </div>
  );
};

export default Gelbooru;
