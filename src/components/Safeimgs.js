import React, { useState } from "react";
import Message from "./Message";
const Safeimgs = ({ img }) => {
  let [msgStatus, setMsgStatus] = useState("hidden");
  const copyTags = () => {
    const tags = document.querySelector(`#tag-${img.id}`).innerHTML;
    navigator.clipboard
      .writeText(tags)
      .then(() => {
        setMsgStatus("success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="safe-img">
      <div className="safebooru-img">
        <img
          src={`https://safebooru.org//images/${img.directory}/${img.image}?${img.id}`}
          alt={img.owner}
        />
      </div>
      <label htmlFor={img.id} className="showTags">
        顯示Tags
      </label>
      <input type="checkbox" name="" id={img.id} />
      <div className="tags">
        <label
          htmlFor={img.id}
          className="closeTags"
          onClick={() => {
            setMsgStatus("hidden");
          }}
        >
          關閉Tags
        </label>
        <button className="copy-btn" onClick={copyTags}>
          複製Tags
        </button>
        <p className="tags" id={`tag-${img.id}`}>
          {img.tags}
        </p>
        <Message msgStatus={msgStatus} setMsgStatus={setMsgStatus} />
      </div>
      <a
        href={`https://safebooru.org//images/${img.directory}/${img.image}?${img.id}`}
        target="_blank"
        rel="noreferrer noopener"
      >
        高清大圖
      </a>
    </div>
  );
};

export default Safeimgs;
