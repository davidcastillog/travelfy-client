import axios from "axios";

const isProduction = process.env.NODE_ENV === "production";

// Si la app esta ya en produccion colocar la ruta del backend hosteado
const baseURL = isProduction
  ? "http://travelfy1.herokuapp.com/api"
  : "http://localhost:5005/api";

export const apiServer = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 7500,
});
