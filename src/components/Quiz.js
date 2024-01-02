import React, { useState } from "react";
import "../Styles/Quiz.css";
import { resultInitialState } from "../Data/Questions";
import QuizTimer from "./QuizTimer";

function Quiz({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIndex, setAnswerIndex] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultInitialState);
  const [showResult, setShowResult] = useState(false)
  

  const { question, choices, correctAnswer } = questions[currentQuestion];

  function onAnswerClick(answer, index) {
    setAnswerIndex(index);
    if (answer === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  }

  function onClickNext(finalAnswer) {
    setAnswerIndex(null);
    setResult((previous) =>
      finalAnswer
        ? {
            ...previous,
            score: previous.score + 5,
            correctAnswers: previous.correctAnswers + 1,
          }
        : {
            ...previous,
            wrongAnswers: previous.wrongAnswers + 1,
          }
    );
    if(currentQuestion !== questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
    } else {
        setCurrentQuestion(0);
        setShowResult(true);
    }
  }

  function onTryAgain() {
    setResult(resultInitialState);
    setShowResult(false);
  }

  function handleTimeUp() {
    setAnswer(false);
    onClickNext(false);
  }

  return (
    <div className="quiz-wrapper">
        {!showResult ? (<div className="quiz-container">
        <div>
        <QuizTimer duration={10} onTimeUp={handleTimeUp} />   
          <span className="active-question-num">{currentQuestion + 1}</span>
          <span className="total-question-num">/{questions.length}</span>
          <h2>{question}</h2>
          <ul>
            {choices.map((answer, index) => (
              <li
                key={answer}
                onClick={() => onAnswerClick(answer, index)}
                className={answerIndex === index ? "selected-answer" : null}
              >
                {answer}
              </li>
            ))}
          </ul>
          <div className="button-wrapper">
            <button onClick={() => onClickNext(answer)} disabled={answerIndex === null}>
              {currentQuestion === question.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </div>) : <div className="result">
        <h3>Result</h3>
        <p>
            Total Questions: <span>{questions.length}</span>
        </p>
        <p>
            Total Score: <span>{result.correctAnswers}</span>
        </p>
        <p>
            Correct Answers: <span>{result.correctAnswers}</span>
        </p>
        <p>
            Wrong Answers: <span>{result.wrongAnswers}</span>
        </p>
        <button onClick={onTryAgain}>Try Again</button>
        </div>}
      
    </div>
  );
}

export default Quiz;
