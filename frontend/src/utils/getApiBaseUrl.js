export const getApiBaseUrl = () => {
    const hostname = window.location.hostname;
    const apiUrl = hostname === "localhost" || hostname === "127.0.0.1"
        ? import.meta.env.VITE_API_BASE_URL_DESKTOP
        : import.meta.env.VITE_API_BASE_URL_MOBILE;
    console.log("POOPSIE VITE_API_BASE_URL_DESKTOP:", import.meta.env.VITE_API_BASE_URL_DESKTOP);
    console.log("POOPSIE VITE_API_BASE_URL_MOBILE:", import.meta.env.VITE_API_BASE_URL_MOBILE);
    console.log(`POOPSIE Determined API Base URL: ${apiUrl}`);
    return apiUrl;
};
// Inside the component
const API_BASE_URL = getApiBaseUrl();
console.log(`POOPSIE LOOK THERE Using API Base URL: ${API_BASE_URL}`);
/////////////////////
// export const getApiBaseUrl = () => {
//   const hostname = window.location.hostname;
//   const apiUrl =
//     hostname === "localhost" || hostname === "127.0.0.1"
//       ? import.meta.env.VITE_API_BASE_URL_DESKTOP
//       : import.meta.env.VITE_API_BASE_URL_MOBILE;
//   console.log(
//     "POOPSIE VITE_API_BASE_URL_DESKTOP:",
//     import.meta.env.VITE_API_BASE_URL_DESKTOP,
//   );
//   console.log(
//     "POOPSIE VITE_API_BASE_URL_MOBILE:",
//     import.meta.env.VITE_API_BASE_URL_MOBILE,
//   );
//   console.log(`POOPSIE Determined API Base URL: ${apiUrl}`);
//   return apiUrl;
// };
// // Inside the component
// const API_BASE_URL = getApiBaseUrl();
// console.log(`POOPSIE LOOK THERE Using API Base URL: ${API_BASE_URL}`);
///////
// export const getApiBaseUrl = () => {
//   const hostname = window.location.hostname;
//   if (hostname === "localhost" || hostname === "127.0.0.1") {
//     return import.meta.env.VITE_API_BASE_URL_DESKTOP;
//   } else {
//     return import.meta.env.VITE_API_BASE_URL_MOBILE;
//   }
// };
///////////
// export const getApiBaseUrl = () => {
//   const hostname = window.location.hostname;
//   if (hostname === "localhost" || hostname === "127.0.0.1") {
//     return import.meta.env.VITE_API_BASE_URL_DEV;
//   } else {
//     return import.meta.env.VITE_API_BASE_URL_PROD;
//   }
// };
/////////////////////////
// src/utils/getApiBaseUrl.ts
// export const getApiBaseUrl = () => {
//   if (import.meta.env.MODE === "development") {
//     return import.meta.env.VITE_API_BASE_URL_PROD;
//   } else {
//     return import.meta.env.VITE_API_BASE_URL_DEV;
//   }
// };
