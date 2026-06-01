import axios from "axios";
import Constants from "expo-constants";

const getBaseUrl = () => {
  const hostUri = Constants.expoConfig?.hostUri || "";
  const ip = hostUri.split(":")[0];
  if (ip) {
    return `http://${ip}:3000`;
  }
  return "http://localhost:3000";
};

const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
