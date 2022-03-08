import axios from "axios";

export const apiTravel = axios.create({
  baseURL: "https://travel-advisor.p.rapidapi.com",
});

apiTravel.defaults.headers.common["x-rapidapi-key"] =
  process.env.REACT_APP_RAPID_API;
apiTravel.defaults.headers.common["x-rapidapi-host"] =
  "travel-advisor.p.rapidapi.com";

export const searchPlace = async (value) => {
  try {
    const { data } = await apiTravel.get(
      `/locations/v2/auto-complete?query=${value}`
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const searchAttractions = async (value) => {
  try {
    const { data } = await apiTravel.get(
      `/attractions/list?location_id=${value}`
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const searchRestaurants = async (value) => {
    try {
      const { data } = await apiTravel.get(
        `/restaurants/list?location_id=${value}`
      );
      return data;
    } catch (error) {
      return error;
    }
  };

  export const searchHotels = async (value) => {
    try {
      const { data } = await apiTravel.get(
        `/hotels/list?location_id=${value}`
      );
      return data;
    } catch (error) {
      return error;
    }
  };