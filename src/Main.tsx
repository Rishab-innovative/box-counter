import React, { useState, useEffect } from "react";

interface Counter {
  id: number;
  value: number;
  intervalId: NodeJS.Timer | null;
  stopButton: boolean;
  startButton: boolean;
  visible: boolean;
}

const Main: React.FC = () => {
  const [totalCount, setTotalCount] = useState<number>(0);
  const [counters, setCounters] = useState<Counter[]>([]);

  const addCounter = () => {
    const counterId = Date.now();
    const newCounter: Counter = {
      id: counterId,
      value: 0,
      intervalId: null,
      stopButton: false,
      startButton: true,
      visible: true,
    };

    setCounters((prevCounters) => [...prevCounters, newCounter]);
  };

  const stopCounter = (counterId: number) => {
    const counter = counters[counterId];
    if (counter && counter.intervalId) {
      clearInterval(counter.intervalId);
      const updatedCounters = [...counters];
      updatedCounters[counterId] = {
        ...counter,
        intervalId: null,
        stopButton: false,
        startButton: true,
      };
      setCounters(updatedCounters);
    }
  };

  const startCounter = (counterId: number) => {
    const counter = counters[counterId];
    if (counter && !counter.intervalId) {
      const newIntervalId = setInterval(() => {
        setCounters((prevCounters) => {
          const updatedCounters = prevCounters.map((count, index) => {
            if (index === counterId) {
              return { ...count, value: count.value + 1 };
            }
            return count;
          });
          return updatedCounters;
        });
      }, 1000);

      const updatedCounters = [...counters];
      updatedCounters[counterId] = {
        ...counter,
        intervalId: newIntervalId,
        stopButton: true,
        startButton: false,
      };
      setCounters(updatedCounters);
    }
  };

  useEffect(() => {
    const total = counters.reduce((acc, counter) => acc + counter.value, 0);
    setTotalCount(total);
  }, [counters]);

  return (
    <div className="container">
      <div className="navbar">
        <button className="add-btn" onClick={addCounter}>
          ADD COUNTER
        </button>
        <h2 className="answer">Total Count = {totalCount}</h2>
      </div>
      <div className="counter-container">
        {counters.map((counter, index) => (
          <div key={counter.id} className="a">
            {counter.visible && (
              <>
                <button
                  onClick={() => stopCounter(index)}
                  className={counter.stopButton ? "add-btn" : "add-btn2"}
                >
                  Stop Counter
                </button>
                <button
                  onClick={() => startCounter(index)}
                  className={counter.startButton ? "add-btn" : "add-btn2"}
                >
                  Start Counter
                </button>
                <p className="value-box">{counter.value}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
