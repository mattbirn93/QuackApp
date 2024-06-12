import { Request, Response } from "express";
import mongoose from "mongoose";
import scriptsFull from "../models/scriptsFullModel.js";
import scenes from "../models/sceneModel.js";
import User from "../models/userModel.js";


export const fetchScriptsFull = async (req: Request, res: Response) => {
  const { scriptId } = req.query as any;

  if (!mongoose.Types.ObjectId.isValid(scriptId)) {
    return res.status(400).json({ message: "Invalid script ID" });
  }

  try {
    // Fetch the script by ID
    const fetchedScript = await scriptsFull.findById(scriptId).exec();

    // If no script found, return a 404 response
    if (!fetchedScript) {
      return res.status(404).json({ message: "Script not found" });
    }

    // Return the fetched script
    return res.status(200).json(fetchedScript);
  } catch (error) {
    console.error("Error fetching script:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateScriptContent = async (req: Request, res: Response) => {
  const { scriptId } = req.query as any; // Change from req.params to req.query
  const { newContent } = req.body;
console.log(newContent)
  if (!mongoose.Types.ObjectId.isValid(scriptId)) {
    return res.status(400).json({ message: "Invalid script ID" });
  }

  try {
    // Find the script by ID and update the content
    const updatedScript = await scriptsFull.findByIdAndUpdate(
      scriptId,
      { content: newContent },
      { new: true }
    );

    // If no script found, return a 404 response
    if (!updatedScript) {
      return res.status(404).json({ message: "Script not found" });
    }

    // Return the updated script
    return res.status(200).json(updatedScript);
  } catch (error) {
    console.error("Error updating script content:", error);
    return res.status(500).json({ message: "Server error" });
  }
};