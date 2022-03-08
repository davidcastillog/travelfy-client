import axios from "axios";

const ipGeo = process.env.REACT_APP_IP_GEO;

export const ipAPI = axios.create({
  baseURL: "https://api.ipify.org?format=json",
});

export const userIP = async () => {
  try {
    const res = await ipAPI.get("https://api.ipify.org?format=json");
    const { ip } = res.data;
    return ip;
  } catch (error) {
    return error;
  }
}

export const showUserLocation = async (value) => {
  try {
    const res = await userIP.get(
      `https://api.freegeoip.app/json/${value}?apikey=` + ipGeo
    );
    return res;
  } catch (error) {
    return error;
  }
};
