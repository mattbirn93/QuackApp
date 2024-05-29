// import React, { useEffect, useState } from "react";
// import { Header } from "@/components/Header";
// import { Datepicker, FormBuilder } from "@/components/Form";
// import { Alert } from "@/components/Alert";
// import * as yup from "yup";

// export const MiscUI = () => {
//   const loginSchema = yup.object().shape({
//     date: yup.date().required(),
//   });

//   return (
//     <>
//       <Header />
//       <div
//         className="
//         flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0
//     "
//       >
//         <FormBuilder onSubmit={() => {}} schema={loginSchema}>
//           <Datepicker
//             name="date"
//             label="Select Date"
//             placeholder="Select a date"
//           />
//         </FormBuilder>

//         <Alert title="ERROR!" message="Whoops, you broke something" />
//       </div>
//     </>
//   );
// };
