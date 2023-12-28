import React from "react";
import gif from "../Assets/ghibli-gif.gif"
import "../Styles/MainPage.css";

function MainPage() {
  return (
    <div className="main-page">
  
      <div className="main-container">
        <div className="bg-image">
          <img src={gif} alt="Ghibli GIF" />
        </div>
        <div className="gif-container">
          <div className="content">
          <h1>Welcome to the Studio Ghibli-verse</h1>
          <p>
            Exploration of the Ghibli-verse, compile your list of favourite
            films and put your Ghibli knowledge to the test!
          </p>
        </div>
        </div>
        
      </div>
    </div>
  );
}

export default MainPage;
