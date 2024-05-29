import React from "react";

const Button = () => {
  return (
    <>
      <p>HELLO FROM THE BUTTON</p>
      <button className="inline-flex items-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"></button>
    </>
  );
};

export default Button;

////////////////////////////

// import React from "react";

// const Button = (props: { children: React.ReactNode; [key: string]: any }) => {
//   return (
//     <>
//       <p>HELLO FROM THE BUTTON</p>
//       <button
//         className="inline-flex items-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
//         {...props}
//       >
//         {props.children}
//       </button>
//     </>
//   );
// };

// export default Button;
