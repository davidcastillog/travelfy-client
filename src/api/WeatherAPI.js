import axios from "axios";

const openWeatherAPI = process.env.REACT_APP_OPEN_WEATHER_API;
const baseURL = "https://api.openweathermap.org/data/2.5/onecall?";

export const getWeather = async (lat, lng) => {
  try {
    const { data } = await axios.get(baseURL, {
      params: {
        lat,
        lon: lng,
        exclude: "current,hourly,minutely,alerts",
        units: "metric",
        appid: openWeatherAPI,
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};
