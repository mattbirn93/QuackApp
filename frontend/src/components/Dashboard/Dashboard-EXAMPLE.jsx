// import React, { useEffect, useState } from "react";
// import { Header } from "@/components/Header";
// import { useUser } from "@/components/Auth";
// import { useQuery } from "@tanstack/react-query";
// import { getRecentVisits, recentVisitsQuerySettings } from "@/queries/visit";
// import {
//   ExclamationCircleIcon,
//   CalendarDaysIcon,
//   HomeModernIcon,
//   MusicalNoteIcon,
//   QuestionMarkCircleIcon,
//   UserIcon,
// } from "@heroicons/react/24/outline";
// import { useNavigate } from "react-router-dom";

// const Icon = (props) => {
//   const { item } = props;
//   let iconClasses = "h-6 w-6 text-gray-900";
//   switch (item.item_type) {
//     case "venue":
//       return <HomeModernIcon className={iconClasses} aria-hidden="true" />;
//       break;
//     case "event":
//       return <CalendarDaysIcon className={iconClasses} aria-hidden="true" />;
//       break;
//     case "artist":
//       return <MusicalNoteIcon className={iconClasses} aria-hidden="true" />;
//       break;
//     case "person":
//       return <UserIcon className={iconClasses} aria-hidden="true" />;
//       break;
//     default:
//       return (
//         <QuestionMarkCircleIcon className={iconClasses} aria-hidden="true" />
//       );
//       break;
//   }
// };

// const VisitRow = (props) => {
//   const { item } = props;
//   const navigate = useNavigate();

//   return (
//     <div
//       onClick={() => {
//         navigate(item.url);
//       }}
//       className="flex w-full my-2 rounded border border-1 border-gray-200 p-4 items-center hover:bg-gray-200"
//     >
//       <div className="flex-shrink mr-4 rounded border border-1 border-gray-300 bg-gray-300 p-6">
//         <Icon item={item} />
//       </div>
//       <span>
//         {item.title}
//         <br />
//         {item.subtitle}
//       </span>
//     </div>
//   );
// };

// export const Dashboard = () => {
//   const { user } = useUser();
//   const recent_visits = useQuery(
//     ["recent-visits"],
//     () => getRecentVisits(),
//     recentVisitsQuerySettings,
//   );

//   return (
//     <>
//       <Header />
//       <div
//         className="
//         flex flex-col px-6 py-8 mx-auto md:h-screen lg:py-0
//     "
//       >
//         <div className="my-6">
//           <h1 className="text-3xl font-bold text-gray-700 w-full border-b-2 py-2">
//             Dashboard
//           </h1>
//         </div>
//         <div className="my-6">
//           <h2 className="text-3xl font-bold text-gray-700 w-full py-2">
//             Recently Visited Pages
//           </h2>
//           {recent_visits.isSuccess &&
//             recent_visits.data.map((item, index) => (
//               <VisitRow key={index} item={item} />
//             ))}
//         </div>
//       </div>
//     </>
//   );
// };
