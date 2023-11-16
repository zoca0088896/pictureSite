import React, { useState } from "react";
import Message from "./Message";
const DanbooruImg = ({ img }) => {
  let [msgStatus, setMsgStatus] = useState("hidden");
  let [msg, setMsg] = useState("");
  //use blob to download img
  const downloadImg = async (link, imgName) => {
    let res = await fetch(link);
    let picBlob = await res.blob();
    let blobURL = URL.createObjectURL(picBlob);
    const a = document.createElement("a");
    a.href = blobURL;
    a.download = imgName;
    a.click();
    URL.revokeObjectURL(blobURL);
    setMsgStatus("success");
    setMsg("已開始下載，請確認");
  };
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
  if (img.file_ext === "mp4" || img.file_ext === "webm") {
    return (
      <div className="dan-file">
        <a
          href={img.source}
          className="video-source"
          target="_blank"
          rel="noreferrer noopener"
        >
          影片來源
        </a>
        <div className="danbooru-video">
          <video src={img.file_url} autoPlay muted loop></video>
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
            {img.tag_string}
          </p>
        </div>
        <a href={img.large_file_url} target="_blank" rel="noreferrer noopener">
          高清大圖
        </a>

        <button
          className="download-tags"
          onClick={() => {
            const tags = document.querySelector(`#tag-${img.id}`).innerHTML;
            downloadTags(tags, `${img.id}.txt`);
          }}
        >
          下載Tags
        </button>
        <button
          onClick={() => {
            downloadImg(img.large_file_url, img.id);
          }}
        >
          下載影片
        </button>
        <Message
          msgStatus={msgStatus}
          setMsgStatus={setMsgStatus}
          message={msg}
        />
      </div>
    );
  }
  return (
    <div className="dan-file">
      <a
        href={img.source}
        target="_blank"
        rel="noreferrer noopener"
        className="img-source"
      >
        圖片來源
      </a>
      <a
        href={`https://danbooru.donmai.us/posts/${img.id}`}
        target="_blank"
        rel="noreferrer noopener"
      >
        查看D網
      </a>
      <div className="danbooru-img">
        <img src={img.file_url} alt="發生錯誤，請確認來源或查看大圖" />
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
          {img.tag_string}
        </p>
      </div>
      <a href={img.large_file_url} target="_blank" rel="noreferrer noopener">
        高清大圖
      </a>
      <button
        className="download-tags"
        onClick={() => {
          const tags = document.querySelector(`#tag-${img.id}`).innerHTML;
          downloadTags(tags, `${img.id}.txt`);
        }}
      >
        下載Tags
      </button>
      <button
        onClick={() => {
          downloadImg(img.large_file_url, img.id);
        }}
      >
        下載圖片
      </button>
      <Message
        msgStatus={msgStatus}
        setMsgStatus={setMsgStatus}
        message={msg}
      />
    </div>
  );
};

export default DanbooruImg;
