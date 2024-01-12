import React from "react";
import "../../Styles/Quiz.css";


//welcome page for the quiz

function WelcomeQuiz({ onStartQuiz }) {
  return (
    <div>
      <div className="welcome-quiz">
        <h1>Welcome to the Ghibli Quiz!</h1>
        <p>Are you ready to test your knowledge?</p>
        <button onClick={onStartQuiz}>Start Quiz!</button>
      </div>
    </div>
  );
}

export default WelcomeQuiz;
