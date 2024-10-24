const defaultText = "Variable";

function Variable({ type, name, value, setValue }) {
  return (
    <div className="text-white d-flex flex-column w-100 rounded p-3 shadow-sm">
      <h3 className="display-6">{name || defaultText}</h3>
      <div className="d-flex justify-content-around align-items-center">
        <button onClick={() => setValue(value - 1)} className="btn btn-primary">
          -
        </button>
        <span className="text-white display-6 py-2">
          {type && type === "int" ? Math.floor(value) : value.toFixed(2)}
        </span>
        <button onClick={() => setValue(value + 1)} className="btn btn-danger">
          +
        </button>
      </div>
    </div>
  );
}

export default Variable;
