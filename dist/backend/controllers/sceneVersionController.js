import mongoose from "mongoose";
import sceneVersions from "../models/sceneVersionModel.js"; // Adjust the import path according to your project structure
import sceneVersionContent from "../models/sceneVersionContentModel.js";
import scenes from "../models/sceneModel.js";
// Controller method to fetch scenes by scriptId
export const fetchSceneVersions = async (req, res) => {
    try {
        // Fetch scenes associated with the scriptId
        const fetchedSceneVersions = await sceneVersions.find().exec();
        // Debug information
        console.log("scenes:", fetchedSceneVersions);
        // If no scenes found, return a 404 response
        if (!fetchedSceneVersions) {
            return res
                .status(404)
                .json({ message: "No scenes found for the given script ID." });
        }
        // Return the fetched scenes
        return res.status(200).json(fetchedSceneVersions);
    }
    catch (error) {
        console.error("Error fetching scenes:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
export const createSceneVersion = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { scripts_id, scenes_id, content, prev_scene_id } = req.body;
        // Create a new sceneVersionContent document
        const newSceneVersionContent = new sceneVersionContent({
            _id: new mongoose.Types.ObjectId(),
            content,
            time_stamp: new Date(),
            sceneVersions_id: null,
            scripts_id,
        });
        // Save the new sceneVersionContent to the database
        const savedSceneVersionContent = await newSceneVersionContent.save({
            session,
        });
        // Create a new sceneVersion document
        const newSceneVersion = new sceneVersions({
            _id: new mongoose.Types.ObjectId(),
            scripts_id,
            scenes_id,
            sceneVersionContent_id_array: [savedSceneVersionContent._id],
            current_sceneVersionContent_id: savedSceneVersionContent._id,
            time_stamp: new Date(),
        });
        // Save the new sceneVersion to the database
        const savedSceneVersion = await newSceneVersion.save({ session });
        // Update the sceneVersionContent document with the correct sceneVersions_id
        savedSceneVersionContent.sceneVersions_id =
            savedSceneVersion._id;
        await savedSceneVersionContent.save({ session });
        const scene = await scenes.findById(scenes_id).session(session);
        if (!scene) {
            throw new Error("Scene not found");
        }
        // Logic to insert at the correct position or at the front
        if (prev_scene_id && mongoose.Types.ObjectId.isValid(prev_scene_id)) {
            const index = scene.sceneVersions_id_array.findIndex((id) => id.toString() === prev_scene_id);
            if (index !== -1) {
                scene.sceneVersions_id_array.splice(index + 1, 0, savedSceneVersion._id);
            }
            else {
                console.log("Previous scene ID not found, adding at the front");
                scene.sceneVersions_id_array.unshift(savedSceneVersion._id);
            }
        }
        else {
            scene.sceneVersions_id_array.unshift(savedSceneVersion._id);
        }
        await scene.save({ session });
        // Commit the transaction
        await session.commitTransaction();
        session.endSession();
        // Return the saved sceneVersion and sceneVersionContent
        return res.status(201).json({
            sceneVersion: savedSceneVersion,
            sceneVersionContent: savedSceneVersionContent,
        });
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error("Error creating sceneVersion:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
export const updateCurrentSceneVersionContent = async (req, res) => {
    const { sceneVersionId, newContentId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(sceneVersionId) ||
        !mongoose.Types.ObjectId.isValid(newContentId)) {
        return res.status(400).json({ message: "Invalid ID(s) provided" });
    }
    try {
        const updatedSceneVersion = await sceneVersions
            .findByIdAndUpdate(sceneVersionId, { $set: { current_sceneVersionContent_id: newContentId } }, { new: true })
            .exec();
        if (!updatedSceneVersion) {
            return res.status(404).json({ message: "Scene version not found" });
        }
        return res.status(200).json(updatedSceneVersion);
    }
    catch (error) {
        console.error("Error updating scene version content ID:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
