import { useEffect, useState } from "react";
import Variable from "../Variable/Variable";

function Add({ v1, v2 }) {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  useEffect(() => {
    setA(v1);
    setB(v2);
  }, [v1, v2]);

  return (
    <div className="border border-danger w-100 d-flex flex-column gap-3 p-3 rounded shadow-sm">
      <div>
        <h1 className="display-6">Add</h1>
        <h2 className="d-flex justify-content-around py-3">
          <span className="badge bg-secondary">A = {a}</span>
          <span className="badge bg-primary">A+B = {a + b}</span>
          <span className="badge bg-secondary">B = {b}</span>
        </h2>
      </div>
      <div className="d-flex justify-content-around gap-3">
        <Variable type={"int"} name={"A"} value={a} setValue={setA} />
        <Variable type={"int"} name={"B"} value={b} setValue={setB} />
      </div>
    </div>
  );
}

export default Add;
