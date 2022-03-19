import "./Weather.css";
import { useState, useEffect } from "react";
import { getWeather } from "../../api/WeatherAPI";
import { SearchBox, WeatherCard, WeatherCardIntro } from "../../components";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const Weather = ({ user, ...props }) => {
  const [coordinates, setCoordinates] = useState({});
  const [weather, setWeather] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getWeather(coordinates.lat, coordinates.lng)
      .then((data) => {
        setWeather(data.daily);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(true);
        setIsLoading(false);
      });
  }, [coordinates]); // Get new weather forecast when coordinates change

  return (
    <>
      <Container
        maxWidth="lg"
        className="search-weather-container"
        sx={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Box sx={{ display: "grid", width: 700, alignSelf:"center" }}>
          <SearchBox setCoordinates={setCoordinates} />
        </Box>
        <Box
          sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", mt: 1 }}
          className="weather-card-box"
        >
          {!isLoading && weather ? (
            <>
              {weather.slice(0, 7).map((day, i) => (
                <WeatherCard key={i} day={day} />
              ))}
            </>
          ) : (
            <>
              <WeatherCardIntro />
            </>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Weather;
