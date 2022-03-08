import axios from "axios";

export const apiWeather = axios.create({
  baseURL: "https://community-open-weather-map.p.rapidapi.com/forecast",
});

apiWeather.defaults.headers.common["x-rapidapi-key"] =
  process.env.REACT_APP_RAPID_API;
apiWeather.defaults.headers.common["x-rapidapi-host"] =
  "community-open-weather-map.p.rapidapi.com";

export const getWeather = async (value) => {
  try {
    const { data } = await apiWeather.get(URL, {
      params: { q: value, cnt: "5", units: "metric" },
    });
    return data;
  } catch (error) {
    return error;
  }
};
