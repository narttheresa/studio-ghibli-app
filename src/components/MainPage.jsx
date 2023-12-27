import React from "react";
import ReactPlayer from "react-player";
import "../Styles/MainPage.css"

function MainPage() {
  return (
    <div className="main-page">
      <ReactPlayer
        className="bg-video"
        url="/Assets/ghibli-loop-video-low.mp4"
        playing
        loop
        muted
        width="100%"
        height="100%"
        style={{ objectFit: "cover" }}
      />
      <div className="main-container">
        <div className="content">
          <h1>Welcome to the Studio Ghibli database!</h1>
          <p>
            Exploration of the Ghibli-verse, compile your list of favourite
            films and put your Ghibli knowledge to the test.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
