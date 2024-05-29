// import {
//     getApiRequest,
//     postApiRequest,
//     putApiRequest,
//     deleteApiRequest,
//     patchApiRequest,
// } from "./base";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

// export const recentVisitsQuerySettings = {
//     cacheTime: 15 * 60 * 1000,
//     staleTime: 5 * 60 * 1000,
//     retry: 3,
// };

// export const recordVisitAPI = async (data) => {
//     const url = "/api/users/record-recent/";
//     const newData = {
//         item_id: data.itemID,
//         item_type: data.itemType,
//         url: data.itemURL,
//     };
//     return await postApiRequest(url, newData);
// };

// export const useRecordVisit = () => {
//     const queryClient = useQueryClient();
//     queryClient.setMutationDefaults(["add-visit"], {
//         mutationFn: (data) => {
//             console.log("---> recording visit");
//             return recordVisitAPI(data);
//         },
//         onSuccess: (data) => {
//             queryClient.invalidateQueries(["recent-visits"]);
//         },
//     });
//     return useMutation(["add-visit"]);
// };

// export const getRecentVisits = async () => {
//     const url = "/api/users/recent-items/";
//     return await getApiRequest(url);
// };
