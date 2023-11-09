import React from "react";

const Imgs = ({ img }) => {
  const copyTags = () => {
    const tags = document.querySelector(`#tag-${img.id}`).innerHTML;
    navigator.clipboard
      .writeText(tags)
      .then(() => {
        alert("已複製至剪貼簿");
      })
      .catch((err) => {
        console.log(err);
      });
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
      </div>
      <a href={img.file_url} target="_blank" rel="noreferrer noopener">
        高清大圖
      </a>
    </div>
  );
};

export default Imgs;
