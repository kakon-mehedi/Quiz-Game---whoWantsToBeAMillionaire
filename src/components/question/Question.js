import React, { useEffect, useState } from "react";
import useSound from "use-sound";

import { moneyAmount } from "../../data";
import play from "../../sounds/play.mp3";
import wait from "../../sounds/wait.mp3";
import correct from "../../sounds/correct.mp3";
import wrong from "../../sounds/wrong.mp3";

import "./question.css";

function Question({
  quiz,
  questionNumber,
  setQuestionNumber,
  setMoneyEarned,
  setTime,
  setTimerOff,
  setStop,
}) {
  const [answerClicked, setAnswerClicked] = useState(null);
  const [className, setClassName] = useState("quiz-option");

  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);
  const [wait] = useSound(wrong);

  const handleOptionClick = (answer) => {
    setAnswerClicked(answer);
    setTimerOff(true);

    if (answer.correct) {
      setClassName("quiz-option correct");
      setTimeout(() => {
        correctAnswer();
      }, 2300);

      setTimeout(() => {
        setQuestionNumber((prev) => prev + 1);
        setTime(20);
        setAnswerClicked(null);
      }, 6000);
    } else {
      setClassName("quiz-option wrong");

      setTimeout(() => {
        wrongAnswer();
      }, 2300);

      setTimeout(() => {
        setStop(true);
        const totalEarning =
          questionNumber > 1 ? moneyAmount[questionNumber - 2].amount : "$ 0";
        setMoneyEarned(totalEarning);
      }, 6000);
    }
  };

  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  return (
    <>
      <div className="quiz-question">
        <p className="question-text">{quiz.question}</p>
      </div>

      <ul className="quiz-option-list">
        {quiz.answers.map((answer, id) => {
          return (
            <li
              className={answerClicked === answer ? className : "quiz-option"}
              key={id}
              onClick={() => !answerClicked && handleOptionClick(answer)}
            >
              {answer.text}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Question;
