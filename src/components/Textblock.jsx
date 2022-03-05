import React from "react";
import "../index.css";

const Textblock = ({ text }) =>{ 
  
    return(
        <div className="container">
            <h1> { (text) && `${ text } is the Winner!` } </h1>
            { (text) && <button className="buttonPlayAgain" onClick={() =>window.location.reload(false)}>Play again</button> }
        </div>
    )    
}

export default Textblock;