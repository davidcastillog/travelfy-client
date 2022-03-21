import axios from "axios";

const ipGeo = process.env.REACT_APP_GEO_API;
const baseURL = "https://api.freegeoip.app/json/?apikey=";

export const geoLocationData = async () => {
  try {
    const { data } = await axios.get(baseURL + ipGeo);
    return data;
  } catch (error) {
    return error;
  }
};
