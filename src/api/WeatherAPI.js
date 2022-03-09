import axios from "axios";

export const apiWeather = axios.create({
  baseURL: "https://community-open-weather-map.p.rapidapi.com/forecast/daily",
});

apiWeather.defaults.headers.common["x-rapidapi-key"] =
  process.env.REACT_APP_RAPID_API;
apiWeather.defaults.headers.common["x-rapidapi-host"] =
  "community-open-weather-map.p.rapidapi.com";

export const getWeather = async (lat, lng) => {
  try {
    const { data } = await apiWeather.get(URL, {
      params: { lat, lon: lng, cnt: "5", units: "metric" },
    });
    return data;
  } catch (error) {
    return error;
  }
};
