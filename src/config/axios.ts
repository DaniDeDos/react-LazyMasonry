import axios from "axios";

const clienteAxios = axios.create({
  baseURL: import.meta.env.VITE_SERVER_DOMAIN,
});

export default clienteAxios;
