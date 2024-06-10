import { Request, Response } from "express";
import mongoose from "mongoose";
import AltScript from "../models/alternateSceneVersionModel"; // Adjust the import path according to your project structure

// Controller method to fetch scenes by scriptId
export const fetchScenes = async (req: Request, res: Response) => {
  const scriptId = req.query.scriptId as string;

  try {
    // Validate scriptId
    if (!scriptId || !mongoose.Types.ObjectId.isValid(scriptId)) {
      return res.status(400).json({ message: "Invalid script ID" });
    }

    // Debug information
    console.log("scriptId:", scriptId);

    // Fetch scenes associated with the scriptId
    const scenes = await AltScript.find({ script_id: scriptId }).exec();

    // Debug information
    console.log("scenes:", scenes);

    // If no scenes found, return a 404 response
    if (!scenes) {
      return res
        .status(404)
        .json({ message: "No scenes found for the given script ID." });
    }

    // Return the fetched scenes
    return res.status(200).json(scenes);
  } catch (error) {
    console.error("Error fetching scenes:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const fetchAllScenes = async (req: Request, res: Response) => {
  try {
    // Fetch all scenes from the collection
    const scenes = await AltScript.find().exec();

    // If no scenes found, return a 404 response
    if (!scenes || scenes.length === 0) {
      return res
        .status(404)
        .json({ message: "No scenes found in the collection." });
    }

    // Return the fetched scenes
    return res.status(200).json(scenes);
  } catch (error) {
    console.error("Error fetching scenes:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
