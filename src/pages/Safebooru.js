import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import axios from "axios";
import Safeimgs from "../components/Safeimgs";
import Noresult from "../components/Noresult";
const Safebooru = () => {
  let [imgs, setimgs] = useState(null);
  const [input, setInput] = useState("");
  let [currenSearch, setCurrentSearch] = useState("");
  let [page, setPage] = useState(0);
  const initialURL = `https://safebooru.org/index.php?page=dapi&s=post&q=index&limit=20&pid=${page}&json=1`;
  const searchURL = `https://safebooru.org/index.php?page=dapi&s=post&q=index&limit=20&tags=${input}&pid=${page}&json=1`;
  const searchHandler = async (url) => {
    let response = await axios.get(url);
    console.log(response);
    console.log(response.data);
    setimgs(response.data);
    setCurrentSearch(input);
  };

  //more imgs
  const moreImgs = async () => {
    let newURL;
    if (currenSearch === "") {
      newURL = `https://safebooru.org/index.php?page=dapi&s=post&q=index&limit=20&pid=${
        page + 1
      }&json=1`;
    } else {
      newURL = `https://safebooru.org/index.php?page=dapi&s=post&q=index&limit=20&tags=${input}&pid=${
        page + 1
      }&json=1`;
    }
    setPage(page + 1);
    let response = await axios.get(newURL);
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
