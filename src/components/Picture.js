import React from "react";

const Picture = ({ photo }) => {
  const downloadImg = async (link, imgName) => {
    let res = await fetch(link);
    let picBlob = await res.blob();
    let blobURL = URL.createObjectURL(picBlob);
    const a = document.createElement("a");
    a.href = blobURL;
    a.download = imgName;
    a.click();
    URL.revokeObjectURL(blobURL);
  };
  return (
    <div className="picture">
      <p className="photographer">{photo.photographer}</p>
      <div className="imageContainer">
        <img src={photo.src.large} alt={photo.alt} />
      </div>
      <a href={photo.src.large} target="_blank" rel="noreferrer noopener">
        高清大圖
      </a>
      <button
        onClick={() => {
          downloadImg(photo.src.large, photo.id);
        }}
      >
        下載圖片
      </button>
    </div>
  );
};

export default Picture;
