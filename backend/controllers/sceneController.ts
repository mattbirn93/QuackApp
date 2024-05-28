import { Request, Response } from 'express';
import mongoose from 'mongoose';
import scenes from '../models/sceneModel.js'; // Adjust the import path according to your project structure
import sceneVersions from '../models/sceneVersionModel.js';
// Controller method to fetch scenes by scriptId
export const fetchScenes = async (req: Request, res: Response) => {
  try {
    // Fetch scenes associated with the scriptId
    const fetechedScenes = await scenes.find().exec();

    // Debug information
    console.log('scenes:', fetechedScenes);

    // If no scenes found, return a 404 response
    if (!fetechedScenes) {
      return res
        .status(404)
        .json({ message: 'No scenes found for the given script ID.' });
    }

    // Return the fetched scenes
    return res.status(200).json(fetechedScenes);
  } catch (error) {
    console.error('Error fetching scenes:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const fetchScenesWithVersions = async (req: Request, res: Response) => {
  try {
    const scriptId = req.query.scriptId as string;

    const scenesWithVersions = await scenes
      .aggregate([
        { $match: { scripts_id: new mongoose.Types.ObjectId(scriptId) } },
        {
          $lookup: {
            from: 'sceneVersions',
            localField: 'sceneVersions_id_array',
            foreignField: '_id',
            as: 'sceneVersionsDetails',
          },
        },
      ])
      .exec();

    // Debug information
    console.log('Scenes with versions:', scenesWithVersions);

    // If no scenes found, return a 404 response
    if (!scenesWithVersions || scenesWithVersions.length === 0) {
      return res
        .status(404)
        .json({ message: 'No scenes found for the given script ID.' });
    }

    // Return the fetched scenes with versions
    return res.status(200).json(scenesWithVersions);
  } catch (error) {
    console.error('Error fetching scenes with versions:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const fetchScenesWithVersionContent = async (
  req: Request,
  res: Response,
) => {
  try {
    const scriptId = req.query.scriptId as string;

    console.log(scriptId);
    const scenesWithVersions = await scenes
      .aggregate([
        { $match: { scripts_id: new mongoose.Types.ObjectId(scriptId) } },
        {
          $lookup: {
            from: 'sceneVersions',
            localField: 'sceneVersions_id_array',
            foreignField: '_id',
            as: 'sceneVersionsDetails',
          },
        },
        {
          $unwind: '$sceneVersionsDetails',
        },
        {
          $lookup: {
            from: 'sceneVersionContent',
            localField: 'sceneVersionsDetails.current_sceneVersionContent_id',
            foreignField: '_id',
            as: 'sceneVersionsDetails.currentSceneVersionContent',
          },
        },
        {
          $unwind: '$sceneVersionsDetails.currentSceneVersionContent',
        },
        {
          $group: {
            _id: '$_id',
            scripts_id: { $first: '$scripts_id' },
            sceneVersionsDetails: { $push: '$sceneVersionsDetails' },
          },
        },
        {
          $project: {
            _id: 1,
            scripts_id: 1,
            sceneVersionsDetails: {
              currentSceneVersionContent: 1,
            },
          },
        },
      ])
      .exec();

    // Debug information
    console.log(
      'Scenes with versions:',
      JSON.stringify(scenesWithVersions, null, 2),
    );

    if (!scenesWithVersions || scenesWithVersions.length === 0) {
      return res
        .status(404)
        .json({ message: 'No scenes found for the given script ID.' });
    }

    // Return the fetched scenes with current_sceneVersionContent_id
    return res.status(200).json(scenesWithVersions);
  } catch (error) {
    console.error('Error fetching scenes with versions:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
