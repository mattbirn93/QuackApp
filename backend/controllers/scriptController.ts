import { Request, Response } from "express";
import mongoose from "mongoose";
import scripts from "../models/scriptModel.js";
import scenes from "../models/sceneModel.js";
import User from "../models/userModel.js";
import characters from "../models/characterModel.js"
// Controller method to create a new script and its associated scenes
export const createScript = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      title,
      title_page,
      users_id,
      sceneVersions_id_array,
    } = req.body;

    // Create a new script instance
    const newScript = new scripts({
      _id: new mongoose.Types.ObjectId(),
      title,
      title_page,
      time_stamp: new Date(),
      users_id,
    });

    // Save the new script to the database
    const savedScript = await newScript.save({ session });

    const newCharacters = new characters({
      _id: new mongoose.Types.ObjectId(),
      script_id: savedScript._id,
      time_stamp: new Date(),
      characters_array: [], // Initialize as empty
    });

    // Save the new characters document to the database
    const savedCharacters = await newCharacters.save({ session });

    // Update the script document to include the characters_id
    savedScript.characters_id = savedCharacters._id as mongoose.Types.ObjectId;
    await savedScript.save({ session });
    // Create a new scenes document
    const newScenes = new scenes({
      _id: new mongoose.Types.ObjectId(),
      time_stamp: new Date(),
      scripts_id: savedScript._id,
      sceneVersions_id_array,
    });

    // Save the new scenes to the database
    const savedScene = await newScenes.save({ session });

    // Update the script document with the scenes ID
    savedScript.scenes_id = savedScene._id as mongoose.Types.ObjectId;
    await savedScript.save({ session });

    const user = await User.findById(users_id).session(session);
    if (!user) {
      throw new Error("User not found");
    }
    user.scripts_id_array.push(savedScript._id as mongoose.Types.ObjectId);
    await user.save({ session });
    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    // Return the saved script and scenes
    return res.status(201).json({ script: savedScript, scene: savedScene });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error creating script and scenes:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const fetchScriptsById = async (req: Request, res: Response) => {
  try {
    const { ids } = req.query as { ids: string };
    // if (!ids || !Array.isArray(ids)) {
    //   return res.status(400).json({ message: 'Invalid ids parameter' });
    // }

    const idsArray = (typeof ids === "string" ? ids.split(",") : []).map((id) =>
      id.trim(),
    );

    // Convert string ids to ObjectIds
    const objectIds = idsArray.map((id) => {
      if (mongoose.Types.ObjectId.isValid(id)) {
        return new mongoose.Types.ObjectId(id);
      } else {
        throw new Error(`Invalid ObjectId: ${id}`);
      }
    });

    const fetchedScripts = await scripts
      .find({
        _id: { $in: objectIds },
      })
      .exec();

    if (!fetchedScripts.length) {
      return res
        .status(404)
        .json({ message: "No scripts found for the given IDs." });
    }

    return res.status(200).json(fetchedScripts);
  } catch (error) {
    console.error("Error fetching scripts by IDs:", error);
    return res.status(500).json("");
  }
};

export const fetchScripts = async (req: Request, res: Response) => {
  try {
    // Fetch scenes associated with the scriptId
    const fetchedScripts = await scripts.find().exec();

    // Debug information
    console.log("scenes:", fetchedScripts);

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
