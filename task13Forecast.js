import React, { useEffect, useState } from "react";

const API_KEY = "YOUR_API_KEY";

function Task13Forecast({ city }) {

  const [forecast, setForecast] = useState([]);

  useEffect(() => {

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`)
      .then(res => res.json())
      .then(data => {

        const daily = data.list.filter((item, index) => index % 8 === 0);
        setForecast(daily);

      });

  }, [city]);

  return (

    <div>

      <h4>5 Day Forecast</h4>

      <div className="forecast">

        {forecast.map((day, index) => (

          <div key={index} className="forecastBox">

            <p>{day.dt_txt.split(" ")[0]}</p>

            <p>{day.main.temp} °C</p>

            <p>{day.weather[0].main}</p>

          </div>

        ))}

      </div>

    </div>

  );
}

export default Task13Forecast;