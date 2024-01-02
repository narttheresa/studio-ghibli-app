import React from "react";
import "../Styles/QuizTimer.css";
import { useEffect, useState, useRef } from "react";

function QuizTimer({ duration, onTimeUp }) {
  const [counter, setCounter] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCounter((current) => current + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    setProgress(100 * (counter / duration));

    if (counter === duration) {
      clearInterval(intervalRef.current);

      setTimeout(() => {
        onTimeUp();
      }, 1000);
    }
  }, [counter]);

  return (
    <div className="question-timer-container">
      <div 
        style={{
            width: `${progress}%`,
            backgroundColor: `${
                progress < 40
                ? "green"
                : progress < 75
                ? "orange"
                : "red"
            }`
        }}
        className="progress"></div>
    </div>
  );
}

export default QuizTimer;
