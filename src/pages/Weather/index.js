import "./Weather.css";
import { useEffect, useState } from "react";
import { getWeather } from "../../api/WeatherAPI";

function Weather() {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    getWeather()
      .then((data) => {
        console.log(data);
        setWeather(data);
      })
      .catch((error) => {
        console.log(error);
      }, []);
  }, []);

  return (
    <div>
      <h1>Weather</h1>
    </div>
  );
}

export default Weather;
