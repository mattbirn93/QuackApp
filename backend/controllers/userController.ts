// The controller handles incoming HTTP requests, interacts with the service layer, and sends appropriate HTTP responses.

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
    res.status(400).json({ message: error.message });
  }
};

export const fetchUserById = async (req: Request, res: Response) => {
  const { id } = req.query;
  if (!id || typeof id !== "string") {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  console.log("Received ID:", id); // Confirm that ID is received correctly
  try {
    const user = await UserService.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
