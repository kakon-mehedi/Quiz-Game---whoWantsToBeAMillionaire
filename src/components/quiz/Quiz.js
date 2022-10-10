import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { moneyAmount, quizData } from "../../data";
import Question from "../question/Question";
import Timer from "../timer/Timer";
import "./quiz.css";

function Quiz() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [time, setTime] = useState(20);
  const [stop, setStop] = useState(false);
  const [moneyEarned, setMoneyEarned] = useState(0);
  const [timerDelay, setTimerDelay] = useState(false);
  const [timerOff, setTimerOff] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setTimerDelay(true);
    }, 5000);
  }, [questionNumber]);

  useEffect(() => {
    setTimerDelay(false);
    setTimerOff(false);
  }, [questionNumber]);

  const API_URL =
    "https://opentdb.com/api.php?amount=15&category=18&difficulty=easy";

  return (
    <div className="main-container">
      {stop ? (
        <div className="score-container">
          <p className="you-earned">You've earned: {moneyEarned} </p>
          <button className="play-again-btn" onClick={() => navigate("/home")}>
            Play Again
          </button>
        </div>
      ) : (
        <>
          <div className="quiz-section">
            <div className="quiz-top">
              {!timerDelay || timerOff ? (
                ""
              ) : (
                <Timer
                  questionNumber={questionNumber}
                  setMoneyEarned={setMoneyEarned}
                  time={time}
                  setTime={setTime}
                  timerDelay={timerDelay}
                  setTimerDelay={setTimerDelay}
                  setStop={setStop}
                />
              )}
            </div>

            <div className="quiz-bottom">
              {quizData[questionNumber - 1] ? (
                <Question
                  quiz={quizData[questionNumber - 1]}
                  setQuestionNumber={setQuestionNumber}
                  questionNumber={questionNumber}
                  setMoneyEarned={setMoneyEarned}
                  setTime={setTime}
                  setTimerOff={setTimerOff}
                  setStop={setStop}
                />
              ) : (
                <p>Game over</p>
              )}
            </div>
          </div>

          <div className="money-section">
            <div className="money-container">
              {moneyAmount
                .map((money) => {
                  return (
                    <div
                      className={
                        money.id === questionNumber ? "money active" : "money"
                      }
                      key={money.id}
                    >
                      <span className="question-number">{money.id}</span>
                      <span className="answer-amount">{money.amount}</span>
                    </div>
                  );
                })
                .reverse()}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Quiz;
