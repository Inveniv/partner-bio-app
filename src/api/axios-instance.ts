import { REACT_APP_API_URL, MEDUSA_API_KEY } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onlineManager } from "@tanstack/react-query";
import Axios, { AxiosError, type AxiosRequestConfig } from "axios";
import RNRestart from "react-native-restart"; // Import package from node modules
import { showSnackbar } from "stores/global-store/snackbar-store/SnackbarStore";

const IS_LOCAL = __DEV__ && false;
export const axiosInstanceBase = Axios.create({
  baseURL: `${IS_LOCAL ? "http://192.168.1.66:8180" : REACT_APP_API_URL}`,
});

axiosInstanceBase.interceptors.request.use(
  async (config) => {
    // Set token
    const token = await AsyncStorage.getItem("JWToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers["x-publishable-api-key"] = MEDUSA_API_KEY;

    // Check is online
    if (!onlineManager.isOnline()) {
      return Promise.reject(
        new AxiosError(
          "Offline Mode",
          "ERR_CANCELED",
          undefined,
          undefined,
          undefined,
        ),
      );
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

axiosInstanceBase.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (["ERR_CANCELED", "ERR_NETWORK"].includes(error.code!)) {
      return;
    }

    //@ts-expect-error
    let message = error?.response?.data?.message || error.message;

    switch (error.response?.status) {
      case 401:
        message = "Unauthorized";
        break;
      case 403:
        message = "Forbidden";
        AsyncStorage.removeItem("JWToken");
        RNRestart.Restart();
        break;
      case 500:
        message = "Internal Server Error";
        break;
      case 502:
        message = "Server Offline";
        break;
      case 503:
        message = "Service Unavailable";
        break;
      default:
        break;
    }

    showSnackbar({
      type: "error",
      title: message,
    });

    if (__DEV__) {
      console.log("--- REQ FAILED ---");
      console.log(`[REQ] ${error.config?.url}`);
      console.log(`[STATUS] ${error.response?.status}`);
      console.log(`[CODE] ${error.code}`);
      console.log(`[MESSAGE] ${error.message}`);
      console.log(`[ERROR] ${JSON.stringify(error.response?.data, null, 2)}`);
      console.log("--- REQ FAILED ---");
    }

    return Promise.reject(error.message);
  },
);

export const axiosInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = axiosInstanceBase({
    ...config,
    cancelToken: source.token,
  }).then((res) => res?.data);

  // @ts-ignore
  promise.cancel = () => {
    source.cancel("Query was cancelled by React Query");
  };

  return promise;
};

export default axiosInstanceBase;
