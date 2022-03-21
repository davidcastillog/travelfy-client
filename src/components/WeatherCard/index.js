import "./WeatherCard.css";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import ThermostatOutlinedIcon from "@mui/icons-material/ThermostatOutlined";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import WaterIcon from "@mui/icons-material/Water";

const WeatherCard = ({ day, i }) => {
  const [dateOfDay, setDateOfDay] = useState(day.date);

  const formatDate = () => {
    const date = new Date(day.dt * 1000);
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
    const month = date.toLocaleDateString("en-US", { month: "long" });
    const dayOfMonth = date.getDate();
    const year = date.getFullYear();
    const dateFormatted = `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
    setDateOfDay(dateFormatted);
  };

  useEffect(() => {
    formatDate();
  }, []);

  return (
    <>
      <Card sx={{ width: 215, maxWidth: 215, maxHeight: 315, m: 0.5, my:1 }} elevation={3}>
        <CardContent>
          <Typography gutterBottom variant="subtitle2" component="div">
            {dateOfDay}
          </Typography>
          <Box
            sx={{
              width: 60,
              justifyContent: "center",
              ml: 7,
            }}
            className="weather-icon-box"
          >
            <CardMedia
              component="img"
              height="60"
              image={`https://openweathermap.org/img/w/${day.weather[0].icon}.png`}
              alt="green iguana"
            />
          </Box>
          <Divider>
            <Typography variant="caption" gutterBottom>
              {day.weather.map((weather) => (
                <Chip label={weather.description} />
              ))}
            </Typography>
          </Divider>
          <Box
            sx={{
              width: 170,
              my: 1,
            }}
          >
            <Typography variant="subtitle2">
              <ThermostatOutlinedIcon fontSize="small" color="disabled" /> Temp.
              <Typography variant="caption"> {day.temp.day}ºC</Typography>
            </Typography>
            <Typography variant="subtitle2">
              <WaterIcon fontSize="small" color="disabled" /> Feels Like:
              <Typography variant="caption"> {day.feels_like.day}ºC</Typography>
            </Typography>
            <Typography variant="subtitle2">
              <WbSunnyIcon fontSize="small" color="disabled" /> Max Temp:
              <Typography variant="caption"> {day.temp.max}ºC</Typography>
            </Typography>
            <Typography variant="subtitle2">
              <ModeNightIcon fontSize="small" color="disabled" /> Night Temp.:
              <Typography variant="caption"> {day.temp.night}ºC</Typography>
            </Typography>
          </Box>
          <Chip
            color="primary"
            size="small"
            label={`Humidity: ${day.humidity}%`}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default WeatherCard;
