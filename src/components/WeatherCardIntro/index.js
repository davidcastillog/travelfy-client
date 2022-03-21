import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function WeatherCardIntro() {
  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardHeader title="Weather Forecast" />
      <CardMedia
        component="img"
        height="130"
        image="https://res.cloudinary.com/davidcastillog/image/upload/v1647463483/travelfy/7DayForecast_xuridd.jpg"
        alt="7 days forecast"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Find the weather forecast for
          <br />
          any city around the world.
          <br />
          Just write the name!
        </Typography>
      </CardContent>
    </Card>
  );
}
