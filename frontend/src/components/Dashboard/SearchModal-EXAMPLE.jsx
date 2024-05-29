// /*
//   Old original search modal.  Leaving it in here just in case we want to go
//   back to it.  You're probably looking for `components/Search/SearchModal`
// */
// import React, { useState, useEffect } from "react";
// import { Modal } from "@/components/Modal";
// import { ModalSearchBar } from "./ModalSearchBar-EXAMPLE";
// import {
//   CalendarDaysIcon,
//   HomeModernIcon,
//   MusicalNoteIcon,
// } from "@heroicons/react/24/outline";
// import { FormProvider, useForm } from "react-hook-form";

// const Results = (props) => {
//   const { results } = props;
//   // Handle no results found
//   if (!results || results.hits.length === 0) {
//     return (
//       <p className="text-base leading-relaxed text-gray-500 dark:text-gray-200">
//         No Results
//       </p>
//     );
//   }

//   return (
//     <>
//       {results.hits.map((result, index) => {
//         return (
//           <p className="text-base leading-relaxed text-gray-500 dark:text-gray-200">
//             <CalendarDaysIcon
//               className="h-6 w-6 inline mr-2"
//               aria-hidden="true"
//             />
//             {result.title}
//             <br />
//             <span className="ml-4 text-gray-400">{result.type}</span>
//           </p>
//         );
//       })}
//     </>
//   );
// };

// export const SearchModal = ({ isOpen, onClose }) => {
//   const [search, setSearch] = useState("");
//   const [results, setResults] = useState(null);
//   const form = useForm();

//   useEffect(() => {
//     if (!search) {
//       return;
//     }
//     const url = new URL(`${window.location.origin}/api/search/`);
//     url.searchParams.append("q", search);
//     fetch(url)
//       .then((response) => response.json())
//       .then((data) => setResults(data));
//   }, [search]);

//   const handleSetSearch = (value) => {
//     setSearch(value);
//   };

//   // Clear the search box when the modal is closed
//   useEffect(() => {
//     if (!isOpen) {
//       form.setValue("search", "");
//     }
//   }, [isOpen]);

//   console.log("Results");
//   console.dir(results);
//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <FormProvider {...form}>
//         <form
//           onSubmit={form.handleSubmit(handleSetSearch)}
//           className={
//             "--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)"
//           }
//         >
//           <ModalSearchBar isOpen={isOpen} setSearch={handleSetSearch} />
//         </form>
//       </FormProvider>
//       <div className="p-6 space-y-6">
//         <Results results={results} />
//       </div>
//     </Modal>
//   );
// };
