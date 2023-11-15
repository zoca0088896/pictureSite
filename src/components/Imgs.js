import React, { useState } from "react";
import Message from "./Message";
const Imgs = ({ img }) => {
  let [msgStatus, setMsgStatus] = useState("hidden");
  let [msg, setMsg] = useState("");
  const copyTags = () => {
    const tags = document.querySelector(`#tag-${img.id}`).innerHTML;
    navigator.clipboard
      .writeText(tags)
      .then(() => {
        setMsgStatus("success");
        setMsg("已成功複製Tags");
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
    setMsgStatus("success");
    setMsg("已成功下載Tags文字檔");
  };
  //tagsbox toggle
  const toggleTags = () => {
    const tagsBox = document.querySelector(`#tagsBox-${img.id}`);
    tagsBox.classList.toggle("show");
  };
  return (
    <div className="gel-img">
      <a
        href={img.source}
        target="_blank"
        rel="noreferrer noopener"
        className="img-source"
      >
        圖片來源
      </a>
      <div className="gelbooru-img">
        <img src={img.preview_url} alt={img.file_url} />
      </div>
      <label htmlFor={img.id} className="showTags" onClick={toggleTags}>
        顯示Tags
      </label>
      <div className="tags" id={`tagsBox-${img.id}`}>
        <label
          htmlFor={img.id}
          className="closeTags"
          onClick={() => {
            toggleTags();
            setMsgStatus("hidden");
          }}
        >
          關閉Tags
        </label>
        <button className="copy-btn" onClick={copyTags}>
          複製Tags
        </button>
        <button
          className="download-tags"
          onClick={() => {
            const tags = document.querySelector(`#tag-${img.id}`).innerHTML;
            downloadTags(tags, `${img.id}.txt`);
          }}
        >
          下載Tags
        </button>
        <p className="tags" id={`tag-${img.id}`}>
          {img.tags}
        </p>
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
        下載Tags
      </button>
      <a
        href={`https://gelbooru.com/index.php?page=post&s=view&id=${img.id}`}
        className="gel-page"
        target="_blank"
        rel="noreferrer noopener"
      >
        查看G網
      </a>
      <Message
        msgStatus={msgStatus}
        setMsgStatus={setMsgStatus}
        message={msg}
      />
    </div>
  );
};

export default Imgs;
