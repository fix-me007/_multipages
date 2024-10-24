import { useState } from "react";

function Counter(prop) {
  const [value, setValue] = useState(prop.value || 0);

  function increment() {
    setValue(value + 1);
  }

  const decrement = () => setValue(value - 1);

  return (
    <div className="border border-primary text-white rounded p-3 shadow-sm">
      <h1 className="display-6">{prop.name || "Counter"}</h1>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button onClick={decrement} className="btn btn-primary">-</button>
        <span>{value}</span>
        <button onClick={increment} className="btn btn-danger">+</button>
      </div>
    </div>
  );
}

export default Counter;
