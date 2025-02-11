import axios, { AxiosInstance } from "axios";

let isRefreshing = false;
let refreshQueue: (() => void)[] = [];

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle unauthorized (401) responses
    if (error.response && error.response.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");
      console.log("🚀 ~ refreshToken:", refreshToken);

      // Only refresh once to prevent infinite loop if refresh token is expired
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          // Perform refresh token request
          const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}auth/refresh_token`,
            null, // Body is not needed
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          );

          console.log("🚀 ~ response:", response);

          const newAccessToken = response.data.accessToken;
          console.log("🚀 ~ newAccessToken:", newAccessToken);

          // Update access token in localStorage
          localStorage.setItem("accessToken", newAccessToken);

          // Retry the original request
          return api(originalRequest);
        } catch (refreshError) {
          // Handle refresh token request failure (e.g., refresh token expired)
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          // Redirect to login or handle as needed
          window.location.href = "/login";
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
          refreshQueue.forEach((cb) => cb());
          refreshQueue = [];
        }
      } else {
        // Queue the request until the token refreshes
        return new Promise((resolve, reject) => {
          refreshQueue.push(() => {
            api(originalRequest).then(resolve).catch(reject);
          });
        });
      }
    }

    return Promise.reject(error);
  }
);

export function useApi(): AxiosInstance {
  return api;
}
