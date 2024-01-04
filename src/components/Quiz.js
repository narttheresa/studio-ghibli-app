import React, { useState } from "react";
import "../Styles/Quiz.css";
import { resultInitialState } from "../Data/Questions";
import QuizTimer from "./QuizTimer";
import ResultQuiz from "./ResultQuiz";
import WelcomeQuiz from "./WelcomeQuiz";


function Quiz({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIndex, setAnswerIndex] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultInitialState);
  const [showResult, setShowResult] = useState(false);
  const [showQuizTimer, setShowQuizTimer] = useState(true);
  const [quizStart, setQuizStart] = useState(false);

  const { question, choices, correctAnswer } = questions[currentQuestion];

  function startQuiz() {
    setQuizStart(true);
  }

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
    setShowQuizTimer(false);
    setResult((previous) =>
      finalAnswer
        ? {
            ...previous,
            score: previous.score + 1,
            correctAnswers: previous.correctAnswers + 1,
          }
        : {
            ...previous,
            wrongAnswers: previous.wrongAnswers + 1,
          }
    );
    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }

    setTimeout(() => {
        setShowQuizTimer(true);
    })
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
      {!quizStart ? (
        <WelcomeQuiz onStartQuiz={startQuiz} />
      ) : !showResult ? (
        <div className="quiz-container">
          {showQuizTimer && <QuizTimer duration={15} onTimeUp={handleTimeUp} />}
          <span className="active-question-num">{currentQuestion + 1}</span>
          <span className="total-question-num">/{questions.length}</span>
          <h2>{question}</h2>
          <ul>
            {choices.map((choice, index) => (
              <li
                key={choice}
                onClick={() => onAnswerClick(choice, index)}
                className={answerIndex === index ? "selected-answer" : null}
              >
                {choice}
              </li>
            ))}
          </ul>
          <div className="button-wrapper">
            <button onClick={() => onClickNext(answer)} disabled={answerIndex === null}>
              {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      ) : (
        <ResultQuiz result={result} onTryAgain={onTryAgain} totalQuestions={questions.length} />
      )}
    </div>
  );
}

export default Quiz;
