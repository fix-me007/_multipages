import React, { useState, useEffect } from 'react';


const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [history, setHistory] = useState("");
  const [currentInput, setCurrentInput] = useState("");
  const [lastOperation, setLastOperation] = useState(null);
  const [numA, setNumA] = useState(null);
  const [numB, setNumB] = useState(null);
  const [result, setResult] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key;
      if (key === 'Enter') {
        event.preventDefault();
      }

      if (/^[0-9]$/.test(key)) {
        inputNumber(parseInt(key));
      }
      // ตรวจสอบ operators
      else if (['+', '-', '*', '/'].includes(key)) {
        handleOperation(key);
      }
      else if (key === 'Enter' || key === '=') {
        calculate();
      }
      else if (key === 'Escape') {
        clearDisplay();
      }
      else if (key === 'Backspace') {
        handleBackspace();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentInput, lastOperation, numA]);

  const inputNumber = (number) => {
    if (currentInput === "0") {
      setCurrentInput(number.toString());
      setDisplay(number.toString());
      updateHistory(number.toString());
      return;
    }

    if (currentInput.length >= 12) {
      setError("Maximum input length");
      return;
    }

    const newInput = currentInput + number.toString();
    setCurrentInput(newInput);
    setDisplay(newInput);
    updateHistory(number.toString());
    setError(""); // ล้าง error message
  };

  const handleOperation = (operator) => {
    setError("");

    // ถ้ามี error ไม่ให้ทำการคำนวณต่อ
    if (error) return;

    if (numA === null && currentInput === "") {
      setNumA("0"); // ถ้าไม่มีตัวเลขแรก ให้ใช้ 0
    } else if (numA === null) {
      setNumA(currentInput);
    } else if (lastOperation && currentInput !== "") {
      setNumB(currentInput);
      calculate(operator);
      return;
    } else if (numA !== null && currentInput === "") {
      setLastOperation(operator);
      setDisplay(operator);
      updateHistory(` ${operator} `);
      return;
    }
    
    setLastOperation(operator);
    setCurrentInput("");
    setDisplay(operator);
    updateHistory(` ${operator} `);
  };

  const calculate = (nextOperation = null) => {
    if (numA === null || (currentInput === "" && nextOperation === null)) return;

    const a = parseFloat(numA);
    const b = currentInput === "" ? a : parseFloat(currentInput);
    let calculatedResult;

    try {
      switch (lastOperation) {
        case '+':
          calculatedResult = a + b;
          break;
        case '-':
          calculatedResult = a - b;
          break;
        case '*':
          calculatedResult = a * b;
          break;
        case '/':
          if (b === 0) {
            throw new Error("Cannot divide by zero");
          }
          calculatedResult = a / b;
          break;
        default:
          return;
      }

      calculatedResult = Number(calculatedResult.toFixed(8));

      if (!isFinite(calculatedResult)) {
        throw new Error("Result is too large");
      }

      setResult(calculatedResult);
      setNumA(calculatedResult.toString());
      setNumB(null);
      setDisplay(calculatedResult.toString());
      
      if (!nextOperation) {
        setCurrentInput(calculatedResult.toString());
        updateHistory(` = ${calculatedResult}`);
        setLastOperation(null);
      }

      setError("");
    } catch (err) {
      setError(err.message);
      clearDisplay();
    }
  };

  const clearDisplay = () => {
    setDisplay("0");
    setHistory("");
    setCurrentInput("");
    setLastOperation(null);
    setNumA(null);
    setNumB(null);
    setResult(0);
    setError("");
  };

  const handleBackspace = () => {
    if (currentInput === "") return;
    
    const newInput = currentInput.slice(0, -1);
    setCurrentInput(newInput);
    setDisplay(newInput === "" ? "0" : newInput);
    setHistory(prev => prev.slice(0, -1));
  };

  const updateHistory = (value) => {
    setHistory(prev => prev + value);
  };

  const buttonStyles = {
    basic: "btn btn-secondary fs-4 p-4 w-100",
    clear: "btn btn-danger fs-4 p-4 w-100",
    backspace: "btn btn-warning fs-4 p-4 w-100",
    operator: "btn btn-light fs-4 p-4 w-100",
    equals: "btn btn-primary fs-4 p-4 h-100 w-100"
  };

  return (
    <div className="container d-flex align-items-center justify-content-center">
      <div className="card" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="card-header bg-primary text-white text-center py-4">
          <h2 className="mb-0 bg-primary">Calculate</h2>
        </div>
        <div className="card-body">
          <div className="mb-4">
            {error && (
              <div className="alert alert-danger py-2 mb-2" role="alert">
                {error}
              </div>
            )}
            <input
              type="text"
              title="display"
              value={display}
              className="form-control form-control-lg text-end py-4 mb-3"
              disabled
            />
            <input
              type="text"
              title="history"
              value={history}
              className="form-control form-control-lg text-end py-3 bg-light"
              disabled
            />
          </div>
          <div className="row g-2">
            <div className="col-3">
              <button className={buttonStyles.clear} onClick={clearDisplay}>C</button>
            </div>
            <div className="col-3">
              <button className={buttonStyles.backspace} onClick={handleBackspace}>⌫</button>
            </div>
            <div className="col-3">
              <button className={buttonStyles.operator} onClick={() => handleOperation('/')}>/</button>
            </div>
            <div className="col-3">
              <button className={buttonStyles.operator} onClick={() => handleOperation('*')}>*</button>
            </div>

            <div className="col-3">
              <button className={buttonStyles.operator} onClick={() => handleOperation('-')}>-</button>
            </div>
            {/* //map ปุ่ม */}
            {[7, 8, 9].map((num) => (
              <div key={num} className="col-3">
                <button 
                  className={buttonStyles.basic}
                  onClick={() => inputNumber(num)}
                >
                  {num}
                </button>
              </div>
            ))}

            <div className="col-3">
              <button className={buttonStyles.operator} onClick={() => handleOperation('+')}>+</button>
            </div>
            {/* //map ปุ่ม */}
            {[4, 5, 6].map((num) => (
              <div key={num} className="col-3">
                <button 
                  className={buttonStyles.basic}
                  onClick={() => inputNumber(num)}
                >
                  {num}
                </button>
              </div>
            ))}

            <div className="col-3">
              <button 
                className={buttonStyles.equals}
                onClick={() => calculate()}
              >=</button>
            </div>
            {/* //map ปุ่ม */}
            <div className="col-9">
              <div className="row g-2">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="col-4">
                    <button 
                      className={buttonStyles.basic}
                      onClick={() => inputNumber(num)}
                    >
                      {num}
                    </button>
                  </div>
                ))}
                <div className="col-8">
                  <button 
                    className={buttonStyles.basic}
                    onClick={() => inputNumber(0)}
                  >0</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;