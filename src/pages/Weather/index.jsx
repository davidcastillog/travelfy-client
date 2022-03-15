import "./Weather.css";
import { useState, useEffect } from "react";
import SearchBox from "../../components/SearchBox";
import Container from "@mui/material/Container";

const Weather = (props) => {
  const [coordinates, setCoordinates] = useState({});
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(false);

  return (
    <>
      <Container maxWidth="lg" className="weather-container">
        <SearchBox setCoordinates={setCoordinates} />
      </Container>
    </>
  );
};

export default Weather;
