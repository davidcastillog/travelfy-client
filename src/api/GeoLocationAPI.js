import axios from "axios";

const ipGeo = process.env.REACT_APP_GEO_API;
const baseURL = "https://api.freegeoip.app/json/?apikey=";

export const geoLocationData = async () => {
  try {
    const res = await axios.get(baseURL + ipGeo);
    return res.data;
  } catch (error) {
    return error;
  }
};
