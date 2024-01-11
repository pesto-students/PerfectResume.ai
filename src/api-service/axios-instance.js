import { default as axios } from "axios";
import {
  getAccessToken,
  // getRefreshToken,
  // setAccessToken,
  // setRefreshToken,
} from "src/utils/auth";
import { isArray } from "src/utils/utils";

const isProduction = import.meta.env.PROD;
const prod = import.meta.env.VITE_API;
const dev = import.meta.env.VITE_API_DEV;

const backend = isProduction ? prod : dev;

const instance = axios.create({
  baseURL: backend,
  withCredentials: true,
  timeout: 1000 * 10,
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

let logout = null;
export const setUnauthorizedHandler = (handler) => {
  logout = handler;
};

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log("interceptor: ", !!originalRequest._retry);
    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const response = await refreshToken();
        if (response.status === 401) {
          // This is not a good way to handle unauthorization.
          return logout();
        }
        const accessToken = getAccessToken();
        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return instance(originalRequest);
      } catch (error) {
        console.log(error);
        return Promise.reject({ status: 401, action: "logout" });
      }
    }
    return Promise.reject(error);
  },
);

const refreshToken = async () => {
  return { status: 401, action: "logout" };
  // try {
  //   const refreshToken = getRefreshToken();
  //   const response = await axios.post("/api/refresh-token", {
  //     refreshToken,
  //   });
  //   const { accessToken } = response.data;
  //   setAccessToken(accessToken);
  //   setRefreshToken("");
  //   return { status: 200 };
  // } catch (error) {
  //   return { status: 401, action: "logout" };
  // }
};

const resolveError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    const response = error.response;
    const message = response.data.message;
    return {
      status: false,
      msg: isArray(message) ? message[0] : message,
      data: response.data,
    };
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
    return {
      status: false,
      msg: error.message || "Something went wrong!",
      data: {},
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
    return {
      status: false,
      msg: error.message || "Something went wrong!",
      data: {},
    };
  }
};

const axiosService = {
  post: async ({ endpoint, payload, params, options }) => {
    if (params) {
      endpoint = `${endpoint}/${params}`;
    }
    return instance
      .post(endpoint, payload, { ...options })
      .then(function (response) {
        console.log("Response: ", response);
        return { status: true, data: response.data };
      })
      .catch(function (error) {
        return resolveError(error);
      });
  },

  multipart: async ({ endpoint, payload, options }) => {
    return instance
      .post(endpoint, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 1000 * 10,
        ...options,
      })
      .then(function (response) {
        console.log("Response: ", response);
        return { status: true, data: response.data };
      })
      .catch(function (error) {
        return resolveError(error);
      });
  },

  multipartPut: async ({ endpoint, payload, params, options }) => {
    if (params) {
      endpoint = `${endpoint}/${params}`;
    }
    return instance
      .put(endpoint, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 1000 * 10,
        ...options,
      })
      .then(function (response) {
        console.log("Response: ", response);
        return { status: true, data: response.data };
      })
      .catch(function (error) {
        return resolveError(error);
      });
  },

  put: async ({ endpoint, payload, params, options }) => {
    if (params) {
      endpoint = `${endpoint}/${params}`;
    }
    return instance
      .put(endpoint, payload, { ...options })
      .then(function (response) {
        return { status: true, data: response.data };
      })
      .catch(function (error) {
        return resolveError(error);
      });
  },

  get: async ({ endpoint, params, options }) => {
    if (params) {
      endpoint = `${endpoint}/${params}`;
    }
    return instance
      .get(endpoint, { ...options })
      .then(function (response) {
        return { status: true, data: response.data };
      })
      .catch(function (error) {
        return resolveError(error);
      });
  },

  getPDF: async ({ endpoint, payload, params, options }) => {
    if (params) {
      endpoint = `${endpoint}/${params}`;
    }
    if (!payload) payload = {};
    return instance
      .post(endpoint, payload, { responseType: "blob", ...options })
      .then(function (response) {
        return { status: true, data: response.data };
      })
      .catch(function (error) {
        return resolveError(error);
      });
  },
};

const getAxiosReqController = () => {
  return axios.CancelToken.source();
};

export { axiosService, refreshToken, getAxiosReqController };
