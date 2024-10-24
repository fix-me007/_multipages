import React, { useState, useEffect, useRef } from "react";
import "./Animation.css";

const Animation = () => {
  // fix
  const fieldWidth = 900;
  const fieldHeight = 400;
  const ballSize = 100;
  const maxLeft = fieldWidth - ballSize - 2;
  const maxTop = fieldHeight - ballSize - 2;
  const speed = 5;
  const rotationSpeed = 5;

  const [running, setRunning] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({
    vx: speed,
    vy: speed,
  });
  const [selectedBall, setSelectedBall] = useState("none");
  const [rotation, setRotation] = useState(0);
  const [rotationDirection, setRotationDirection] = useState(1); // 1 for clockwise, -1 for counter-clockwise

  // Refs
  const animationRef = useRef(null);

  // Ball images
  const ballImages = {
    none: "",
    basketball: "ball/basketball.png",
    football: "ball/football.png",
    volleyball: "ball/volleyball.png",
    me: "ball/me.jpg",
    cartoon: "ball/cartoon.jpg",
    logo: "ball/logo.png",
  };

  const calculate = () => {
    setPosition((prev) => {
      let newX = prev.x + velocity.vx;
      let newY = prev.y + velocity.vy;
      let newVx = velocity.vx;
      let newVy = velocity.vy;
      let shouldChangeRotation = false;

      if (newX >= maxLeft) {
        newX = maxLeft;
        newVx = -velocity.vx;
        shouldChangeRotation = true;
      } else if (newX <= 0) {
        newX = 0;
        newVx = -velocity.vx;
        shouldChangeRotation = true;
      }

      if (newY >= maxTop) {
        newY = maxTop;
        newVy = -velocity.vy;
        shouldChangeRotation = true;
      } else if (newY <= 0) {
        newY = 0;
        newVy = -velocity.vy;
        shouldChangeRotation = true;
      }

      if (newVx !== velocity.vx || newVy !== velocity.vy) {
        setVelocity({ vx: newVx, vy: newVy });
      }

      if (shouldChangeRotation) {
        setRotationDirection((prev) => -prev);
      }
      
      setRotation((prev) => {
        let newRotation = prev + rotationSpeed * rotationDirection;
        if (newRotation >= 360) return newRotation - 360;
        if (newRotation < 0) return newRotation + 360;
        return newRotation;
      });

      return { x: newX, y: newY };
    });
  };

  const process = () => {
    if (running) {
      calculate();
    }
  };

  useEffect(() => {
    animationRef.current = setInterval(process, 20);
    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, [running, velocity]);

  const handleBallChange = (type) => {
    setSelectedBall(type);
  };

  const toggleRunning = () => {
    setRunning(!running);
  };

  const resetBall = () => {
    setPosition({ x: 0, y: 0 });
    setVelocity({ vx: speed, vy: speed });
    setRotation(0);
    setRotationDirection(1);
    setRunning(false);
  };

  return (
    <div id="container">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0 bg-primary">Ball Animation</h3>
        </div>

        <div className="card-body">
          <div className="field position-relative bg-light rounded shadow-sm overflow-hidden">
            <div
              className="ball"
              style={{
                width: `${ballSize}px`,
                height: `${ballSize}px`,
                transform: `rotate(${rotation}deg)`,
                backgroundImage: ballImages[selectedBall]
                  ? `url(${ballImages[selectedBall]})`
                  : "none",
                left: `${position.x}px`,
                top: `${position.y}px`,
              }}
            />
          </div>

          <div className="control">
            <div className="col-md-4">
              <div className="d-flex gap-2">
                <button
                  onClick={toggleRunning}
                  className={`btn ${
                    running ? "btn-danger" : "btn-success"
                  } btn-lg flex-grow-1`}
                >
                  <i
                    className={` bi bi-${
                      running ? "bg-danger pause-fill" : "bg-success play-fill"
                    } me-2`}
                  ></i>
                  {running ? "PAUSE" : "RUN"}
                </button>
                <button
                  onClick={resetBall}
                  className=" btn btn-secondary btn-lg"
                  title="Reset Position"
                >
                  <i className="bg-secondary bi bi-arrow-counterclockwise"></i>
                </button>
              </div>
            </div>

            <div className="col-md-8">
              <div className="btn-group" role="group">
                {Object.keys(ballImages).map((ballType) => (
                  <button
                    key={ballType}
                    onClick={() => handleBallChange(ballType)}
                    className={`btn ${
                      selectedBall === ballType
                        ? "btn-primary"
                        : "btn-outline-primary"
                    } text-capitalize`}
                  >
                    {ballType}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Animation;
