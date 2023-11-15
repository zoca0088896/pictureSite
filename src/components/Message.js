import React from "react";
const Message = ({ msgStatus, setMsgStatus, message }) => {
  const checkBtn = () => {
    setMsgStatus("hidden");
  };
  return (
    <div className={`msg ${msgStatus}`}>
      <p>{message}</p>
      <button onClick={checkBtn} id="check-btn">
        確認
      </button>
    </div>
  );
};

export default Message;
