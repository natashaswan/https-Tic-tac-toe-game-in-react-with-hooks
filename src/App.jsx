import React from "react";
import Board from "./components/Board";
import Textblock from "./components/Textblock";
import "./index.css";

const App = () => {
  return (
    <div className="container">
      <Textblock />
      <Board />
    </div>
  )
}

export default App;