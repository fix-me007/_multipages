import { useEffect, useState } from "react";
function TimerCompo({ name, value }) {

  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState();

  useEffect(() => {
    setSeconds(value);
  }, [value]);

  useEffect(() => {
    let interval = null;
    if (running) {
      interval = setInterval(() => {
        setSeconds(seconds + 1);
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [running, seconds]);

  function secondsToDisplay(seconds) {
    const MINUTE_SECONDS = 60;
    const HOUR_SECONDS = 60 * MINUTE_SECONDS;
    const DAY_SECONDS = 60 * HOUR_SECONDS;

    const days = Math.floor(seconds / DAY_SECONDS);
    const hours = Math.floor((seconds % DAY_SECONDS) / HOUR_SECONDS);
    const minutes = Math.floor((seconds % HOUR_SECONDS) / MINUTE_SECONDS);
    const secs = seconds % MINUTE_SECONDS;

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m ${secs}s`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  }

  function resetClick() {
    setRunning(false);
    setSeconds(0);
  }

  return (
    <div className="border border-warning rounded p-3 shadow-sm">
      <div>
        <h1 className="display-6">{name || 'Timer'}</h1>
        <p className="py-3">
          <input
            type="text"
            readOnly={true}
            className="form-control"
            value={secondsToDisplay(seconds)}
          />
        </p>
      </div>
      <div className="d-flex justify-content-between">
        <button onClick={resetClick} className="btn btn-danger">Reset</button>
        <button
          onClick={() => setRunning(!running)}
          className={"btn " + (running ? "btn-warning" : "btn-success")}
        >
          {running ? "Pause" : "Run"}
        </button>
      </div>
    </div>
  );
}

export default TimerCompo;
