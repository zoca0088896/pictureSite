import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import axios from "axios";
import DanbooruImg from "../components/DanbooruImg";
import Noresult from "../components/Noresult";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
const Danbooru = () => {
  let [imgs, setimgs] = useState(null);
  let [page, setPage] = useState(1);
  let [currenSearch, setCurrentSearch] = useState("");
  let [rating, setRating] = useState("");
  const limit = 20;
  const [input, setInput] = useState("");
  const initialURL = `https://danbooru.donmai.us/posts.json?limit=${limit}&page=1&tags=${rating}`;
  const searchURL = `https://danbooru.donmai.us/posts.json?limit=${limit}&page=1&tags=${rating}+${input}`;
  const searchHandler = async (url) => {
    setPage(1);
    let res = await axios.get(url);
    console.log(res.data);
    setimgs(res.data);
    setCurrentSearch(input);
  };
  //more imgs
  const moreImgs = async () => {
    let newURL;
    if (currenSearch === "") {
      newURL = `https://danbooru.donmai.us/posts.json?limit=${limit}&page=${
        page + 1
      }&tags=${rating}`;
    } else {
      newURL = `https://danbooru.donmai.us/posts.json?limit=${limit}&page=${
        page + 1
      }&tags=${rating}+${currenSearch}`;
    }
    console.log(newURL);
    setPage(page + 1);
    let res = await axios.get(newURL);
    setimgs([...imgs, ...res.data]);
  };
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
  //change image rating function
  const changeRating = async (e) => {
    //更換rating，重置page
    setPage(1);
    setRating(e.target.value);
    let newURL;
    //因為closure ，所以newURL內變數要放的是e.target.value而不是rating
    //因為closure階段會直接帶入現有的rating，導致要下一次執行才能生效
    //page也要直接放入1。因為closure。
    if (currenSearch === "") {
      newURL = `https://danbooru.donmai.us/posts.json?limit=${limit}&page=1&tags=${e.target.value}`;
    } else {
      newURL = `https://danbooru.donmai.us/posts.json?limit=${limit}&page=1&tags=${e.target.value}+${currenSearch}`;
    }
    let res = await axios.get(newURL);
    console.log(res.data);
    setimgs(res.data);
    //btn'spart
    //step1.remove active btn's class
    const oldBtn = document.querySelector(".btn-active");
    oldBtn.classList.remove("btn-active");
    //step2.add active btn's class on click btn
    const newBtn = e.target;
    newBtn.classList.add("btn-active");
    //extra:finshing select and close menu
    const menu = document.querySelector(".rating-menu");
    menu.classList.toggle("show");
  };
  //show&hidden rating menu
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
        {imgs &&
          imgs.map((img, index) => {
            return <DanbooruImg img={img} key={index} />;
          })}
        {checkResult()}
      </div>
      <div className="morePicture">
        <button onClick={moreImgs}>更多圖片</button>
      </div>
    </div>
  );
};

export default Danbooru;
