import "./App.css";
import React, { useState, useEffect } from "react";

const convertTimeToString = (time) => {
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const hundredths = Math.floor((time / 10) % 100);

  const padNumber = (number) => number.toString().padStart(2, "0");
  return `${padNumber(minutes)}:${padNumber(seconds)}.${padNumber(hundredths)}`;
};

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

  const timeElapsed = (time) => {
    return Date.now() - time;
  };

  const start = () => {
    setIsRunning(true);
    if (isPaused) {
      setTimer({ ...timer, startTime: Date.now() - timer.totalTime });
      // setTimer({ ...timer, startTime: Date.now() + timer.totalTime });
      setIsPaused(false);
    } else {
      setTimer({ ...timer, startTime: Date.now() });
    }
  };

  const stop = () => {
    setIsRunning(false);
    setIsPaused(true);
    setTimer({
      ...timer,
      pauseTime: Date.now(),
      // totalTime: Date.now() - timer.startTime,
    });
  };

  const reset = () => {
    setIsPaused(false);
    setTimer({ ...timer, startTime: 0, totalTime: 0, pauseTime: 0 });
  };

  // this.setState({
  //   arrayvar: [...this.state.arrayvar, newelement]
  // })

  const lap = () => {
    const tempLap = timer.totalTime;
    console.log(tempLap);
    //setTimer({ ...timer, lapTimes: [...lapTimes, tempLap] });
    return;
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
    if (isPaused) {
      const resumeTimer = setInterval(() =>
        setTimer({ ...timer, startTime: timer.startTime + timer.totalTime })
      );
      return () => clearInterval(resumeTimer);
    }
  }, [isRunning, timer.totalTime]);

  return (
    <div className="App">
      <div className="top">
        <div className="digits">
          <p>{convertTimeToString(timer.totalTime)}</p>
        </div>
        <div className="buttons">
          {isPaused ? (
            <button className="reset" onClick={reset}>
              Reset
            </button>
          ) : (
            <button className="lap" onClick={lap}>
              Lap
            </button>
          )}
          {!isRunning ? (
            <button className="start" onClick={start}>
              Start
            </button>
          ) : (
            <button className="stop" onClick={stop}>
              Stop
            </button>
          )}
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
