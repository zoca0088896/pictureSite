import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import axios from "axios";
import Picture from "../components/Picture";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
const Pexels = () => {
  const auth = process.env.REACT_APP_PEXELSKEY;
  const initialURL = "https://api.pexels.com/v1/curated?page=1&per_page=16";
  const [input, setInput] = useState("");
  //使用currentSearch來確認更多圖片的範圍，避免使用者只有更改input的情況下按更多圖片，導致範圍出錯
  let [currenSearch, setCurrentSearch] = useState("");
  let searchURL = `https://api.pexels.com/v1/search?query=${input}&page=1&per_page=16`;
  let [photos, setPhotos] = useState(null);
  const searchHandler = async (url) => {
    //重新搜尋後要將page重置，避免更多圖片採用morePicture更新的page而跳頁
    setPage(1);
    //將API KEY放入header內，並且作為Authorization屬性
    let result = await axios.get(url, {
      headers: { Authorization: auth },
    });
    console.log(result.data.photos);
    setPhotos(result.data.photos);
    setCurrentSearch(input);
  };
  //更多圖片
  //由於closure的因素，newURL會直接先取得未被setPage之前的page，導致更多圖片會先重複一次現有頁面的圖片
  //所以要直接在內部加1，當然setPage仍要使用，才能改變state並影響之後的更多圖片
  let [page, setPage] = useState(1);
  const morePicture = async () => {
    let newURL;
    if (currenSearch === "") {
      newURL = `https://api.pexels.com/v1/curated?page=${page + 1}&per_page=16`;
    } else {
      newURL = `https://api.pexels.com/v1/search?query=${currenSearch}&page=${
        page + 1
      }&per_page=16`;
    }
    setPage(page + 1);
    let result = await axios.get(newURL, {
      headers: { Authorization: auth },
    });
    setPhotos([...photos, ...result.data.photos]);
  };
  //讓該頁面初次被渲染時就出現精選圖片(useEffect)
  useEffect(() => {
    searchHandler(initialURL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const toggleMenu = () => {
    const menu = document.querySelector(".rating-menu");
    menu.classList.toggle("show");
  };
  //利用Logical operator或是ternary operator判斷是否為null來回傳picture，
  //否則對null進行map會報錯。以下為利用&&，也就是左方為true才會計算右方
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
          if (input === "") {
            searchHandler(initialURL);
          } else {
            searchHandler(searchURL);
          }
        }}
        photos={photos}
        setInput={setInput}
      />
      <div className="photos">
        {photos &&
          photos.map((photo, index) => {
            return <Picture photo={photo} key={index} />;
          })}
      </div>
      <div className="morePicture">
        <button onClick={morePicture}>更多圖片</button>
      </div>
    </div>
  );
};
export default Pexels;
