// import {
//     getApiRequest,
//     postApiRequest,
//     putApiRequest,
//     deleteApiRequest,
//     patchApiRequest,
// } from "./base";

// export const userQuerySettings = {
//     cacheTime: 30 * 60 * 1000,
//     staleTime: 15 * 60 * 1000,
//     retry: 0,
// };

// export const getMe = async () => {
//     const url = "/api/users/me/";
//     return await getApiRequest(url);
// };

// export const loginUser = async (data) => {
//     const url = "/api/users/auth/";
//     return await postApiRequest(url, data);
// };

// export const logoutUser = async () => {
//     const url = "/api/users/logout/";
//     return await postApiRequest(url, {});
// };

// export const passwordReset = async (data) => {
//     const url = "/api/users/password/reset/";
//     return await postApiRequest(url, data);
// };

// export const passwordResetConfirm = async (data) => {
//     const url = "/api/users/password/reset/confirm/";
//     return await postApiRequest(url, data);
// };

// export const register = async (data) => {
//     const url = "/api/users/register/";
//     return await postApiRequest(url, data);
// };
