import axios from "axios";

const axiosAPI = axios.create({
  //   baseURL: `${process.env.APP_DOMAIN}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export { axiosAPI };
