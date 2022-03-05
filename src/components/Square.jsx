import React from "react";
import "../index.css";

const Square = ({ onClick, state }) => {
    return(
        <div className="container">
        <button 
            className="square" 
            onClick={ onClick }>
            { state }
        </button>
        </div>
    )
};

export default Square;