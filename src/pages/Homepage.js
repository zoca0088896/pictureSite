import React from "react";

const Homepage = () => {
  return (
    <div className="homePage" style={{ minHeight: "100vh" }}>
      <h1>圖片搜集工具網</h1>
      <main>
        <section className="site-introduce">
          <div className="introduce">
            <h2>簡介</h2>
            <p>
              本網站為個人練習用project，目的為react基礎練習及api串接與介面呈現。
              <br />
              設計的靈感來源為AI繪圖的模型訓練，旨在於使AI繪圖的玩家可以更方便的尋找訓練用素材，以及內建的Tag文字檔下載，以供訓練模型。
              <br />
              或是可以從圖片的標籤當中尋找靈感或相似處，將圖片的Tags做為Text-to-Image(T2I)的文本。
              <br />
            </p>
          </div>
          <div className="feature-introduce">
            <h2>如何使用</h2>
          </div>
        </section>
        <section className="pages-feature">
          <h2>分頁特點</h2>
        </section>
      </main>
    </div>
  );
};

export default Homepage;
