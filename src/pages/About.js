import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import axios from "axios";
const About = () => {
  const auth = process.env.REACT_APP_GELBOORUKEY;
  const initialURL =
    "https://gelbooru.com/index.php?page=dapi&s=post&q=index&limit=30&pid=0&tags=";
  axios.get(initialURL).then((data) => {
    console.log(data);
  });
  return (
    <div>
      <Search />
      <h2>About page</h2>
    </div>
  );
};
export default About;
