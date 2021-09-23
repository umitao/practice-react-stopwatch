import "./App.css";

import React, { useState, useEffect } from "react";

const convertTimeToString = (time) => {
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const hundredths = Math.floor((time / 10) % 100);

  const padNumber = (number) => number.toString().padStart(2, "0");
  return `${padNumber(minutes)}:${padNumber(seconds)}.${padNumber(hundredths)}`;
};

const stopTimer = (timer) => timer.pauseTime - timer.startTime;

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timer, setTimer] = useState({
    startTime: 0,
    pauseTime: 0,
    totalTime: 0,
    currentLapTime: 0,
    lapTimes: [],
  });

  const timeElapsed = (startTime) => {
    return Date.now() - startTime;
  };

  const start = () => {
    setIsRunning(true);
    setTimer({ ...timer, startTime: Date.now() });
  };

  const stop = () => {
    setIsRunning(false);
    setIsPaused(true);
    setTimer((timer) => {
      return { ...timer, pauseTime: Date.now() };
    });
  };

  useEffect(() => {
    if (isRunning) {
      const timerID = setInterval(() => {
        setTimer({ ...timer, totalTime: timeElapsed(timer.startTime) });
      }, 10);

      return () => {
        clearInterval(timerID);
      };
    }
  }, [isRunning, timer.totalTime]);

  return (
    <div className="App">
      <div className="top">
        <div className="digits">
          <p>{convertTimeToString(timer.totalTime)}</p>
        </div>
        <div className="buttons">
          <button className="start" onClick={start}>
            Start
          </button>
          <button className="stop" onClick={stop}>
            Stop
          </button>
        </div>
      </div>
      <div className="bottom">
        <table>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

// useEffect(() => {
//   const interval = setInterval(() => {
//     console.log("This will run every second!");
//   }, 1000);
//   return () => clearInterval(interval);
// }, []);

// function handleTimer(startTimeStamp, elapsedTimeStamp) {
//   if (!isRunning) {
//     timer = Math.floor(Date.now() - startTimeStamp);
//     setInterval(convertTimeToString(timer), 10);
//   }

//   return convertTimeToString(timer);
// }

//Laps array
// Ms to Minutes Seconds Milliseconds
//<tr key={lapID}><td>Lap {lapID}</td><td>{lapTime}</td></tr>
//getMs(lapTime)
