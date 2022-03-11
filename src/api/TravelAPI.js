import axios from "axios";

export const apiTravel = axios.create({
  baseURL: "https://travel-advisor.p.rapidapi.com",
});

apiTravel.defaults.headers.common["x-rapidapi-key"] =
  process.env.REACT_APP_RAPID_API;
apiTravel.defaults.headers.common["x-rapidapi-host"] =
  "travel-advisor.p.rapidapi.com";

export const getPlaces = async (type, sw, ne) => {
  try {
    const {
      data: { data },
    } = await apiTravel.get(`/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
        tr_latitude: ne.lat,
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};
