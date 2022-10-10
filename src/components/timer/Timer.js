import React, { useEffect, useState } from "react";

import "./timer.css";
import { moneyAmount } from "../../data";

function Timer({
  questionNumber,
  setMoneyEarned,
  setStop,
  time,
  setTime,
  timerDelay,
  setTimerDelay,
}) {
  useEffect(() => {
    if (time === 0) setStop(true);

    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time, questionNumber]);

  return <div className="timer">{time}</div>;
}

export default Timer;
