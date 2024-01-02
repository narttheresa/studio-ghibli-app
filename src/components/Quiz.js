import React, { useState } from "react";
import "../Styles/Quiz.css";
import { resultInitialState } from "../Data/Questions";

function Quiz({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIndex, setAnswerIndex] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultInitialState);

  const { question, choices, correctAnswer } = questions[currentQuestion];

  function onAnswerClick(answer, index) {
    setAnswerIndex(index);
    if (answer === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  }

  function onClickNext() {
    setAnswerIndex(null);
    setResult((previous) =>
      answer
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
    }
  }

  return (
    <div className="quiz-wrapper">
      <div className="quiz-container">
        <div>
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
            <button onClick={onClickNext} disabled={answerIndex === null}>
              {currentQuestion === question.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
