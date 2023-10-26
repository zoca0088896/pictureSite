import React from "react";

const Picture = ({ photo }) => {
  return (
    <div className="picture">
      <p className="photographer">{photo.photographer}</p>
      <div className="imageContainer">
        <img src={photo.src.large} alt={photo.alt} />
      </div>
      <p>
        在此下載圖片：
        <a href={photo.src.large} target="_blank" rel="noreferrer noopener">
          按一下
        </a>
      </p>
    </div>
  );
};

export default Picture;
