import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import axios from "axios";
import Imgs from "../components/Imgs";
import Noresult from "../components/Noresult";
const Gelbooru = () => {
  let [imgs, setimgs] = useState(null);
  const [input, setInput] = useState("");
  let [currenSearch, setCurrentSearch] = useState("");
  const auth = process.env.REACT_APP_GELBOORUKEY;
  let [page, setPage] = useState(0);
  const initialURL = `https://gelbooru.com/index.php?page=dapi&s=post&q=index&json=1&limit=28${auth}&pid=0`;
  const searchURL = `https://gelbooru.com/index.php?page=dapi&s=post&q=index&json=1&limit=28${auth}&tags=${input}&pid=0`;
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
      }`;
    } else {
      newURL = `https://gelbooru.com/index.php?page=dapi&s=post&q=index&json=1&limit=28${auth}&tags=${currenSearch}&pid=${
        page + 1
      }`;
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
  return (
    <div>
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
          imgs.map((img) => {
            return <Imgs img={img} key={img.id} />;
          })}
      </div>
      <div className="morePicture">
        <button onClick={moreImgs}>更多圖片</button>
      </div>
    </div>
  );
};

export default Gelbooru;
