import { Request, Response } from "express";
import mongoose from "mongoose";
import scriptsFull from "../models/scriptsFullModel.js";
import scenes from "../models/sceneModel.js";
import User from "../models/userModel.js";

export const fetchScriptsFull = async (req: Request, res: Response) => {
  try {
    // Fetch scenes associated with the scriptId
    const fetchedScripts = await scriptsFull.find().exec();

    // Debug information

    // If no scenes found, return a 404 response
    if (!fetchedScripts) {
      return res
        .status(404)
        .json({ message: "No scenes found for the given script ID." });
    }

    // Return the fetched scenes
    return res.status(200).json(fetchedScripts);
  } catch (error) {
    console.error("Error fetching scenes:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
