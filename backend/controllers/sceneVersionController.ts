import { Request, Response } from 'express';
import mongoose from 'mongoose';
import sceneVersions from '../models/sceneVersionModel.js'; // Adjust the import path according to your project structure
import sceneVersionContent from '../models/sceneVersionContentModel.js';
import scenes from '../models/sceneModel.js';
// Controller method to fetch scenes by scriptId
export const fetchSceneVersions = async (req: Request, res: Response) => {
  try {
    // Fetch scenes associated with the scriptId
    const fetchedSceneVersions = await sceneVersions.find().exec();

    // Debug information
    console.log('scenes:', fetchedSceneVersions);

    // If no scenes found, return a 404 response
    if (!fetchedSceneVersions) {
      return res
        .status(404)
        .json({ message: 'No scenes found for the given script ID.' });
    }

    // Return the fetched scenes
    return res.status(200).json(fetchedSceneVersions);
  } catch (error) {
    console.error('Error fetching scenes:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
export const createSceneVersion = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { scripts_id, scenes_id, content } = req.body;

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
      savedSceneVersion._id as mongoose.Types.ObjectId;
    await savedSceneVersionContent.save({ session });

    const scene = await scenes.findById(scenes_id).session(session);
    if (!scene) {
      throw new Error('Scene not found');
    }
    scene.sceneVersions_id_array.push(
      savedSceneVersion._id as mongoose.Types.ObjectId,
    );
    await scene.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    // Return the saved sceneVersion and sceneVersionContent
    return res.status(201).json({
      sceneVersion: savedSceneVersion,
      sceneVersionContent: savedSceneVersionContent,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error creating sceneVersion:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
