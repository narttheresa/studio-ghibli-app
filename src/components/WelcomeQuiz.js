import React from "react";

function WelcomeQuiz({ onStartQuiz }) {
  return (
    <div className="welcome-quiz">
      <h1>Welcome to the Ghibli Quiz!</h1>
      <p>Are you ready to test your knowledge?</p>
      <button onClick={onStartQuiz}>Start Quiz!</button>
    </div>
  );
}


export default WelcomeQuiz;