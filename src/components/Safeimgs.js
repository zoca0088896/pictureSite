import React, { useState } from "react";
import Message from "./Message";
const Safeimgs = ({ img }) => {
  let [msgStatus, setMsgStatus] = useState("hidden");
  //複製標籤至使用者的剪貼簿
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
  //將圖片資源轉為canvas再轉為base64並下載
  const downloadImg = async (link, imgName) => {
    let pic = new Image();
    //將圖片來源的連結添加至img物件
    pic.src = link;
    //同源政策，允許獲取跨域資源
    pic.setAttribute("crossOrigin", "Anoymous");
    //當圖片載入完畢(pic物件做成後)，使用onload來執行fn
    pic.onload = () => {
      let canvas = document.createElement("canvas");
      let context = canvas.getContext("2d");
      canvas.width = pic.width;
      canvas.height = pic.height;
      //利用canvas的drawImage，畫出原圖大小的圖片
      context.drawImage(pic, 0, 0, pic.width, pic.height);
      //返回一個包含圖片展示的data URI，即前綴為data:的URL (base64)
      let url = canvas.toDataURL("image/png");
      //創建虛擬的a tag並連結至data URI，並且附上download屬性
      let a = document.createElement("a");
      //download如果沒指定檔案名稱，則會命名為default.png(logic operator)
      a.download = imgName || "default.png";
      //a tag的href可以是base64編碼，而下載時透過瀏覽器會自動轉換成檔案
      a.href = url;
      a.click();
    };
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
      <button
        onClick={() => {
          const tags = document.querySelector(`#tag-${img.id}`).innerHTML;
          downloadTags(tags, `${img.id}.txt`);
        }}
      >
        下載Tags
      </button>
      <button
        onClick={() => {
          downloadImg(
            `https://safebooru.org//images/${img.directory}/${img.image}?${img.id}`,
            `${img.id}`
          );
        }}
      >
        下載圖片
      </button>
    </div>
  );
};

export default Safeimgs;
