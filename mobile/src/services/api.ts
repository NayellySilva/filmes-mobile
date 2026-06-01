import axios from "axios";
import Constants from "expo-constants";

// Detecta dinamicamente o endereço IP da máquina host para conexão com o JSON Server no emulador ou celular físico
const getBaseUrl = () => {
  const hostUri = Constants.expoConfig?.hostUri || "";
  const ip = hostUri.split(":")[0];
  if (ip) {
    return `http://${ip}:3000`; // IP local na porta 3000
  }
  return "http://localhost:3000"; // Fallback padrão para web ou simulador
};

// Configura a instância do Axios com a URL base e cabeçalho padrão
const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
