// import { Navigate, Outlet } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { getMe, userQuerySettings } from "@/queries/auth";

// export const ProtectedLayout = () => {
//   const user = useQuery(["me"], getMe, userQuerySettings);

//   if (user.isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (user.isError) {
//     console.log("Authentication error", user.error);
//     return <Navigate to="/login" />;
//   }

//   return (
//     <>
//       <Outlet context={{ user }} />
//     </>
//   );
// };
