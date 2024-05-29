// import React, { useRef, useEffect } from "react";

// import { useFormContext } from "react-hook-form";

// export const ModalSearchBar = (props) => {
//   const { isOpen, setSearch } = props;
//   const {
//     register,
//     setValue,
//     setFocus,
//     formState: { errors },
//   } = useFormContext();

//   useEffect(() => {
//     if (isOpen) {
//       setFocus("search");
//     }
//   }, [isOpen]);

//   return (
//     <>
//       <label htmlFor="modal-search" className="sr-only">
//         Search
//       </label>
//       <div className="relative mt-1 m-2">
//         <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
//           <svg
//             className="w-5 h-5 text-gray-500 dark:text-gray-400"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               fillRule="evenodd"
//               d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
//               clipRule="evenodd"
//             ></path>
//           </svg>
//         </div>
//         <input
//           type="text"
//           name="search"
//           id="topbar-search"
//           className="mt-2 p-4 bg-gray-100 text-gray-900 sm:text-sm rounded-lg w-full pl-10 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white focus:ring-0"
//           placeholder="Search"
//           autoComplete="off"
//           autoCorrect="off"
//           autoCapitalize="off"
//           {...register("search")}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>
//     </>
//   );
// };
