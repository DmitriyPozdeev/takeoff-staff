import axios from "axios";

export const host = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-type": "application/json"
  }
})
export const authHost = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-type": "application/json"
  }
})
const authInterceptor = (config: any) => {
  config.headers.authorization =`Bearer ${localStorage.getItem('accessToken')}`;
  return config
};

authHost.interceptors.request.use(authInterceptor)

