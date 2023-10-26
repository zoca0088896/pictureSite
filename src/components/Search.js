import React from "react";

const Search = ({ searchHandler, setInput, input }) => {
  const inputHandler = (e) => {
    setInput(e.target.value);
  };
  return (
    <div className="search">
      <input type="text" className="input" onChange={inputHandler} />
      <button onClick={searchHandler}>search</button>
    </div>
  );
};

export default Search;
