import React from "react";
const Message = ({ msgStatus, setMsgStatus }) => {
  const checkBtn = () => {
    setMsgStatus("hidden");
  };
  return (
    <div className={msgStatus}>
      <p>Tags已複製至剪貼簿</p>
      <button onClick={checkBtn}>確認</button>
    </div>
  );
};

export default Message;
