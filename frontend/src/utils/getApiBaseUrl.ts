// src/utils/getApiBaseUrl.ts
export const getApiBaseUrl = () => {
  if (import.meta.env.MODE === "development") {
    return import.meta.env.VITE_API_BASE_URL_PROD;
  } else {
    return import.meta.env.VITE_API_BASE_URL_DEV;
  }
};

//////////////////

// export const getApiBaseUrl = () => {
//   const hostname = window.location.hostname;
//   if (hostname === "localhost" || hostname === "127.0.0.1") {
//     return import.meta.env.VITE_API_BASE_URL_DEV;
//   } else {
//     return import.meta.env.VITE_API_BASE_URL_PROD;
//   }
// };
