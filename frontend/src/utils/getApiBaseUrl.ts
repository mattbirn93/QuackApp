export const getApiBaseUrl = () => {
  if (process.env.NODE_ENV === "production") {
    return import.meta.env.VITE_API_BASE_URL_PROD;
  } else {
    return import.meta.env.VITE_API_BASE_URL_DEV;
  }
};

//////////////////

// export const getApiBaseUrl = () => {
//   const hostname = window.location.hostname;
//   if (hostname === "localhost" || hostname === "127.0.0.1") {
//     return import.meta.env.VITE_API_BASE_URL_DESKTOP;
//   } else {
//     return import.meta.env.VITE_API_BASE_URL_MOBILE;
//   }
// };
