import React, { useEffect, useState } from "react";
import Task13Forecast from "./task13Forecast";

const API_KEY = "YOUR_API_KEY";

function Task13Weather({ city }) {

  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      .then((response) => response.json())
      .then((data) => {

        if (data.cod === "404") {
          setError("City not found");
          setWeather(null);
        } else {
          setWeather(data);
          setError("");
        }

      })
      .catch(() => {
        setError("Error fetching weather data");
      });

  }, [city]);

  return (
    <div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weatherBox">

          <h3>{weather.name}</h3>

          <p>Temperature: {weather.main.temp} °C</p>

          <p>Humidity: {weather.main.humidity}%</p>

          <p>Condition: {weather.weather[0].description}</p>

          <Task13Forecast city={city} />

        </div>
      )}

    </div>
  );
}

export default Task13Weather;