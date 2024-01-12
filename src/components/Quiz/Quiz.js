import React, { useState } from "react";
import "../../Styles/Quiz.css";
import { resultInitialState } from "../../Data/Questions";
import QuizTimer from "./QuizTimer";
import ResultQuiz from "./ResultQuiz";
import WelcomeQuiz from "./WelcomeQuiz";
import gif from "../../Assets/ghibli-gif.gif";

function Quiz({ questions }) {
  //state variables for managing quiz state 
  const [currentQuestion, setCurrentQuestion] = useState(0);    //current Q
  const [answerIndex, setAnswerIndex] = useState(null);         //selected A
  const [answer, setAnswer] = useState(null);                    //whether selected A is correct-boolean value
  const [result, setResult] = useState(resultInitialState);     //tracks the quiz result
  const [showResult, setShowResult] = useState(false);          //when to display the result or not
  const [showQuizTimer, setShowQuizTimer] = useState(true);     //control visibility of the quiz timer
  const [quizStart, setQuizStart] = useState(false);            //whether the quiz started or not

  const { question, choices, correctAnswer } = questions[currentQuestion];

  //to start the quiz set it to true
  function startQuiz() {
    setQuizStart(true);
  }

  //function to handle user's selected answer choice
  function onAnswerClick(answer, index) {
    setAnswerIndex(index);
    if (answer === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  }

  //function to handle the "next" button click, updates the results and moves to the next Q
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
    });
  }

//function to handle show result state
  function onTryAgain() {
    setResult(resultInitialState);
    setShowResult(false);
  }

 //function to handle time-up event 
  function handleTimeUp() {
    setAnswer(false);
    onClickNext(false);
  }

  return (
    <div className="quiz-wrapper">
      <div className="bg-img">
        <img src={gif} alt="Ghibli GIF" />
        {!quizStart ? (
          <WelcomeQuiz onStartQuiz={startQuiz} />
        ) : !showResult ? (
          <div className="quiz-container">
            {showQuizTimer && (
              <QuizTimer duration={15} onTimeUp={handleTimeUp} />
            )}
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
              <button
                onClick={() => onClickNext(answer)}
                disabled={answerIndex === null}
              >
                {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        ) : (
          <ResultQuiz
            result={result}
            onTryAgain={onTryAgain}
            totalQuestions={questions.length}
          />
        )}
      </div>
    </div>
  );
}

export default Quiz;
