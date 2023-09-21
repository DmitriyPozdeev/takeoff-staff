import axios, { 
  AxiosError, AxiosInstance,  AxiosResponse, InternalAxiosRequestConfig 
} from "axios";
import rootStore from "../stores/rootStore";

export const host: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-type": "application/json"
  }
})
export const authHost: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-type": "application/json"
  }
})
const authInterceptor = (config: InternalAxiosRequestConfig) => {
  config.headers.authorization =`Bearer ${localStorage.getItem('accessToken')}`;
  return config
};

const onErrorResponse = (error: AxiosError | Error): Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    const { status } = error.response as AxiosResponse ?? {};
    if (status === 401) {
      rootStore.userStore.setUser(undefined)
      localStorage.removeItem("accessToken");
    }
  }
  return Promise.reject(error);
};

authHost.interceptors.request.use(authInterceptor, onErrorResponse);
authHost.interceptors.response.use((r)=>r, onErrorResponse);