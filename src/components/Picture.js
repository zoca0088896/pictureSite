import React from "react";

const Picture = ({ photo }) => {
  return (
    <div className="picture">
      <p className="photographer">{photo.photographer}</p>
      <div className="imageContainer">
        <img src={photo.src.large} alt={photo.alt} />
      </div>
      <a href={photo.src.large} target="_blank" rel="noreferrer noopener">
        高清大圖
      </a>
    </div>
  );
};

export default Picture;
