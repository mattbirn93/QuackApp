import { Request, Response } from "express";
import UserService from "../services/userService.js";

export const createUser = async (req: Request, res: Response) => {
  const { first_name, last_name, email, scripts_id_array } = req.body;

  try {
    const savedUser = await UserService.createUser({
      first_name,
      last_name,
      email,
      scripts_id_array,
    });
    res.status(201).json(savedUser);
  } catch (error: any) {
    console.error("CHECK ME Error creating user:", error.message);
    res.status(400).json({ message: error.message });
  }
};

export const fetchUserById = async (req: Request, res: Response) => {
  const { id } = req.query;
  if (typeof id !== "string") {
    return res.status(400).json({ message: "CHECK ME Invalid user ID" });
  }
  console.log("CHECK ME Attempting to fetch user with ID:", id); // Confirm receipt and handling of ID
  try {
    const user = await UserService.getUserById(id);
    if (!user) {
      console.error("CHECK ME User not found with ID:", id);
      return res.status(404).json({ message: "CHECK ME User not found" });
    }
    console.log("CHECK ME User fetched successfully:", user); // Log user object
    res.setHeader("Content-Type", "application/json");
    res.json(user);
  } catch (error: any) {
    console.error("CHECK ME Error fetching user:", error.message); // Log error
    res.status(500).json({ message: error.message });
  }
};

/////////////////////

// import { Request, Response } from "express";
// import UserService from "../services/userService.js";

// export const createUser = async (req: Request, res: Response) => {
//   const { first_name, last_name, email, scripts_id_array } = req.body;

//   try {
//     const savedUser = await UserService.createUser({
//       first_name,
//       last_name,
//       email,
//       scripts_id_array,
//     });
//     res.status(201).json(savedUser);
//   } catch (error: any) {
//     res.status(400).json({ message: error.message });
//   }
// };

// export const fetchUserById = async (req: Request, res: Response) => {
//   const { id } = req.query;
//   if (typeof id !== "string") {
//     return res.status(400).json({ message: "Invalid user ID" });
//   }
//   console.log("Attempting to fetch user with ID:", id); // Confirm receipt and handling of ID
//   try {
//     const user = await UserService.getUserById(id);
//     console.log("User fetched successfully:", user); // Log user object
//     res.json(user);
//   } catch (error: any) {
//     console.log("Error fetching user:", error.message); // Log error
//     res.status(500).json({ message: error.message });
//   }
// };

/////////////////////////////////

// import { Request, Response } from "express";
// import UserService from "../services/userService.js";

// export const createUser = async (req: Request, res: Response) => {
//   const { first_name, last_name, email, scripts_id_array } = req.body;

//   try {
//     const savedUser = await UserService.createUser({
//       first_name,
//       last_name,
//       email,
//       scripts_id_array,
//     });
//     res.status(201).json(savedUser);
//   } catch (error: any) {
//     res.status(400).json({ message: error.message });
//   }
// };

// export const fetchUserById = async (req: Request, res: Response) => {
//   const { id } = req.query;
//   if (typeof id !== "string") {
//     return res.status(400).json({ message: "Invalid user ID" });
//   }
//   console.log("Attempting to fetch user with ID:", id); // Confirm receipt and handling of ID
//   try {
//     const user = await UserService.getUserById(id);
//     console.log("User fetched successfully:", user); // Log user object
//     res.json(user);
//   } catch (error: any) {
//     console.log("Error fetching user:", error.message); // Log error
//     res.status(500).json({ message: error.message });
//   }
// };
