import React, { useEffect, useState } from "react";
import Variable from "../Variable/Variable";

export default function Temperature({ initCelsius }) {

  const [celsius, setCelsius] = useState(initCelsius);
  const [fahrenheit, setFahrenheit] = useState(0);
  const [kelvin, setKelvin] = useState(0);

  const celsiusToFahrenheit = (c) => (c * 9) / 5 + 32;
  const celsiusToKelvin = (c) => c + 273.15;
  const fahrenheitToCelsius = (f) => ((f - 32) * 5) / 9;
  const kelvinToCelsius = (k) => k - 273.15;

  useEffect(() => {
    setFahrenheit(celsiusToFahrenheit(celsius));
    setKelvin(celsiusToKelvin(celsius));
  }, [celsius]);

  const handleCelsiusChange = (value) => {
    setCelsius(value);
  };

  const handleFahrenheitChange = (value) => {
    const newCelsius = fahrenheitToCelsius(value);
    setCelsius(newCelsius);
  };

  const handleKelvinChange = (value) => {
    const newCelsius = kelvinToCelsius(value);
    setCelsius(newCelsius);
  };

  return (
    <div className="border border-success rounded d-flex flex-column gap-3 p-2 text-white">
      <h1 className="display-6">Temperature</h1>
      <h3 className="d-flex justify-content-around">
        <span className="badge bg-primary">{celsius.toFixed(2)}&nbsp;&deg;</span>
        <span className="badge bg-primary">{fahrenheit.toFixed(2)}&nbsp;&#8457;</span>
        <span className="badge bg-primary">{kelvin.toFixed(2)}&nbsp;&#8490;</span>
      </h3>
      <div className="d-flex gap-3">
        <Variable type="int" name="Celsius" value={celsius} setValue={handleCelsiusChange} />
        <Variable type="int" name="Fahrenheit" value={fahrenheit} setValue={handleFahrenheitChange} />
        <Variable type="int" name="Kelvin" value={kelvin} setValue={handleKelvinChange} />
      </div>
    </div>
  );
}
