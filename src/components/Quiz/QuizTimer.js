import React from "react";
import "../../Styles/QuizTimer.css";
import { useEffect, useState, useRef } from "react";


function QuizTimer({ duration, onTimeUp }) {
  //state variables for managing the timer 
  const [counter, setCounter] = useState(0);      //rep current time elapsed in seconds
  const [progress, setProgress] = useState(0);    //rep progress of timer as a %

  //ref to store the interval ID for clearing it later
  const intervalRef = useRef();

//useeffect to start the timer when the comp mounts 
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCounter((current) => current + 1);
    }, 1000);      //increment every second 

    return () => clearInterval(intervalRef.current);          //cleanup function to clear the interval when comp unmounts
  }, []);       //empty dep array to ensure the effect runs once only when on mount


  //effect to update the timer progress and handle time-up
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
