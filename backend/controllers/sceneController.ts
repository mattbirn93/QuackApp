import { Request, Response } from "express";
import mongoose from "mongoose";
import scenes from "../models/sceneModel.js"; // Adjust the import path according to your project structure
import sceneVersions from "../models/sceneVersionModel.js";
import sceneVersionContent from "../models/sceneVersionContentModel.js";

// Controller method to fetch scenes
export const fetchScenes = async (req: Request, res: Response) => {
  try {
    const fetechedScenes = await scenes.find().exec();
    console.log("Fetched scenes:", fetechedScenes);

    if (!fetechedScenes || fetechedScenes.length === 0) {
      return res.status(404).json({ message: "No scenes found." });
    }

    return res.status(200).json(fetechedScenes);
  } catch (error) {
    console.error("Error fetching scenes:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Controller method to fetch scenes with versions
export const fetchScenesWithVersions = async (req: Request, res: Response) => {
  try {
    const scriptId = req.query.scriptId as string;
    const scenesWithVersions = await scenes
      .aggregate([
        { $match: { scripts_id: new mongoose.Types.ObjectId(scriptId) } },
        {
          $lookup: {
            from: "sceneVersions",
            localField: "sceneVersions_id_array",
            foreignField: "_id",
            as: "sceneVersionsDetails",
          },
        },
      ])
      .exec();

    console.log("Scenes with versions:", scenesWithVersions);

    if (!scenesWithVersions || scenesWithVersions.length === 0) {
      return res
        .status(404)
        .json({ message: "No scenes found for the given script ID." });
    }

    return res.status(200).json(scenesWithVersions);
  } catch (error) {
    console.error("Error fetching scenes with versions:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Controller method to fetch scenes with version content
export const fetchScenesWithVersionContent = async (
  req: Request,
  res: Response,
) => {
  try {
    const scriptId = req.query.scriptId as string;
    const scenesWithVersions = await scenes
      .aggregate([
        { $match: { scripts_id: new mongoose.Types.ObjectId(scriptId) } },
        {
          $lookup: {
            from: "sceneVersions",
            localField: "sceneVersions_id_array",
            foreignField: "_id",
            as: "sceneVersionsDetails",
          },
        },
        { $unwind: "$sceneVersionsDetails" },
        {
          $lookup: {
            from: "sceneVersionContent",
            localField: "sceneVersionsDetails.current_sceneVersionContent_id",
            foreignField: "_id",
            as: "sceneVersionsDetails.currentSceneVersionContent",
          },
        },
        { $unwind: "$sceneVersionsDetails.currentSceneVersionContent" },
        {
          $group: {
            _id: "$_id",
            scripts_id: { $first: "$scripts_id" },
            sceneVersionsDetails: { $push: "$sceneVersionsDetails" },
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

    console.log(
      "Scenes with version content:",
      JSON.stringify(scenesWithVersions, null, 2),
    );

    if (!scenesWithVersions || scenesWithVersions.length === 0) {
      return res
        .status(404)
        .json({ message: "No scenes found for the given script ID." });
    }

    return res.status(200).json(scenesWithVersions);
  } catch (error) {
    console.error("Error fetching scenes with version content:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Controller method to create a new scene
export const createScene = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { scriptId } = req.body;

    const newScene = new scenes({
      scripts_id: scriptId,
      sceneVersions_id_array: [],
      time_stamp: new Date(),
    });

    const savedScene = await newScene.save({ session });

    const newSceneVersion = new sceneVersions({
      scene_id: savedScene._id,
      current_sceneVersionContent_id: null,
      sceneVersionContent_id_array: [],
      time_stamp: new Date(),
    });

    const savedSceneVersion = await newSceneVersion.save({ session });

    const newSceneVersionContent = new sceneVersionContent({
      content: "Initial content",
      time_stamp: new Date(),
    });

    const savedSceneVersionContent = await newSceneVersionContent.save({
      session,
    });

    savedSceneVersion.current_sceneVersionContent_id =
      savedSceneVersionContent._id as any;
    savedSceneVersion.sceneVersionContent_id_array.push(
      savedSceneVersionContent._id as any,
    );
    await savedSceneVersion.save({ session });

    savedScene.sceneVersions_id_array.push(savedSceneVersion._id as any);
    await savedScene.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      scene: savedScene,
      sceneVersion: savedSceneVersion,
      sceneVersionContent: savedSceneVersionContent,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error creating scene and related documents:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/////////////

// import { Request, Response } from "express";
// import mongoose from "mongoose";
// import scenes from "../models/sceneModel.js"; // Adjust the import path according to your project structure
// import sceneVersions from "../models/sceneVersionModel.js";
// import sceneVersionContent from "../models/sceneVersionContentModel.js";
// // Controller method to fetch scenes by scriptId
// export const fetchScenes = async (req: Request, res: Response) => {
//   try {
//     // Fetch scenes associated with the scriptId
//     const fetechedScenes = await scenes.find().exec();

//     // Debug information
//     console.log("scenes:", fetechedScenes);

//     // If no scenes found, return a 404 response
//     if (!fetechedScenes) {
//       return res
//         .status(404)
//         .json({ message: "No scenes found for the given script ID." });
//     }

//     // Return the fetched scenes
//     return res.status(200).json(fetechedScenes);
//   } catch (error) {
//     console.error("Error fetching scenes:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// export const fetchScenesWithVersions = async (req: Request, res: Response) => {
//   try {
//     const scriptId = req.query.scriptId as string;

//     const scenesWithVersions = await scenes
//       .aggregate([
//         { $match: { scripts_id: new mongoose.Types.ObjectId(scriptId) } },
//         {
//           $lookup: {
//             from: "sceneVersions",
//             localField: "sceneVersions_id_array",
//             foreignField: "_id",
//             as: "sceneVersionsDetails",
//           },
//         },
//       ])
//       .exec();

//     // Debug information
//     console.log("Scenes with versions:", scenesWithVersions);

//     // If no scenes found, return a 404 response
//     if (!scenesWithVersions || scenesWithVersions.length === 0) {
//       return res
//         .status(404)
//         .json({ message: "No scenes found for the given script ID." });
//     }

//     // Return the fetched scenes with versions
//     return res.status(200).json(scenesWithVersions);
//   } catch (error) {
//     console.error("Error fetching scenes with versions:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// export const fetchScenesWithVersionContent = async (
//   req: Request,
//   res: Response,
// ) => {
//   try {
//     const scriptId = req.query.scriptId as string;

//     console.log(scriptId);
//     const scenesWithVersions = await scenes
//       .aggregate([
//         { $match: { scripts_id: new mongoose.Types.ObjectId(scriptId) } },
//         {
//           $lookup: {
//             from: "sceneVersions",
//             localField: "sceneVersions_id_array",
//             foreignField: "_id",
//             as: "sceneVersionsDetails",
//           },
//         },
//         {
//           $unwind: "$sceneVersionsDetails",
//         },
//         {
//           $lookup: {
//             from: "sceneVersionContent",
//             localField: "sceneVersionsDetails.current_sceneVersionContent_id",
//             foreignField: "_id",
//             as: "sceneVersionsDetails.currentSceneVersionContent",
//           },
//         },
//         {
//           $unwind: "$sceneVersionsDetails.currentSceneVersionContent",
//         },
//         {
//           $group: {
//             _id: "$_id",
//             scripts_id: { $first: "$scripts_id" },
//             sceneVersionsDetails: { $push: "$sceneVersionsDetails" },
//           },
//         },
//         {
//           $project: {
//             _id: 1,
//             scripts_id: 1,
//             sceneVersionsDetails: {
//               currentSceneVersionContent: 1,
//             },
//           },
//         },
//       ])
//       .exec();

//     // Debug information
//     console.log(
//       "Scenes with versions:",
//       JSON.stringify(scenesWithVersions, null, 2),
//     );

//     if (!scenesWithVersions || scenesWithVersions.length === 0) {
//       return res
//         .status(404)
//         .json({ message: "No scenes found for the given script ID." });
//     }

//     // Return the fetched scenes with current_sceneVersionContent_id
//     return res.status(200).json(scenesWithVersions);
//   } catch (error) {
//     console.error("Error fetching scenes with versions:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// export const createScene = async (req: Request, res: Response) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const { scriptId } = req.body; // Assuming scriptId is provided in the request body

//     // Create a new scene
//     const newScene = new scenes({
//       scripts_id: scriptId,
//       sceneVersions_id_array: [], // This will be populated with the new version
//       time_stamp: new Date(),
//     });

//     // Save the new scene
//     const savedScene = await newScene.save({ session });

//     // Create a new scene version
//     const newSceneVersion = new sceneVersions({
//       scene_id: savedScene._id,
//       current_sceneVersionContent_id: null, // This will be updated after creating the content
//       sceneVersionContent_id_array: [],
//       time_stamp: new Date(),
//     });

//     // Save the new scene version
//     const savedSceneVersion = await newSceneVersion.save({ session });

//     // Create a new scene version content
//     const newSceneVersionContent = new sceneVersionContent({
//       content: "Initial content", // Example initial content, replace with actual initial content from the request
//       time_stamp: new Date(),
//     });

//     // Save the new scene version content
//     const savedSceneVersionContent = await newSceneVersionContent.save({
//       session,
//     });

//     // Link the content with the version
//     savedSceneVersion.current_sceneVersionContent_id =
//       savedSceneVersionContent._id as any;
//     savedSceneVersion.sceneVersionContent_id_array.push(
//       savedSceneVersionContent._id as any,
//     );
//     await savedSceneVersion.save({ session });

//     savedScene.sceneVersions_id_array.push(savedSceneVersion._id as any);
//     await savedScene.save({ session });

//     // Commit the transaction
//     await session.commitTransaction();
//     session.endSession();

//     // Return the newly created scene, its version, and content
//     return res.status(201).json({
//       scene: savedScene,
//       sceneVersion: savedSceneVersion,
//       sceneVersionContent: savedSceneVersionContent,
//     });
//   } catch (error) {
//     // If an error occurs, abort the transaction and log the error
//     await session.abortTransaction();
//     session.endSession();
//     console.error("Error creating scene and related documents:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };
