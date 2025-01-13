import axios from "axios";

const axiosPublic = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

axios.interceptors.response.use(response => response.data, err => {
    console.log("error :", err);
    return Promise.reject(err);
})

export { axiosPublic };