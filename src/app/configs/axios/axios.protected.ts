import axios, { AxiosError, AxiosRequestHeaders, InternalAxiosRequestConfig } from "axios";
import { refreshToken } from "../common";


// base axios
const axiosProtected = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
});

interface CustomAxiosConfig extends InternalAxiosRequestConfig {
    sent?: boolean;
}

// before send req
// we will get accessToken from localhost and bind it into header;
axiosProtected.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const accessToken = JSON.parse(String(localStorage.getItem("accessToken")));
        if (accessToken) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${accessToken}`,
            } as AxiosRequestHeaders;
        }

        return config;
    },

    (err) => {
        return Promise.reject(err);
    }
);


// handle refresh-token if the token invalid

axiosProtected.interceptors.response.use(
    (response) => {
        return response.data;
    },
    async (err: AxiosError) => {
        // get config in error request to check the request has been re-sent?;
        const config = err.config as CustomAxiosConfig;
        console.log("config :", config);

        // if this error request is authentication and has not been re-sent => access token has expired, call api to get new token pair;
        if (err.response?.status === 401 && !config.sent) {
            config.sent = true;
            const { accessToken } = await refreshToken();
            if (accessToken) {
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${accessToken}`,
                } as AxiosRequestHeaders;
            }

            // re-send error api
            return await axiosProtected(config);
        }
        return Promise.reject(err);
    }
);

// export protected axios

export  {axiosProtected}