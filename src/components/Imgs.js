import React, { useState } from "react";
import Message from "./Message";
const Imgs = ({ img }) => {
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
  //生成標籤的txt檔並下載
  const downloadTags = (tags, filename) => {
    const blob = new Blob([tags], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = filename;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="gel-img">
      <div className="gelbooru-img">
        <img src={img.preview_url} alt={img.file_url} />
      </div>
      <label htmlFor={img.id} className="showTags">
        顯示Tags
      </label>
      <input type="checkbox" name="" id={img.id} />
      <div className="tags">
        <label htmlFor={img.id} className="closeTags">
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
      <a href={img.file_url} target="_blank" rel="noreferrer noopener">
        高清大圖
      </a>
      <button
        onClick={() => {
          const tags = document.querySelector(`#tag-${img.id}`).innerHTML;
          downloadTags(tags, `${img.id}.txt`);
        }}
      >
        下載tags
      </button>
      <a href={img.source} target="_blank" rel="noreferrer noopener">
        圖片來源
      </a>
    </div>
  );
};

export default Imgs;
