// import {
//     getApiRequest,
//     postApiRequest,
//     putApiRequest,
//     deleteApiRequest,
//     patchApiRequest,
// } from './base'

// export const getLinkSettings = {
//     cacheTime: 30 * 60 * 1000,
//     staleTime: 15 * 60 * 1000,
// };

// export const getLinks = async () => {
//     const url = `/api/links/`
//     return await getApiRequest(url)
// };

// export const getLink = async (id) => {
//     const url = `/api/links/${id}/`
//     return await getApiRequest(url)
// };

// export const updateLink = async (id, data) => {
//     const url = `/api/links/${id}/`
//     return await putApiRequest(url, data)
// };

// export const createLink = async (data) => {
//     const url = `/api/links/`
//     return await postApiRequest(url, data)
// };

// export const getLinkCode = async (code) => {
//     const url = `/api/links/code/${code}/`
//     return await getApiRequest(url)
// };
