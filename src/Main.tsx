import React, { useState } from "react";
const Main: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>();
  function aa() {
    setInterval(() => {
      setCount((prevState) => prevState + 1);
      console.log(count);
    }, 1000);
  }

  return (
    <div className="container">
      <div className="wrapper">
        <button className="btn" onClick={aa}>
          click me
        </button>
        <h2 className="answer">answer = {count}</h2>
      </div>
    </div>
  );
};
export default Main;
