import { Request, Response } from "express";
import mongoose from "mongoose";
import scriptsFull from "../models/scriptsFullModel.js";
import scenes from "../models/sceneModel.js";
import User from "../models/userModel.js";

interface FetchScriptsFullQuery {
  scriptId: string;
}

export const fetchScriptsFull = async (
  req: Request<{}, {}, {}, FetchScriptsFullQuery>,
  res: Response,
): Promise<Response> => {
  const { scriptId } = req.query;

  if (!mongoose.Types.ObjectId.isValid(scriptId)) {
    return res.status(400).json({ message: "Invalid script ID" });
  }

  try {
    const fetchedScript = await scriptsFull.findById(scriptId).exec();

    if (!fetchedScript) {
      return res.status(404).json({ message: "Script not found" });
    }

    return res.status(200).json(fetchedScript);
  } catch (error) {
    console.error("Error fetching script:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

interface UpdateScriptCharactersBody {
  characters: string[];
}

export const updateScriptCharacters = async (
  req: Request<{}, {}, UpdateScriptCharactersBody, FetchScriptsFullQuery>,
  res: Response,
): Promise<Response> => {
  const { scriptId } = req.query;
  const { characters } = req.body;

  if (!mongoose.Types.ObjectId.isValid(scriptId)) {
    return res.status(400).json({ message: "Invalid script ID" });
  }

  try {
    const updatedScript = await scriptsFull.findByIdAndUpdate(
      scriptId,
      { characters },
      { new: true },
    );

    if (!updatedScript) {
      return res.status(404).json({ message: "Script not found" });
    }

    return res.status(200).json(updatedScript);
  } catch (error) {
    console.error("Error updating script characters:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

interface UpdateScriptContentBody {
  newContent: string;
}

export const updateScriptContent = async (
  req: Request<{}, {}, UpdateScriptContentBody, FetchScriptsFullQuery>,
  res: Response,
): Promise<Response> => {
  const { scriptId } = req.query;
  const { newContent } = req.body;

  if (!mongoose.Types.ObjectId.isValid(scriptId)) {
    return res.status(400).json({ message: "Invalid script ID" });
  }

  try {
    const updatedScript = await scriptsFull.findByIdAndUpdate(
      scriptId,
      { content: newContent },
      { new: true },
    );

    if (!updatedScript) {
      return res.status(404).json({ message: "Script not found" });
    }

    return res.status(200).json(updatedScript);
  } catch (error) {
    console.error("Error updating script content:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

interface UpdateScriptTitlePageBody {
  title_page: string;
}

export const updateScriptTitlePage = async (
  req: Request<{}, {}, UpdateScriptTitlePageBody, FetchScriptsFullQuery>,
  res: Response,
): Promise<Response> => {
  const { scriptId } = req.query;
  const { title_page } = req.body;

  if (!mongoose.Types.ObjectId.isValid(scriptId)) {
    return res.status(400).json({ message: "Invalid script ID" });
  }

  try {
    const updatedScript = await scriptsFull.findByIdAndUpdate(
      scriptId,
      { title_page },
      { new: true },
    );

    if (!updatedScript) {
      return res.status(404).json({ message: "Script not found" });
    }

    return res.status(200).json(updatedScript);
  } catch (error) {
    console.error("Error updating script title page:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

interface CreateScriptBody {
  title: string;
  title_page: string;
  users_id: string;
}

export const createScript = async (
  req: Request<{}, {}, CreateScriptBody>,
  res: Response,
): Promise<Response> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { title, title_page, users_id } = req.body;

    const newScript = new scriptsFull({
      _id: new mongoose.Types.ObjectId(),
      title,
      title_page,
      time_stamp: new Date(),
      users_id,
      content: {
        type: "doc",
        content: [],
      },
      characters: [],
    });

    const savedScript = await newScript.save({ session });

    const user = await User.findById(users_id).session(session);
    if (!user) {
      throw new Error("User not found");
    }

    user.scripts_id_array.push(savedScript._id as mongoose.Types.ObjectId);
    await user.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({ script: savedScript });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error creating script:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

interface FetchScriptsByIdQuery {
  ids: string;
}

export const fetchScriptsById = async (
  req: Request<{}, {}, {}, FetchScriptsByIdQuery>,
  res: Response,
): Promise<Response> => {
  try {
    const { ids } = req.query;

    const idsArray = (typeof ids === "string" ? ids.split(",") : []).map((id) =>
      id.trim(),
    );

    const objectIds = idsArray.map((id) => {
      if (mongoose.Types.ObjectId.isValid(id)) {
        return new mongoose.Types.ObjectId(id);
      } else {
        throw new Error(`Invalid ObjectId: ${id}`);
      }
    });

    const fetchedScripts = await scriptsFull
      .find({ _id: { $in: objectIds } })
      .select("-content")
      .exec();

    if (!fetchedScripts.length) {
      return res
        .status(404)
        .json({ message: "No scripts found for the given IDs." });
    }

    return res.status(200).json(fetchedScripts);
  } catch (error) {
    console.error("Error fetching scripts by IDs:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const fetchScripts = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const fetchedScripts = await scriptsFull.find().exec();

    console.log("scenes:", fetchedScripts);

    if (!fetchedScripts) {
      return res
        .status(404)
        .json({ message: "No scenes found for the given script ID." });
    }

    return res.status(200).json(fetchedScripts);
  } catch (error) {
    console.error("Error fetching scenes:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

////////////////////////

// import { Request, Response } from "express";
// import mongoose from "mongoose";
// import scriptsFull from "../models/scriptsFullModel.js";
// import scenes from "../models/sceneModel.js";
// import User from "../models/userModel.js";

// export const fetchScriptsFull = async (req: Request, res: Response) => {
//   const { scriptId } = req.query as any;

//   if (!mongoose.Types.ObjectId.isValid(scriptId)) {
//     return res.status(400).json({ message: "Invalid script ID" });
//   }

//   try {
//     // Fetch the script by ID
//     const fetchedScript = await scriptsFull.findById(scriptId).exec();

//     // If no script found, return a 404 response
//     if (!fetchedScript) {
//       return res.status(404).json({ message: "Script not found" });
//     }

//     // Return the fetched script
//     return res.status(200).json(fetchedScript);
//   } catch (error) {
//     console.error("Error fetching script:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// export const updateScriptCharacters = async (req: Request, res: Response) => {
//   const { scriptId } = req.query as any; // Change from req.params to req.query
//   const { characters } = req.body;
//   console.log(characters);
//   if (!mongoose.Types.ObjectId.isValid(scriptId)) {
//     return res.status(400).json({ message: "Invalid script ID" });
//   }

//   try {
//     // Find the script by ID and update the characters
//     const updatedScript = await scriptsFull.findByIdAndUpdate(
//       scriptId,
//       { characters },
//       { new: true },
//     );

//     // If no script found, return a 404 response
//     if (!updatedScript) {
//       return res.status(404).json({ message: "Script not found" });
//     }

//     // Return the updated script
//     return res.status(200).json(updatedScript);
//   } catch (error) {
//     console.error("Error updating script characters:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// export const updateScriptContent = async (req: Request, res: Response) => {
//   const { scriptId } = req.query as any; // Change from req.params to req.query
//   const { newContent } = req.body;
//   console.log(newContent);
//   if (!mongoose.Types.ObjectId.isValid(scriptId)) {
//     return res.status(400).json({ message: "Invalid script ID" });
//   }

//   try {
//     // Find the script by ID and update the content
//     const updatedScript = await scriptsFull.findByIdAndUpdate(
//       scriptId,
//       { content: newContent },
//       { new: true },
//     );

//     // If no script found, return a 404 response
//     if (!updatedScript) {
//       return res.status(404).json({ message: "Script not found" });
//     }

//     // Return the updated script
//     return res.status(200).json(updatedScript);
//   } catch (error) {
//     console.error("Error updating script content:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// export const updateScriptTitlePage = async (req: Request, res: Response) => {
//   const { scriptId } = req.query as any; // Change from req.params to req.query
//   const { title_page } = req.body;
//   console.log(title_page);
//   if (!mongoose.Types.ObjectId.isValid(scriptId)) {
//     return res.status(400).json({ message: "Invalid script ID" });
//   }

//   try {
//     // Find the script by ID and update the title_page
//     const updatedScript = await scriptsFull.findByIdAndUpdate(
//       scriptId,
//       { title_page },
//       { new: true },
//     );

//     // If no script found, return a 404 response
//     if (!updatedScript) {
//       return res.status(404).json({ message: "Script not found" });
//     }

//     // Return the updated script
//     return res.status(200).json(updatedScript);
//   } catch (error) {
//     console.error("Error updating script title page:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// export const createScript = async (req: Request, res: Response) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const { title, title_page, users_id } = req.body;

//     // Create a new script instance
//     const newScript = new scriptsFull({
//       _id: new mongoose.Types.ObjectId(),
//       title,
//       title_page,
//       time_stamp: new Date(),
//       users_id,
//       content: {
//         type: "doc",
//         content: []
//       },
//       characters: []
//     });

//     // Save the new script to the database
//     const savedScript = await newScript.save({ session });

//     // Find the user and update their scripts_id_array
//     const user = await User.findById(users_id).session(session);
//     if (!user) {
//       throw new Error("User not found");
//     }

//     user.scripts_id_array.push(savedScript._id as mongoose.Types.ObjectId);
//     await user.save({ session });

//     // Commit the transaction
//     await session.commitTransaction();
//     session.endSession();

//     // Return the saved script
//     return res.status(201).json({ script: savedScript });
//   } catch (error) {
//     await session.abortTransaction();
//     session.endSession();
//     console.error("Error creating script:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// export const fetchScriptsById = async (req: Request, res: Response) => {
//   try {
//     const { ids } = req.query as { ids: string };

//     const idsArray = (typeof ids === "string" ? ids.split(",") : []).map((id) =>
//       id.trim()
//     );

//     // Convert string ids to ObjectIds
//     const objectIds = idsArray.map((id) => {
//       if (mongoose.Types.ObjectId.isValid(id)) {
//         return new mongoose.Types.ObjectId(id);
//       } else {
//         throw new Error(`Invalid ObjectId: ${id}`);
//       }
//     });

//     const fetchedScripts = await scriptsFull
//       .find({
//         _id: { $in: objectIds },
//       })
//       .select('-content') // Exclude the 'content' field
//       .exec();

//     if (!fetchedScripts.length) {
//       return res.status(404).json({ message: "No scripts found for the given IDs." });
//     }

//     return res.status(200).json(fetchedScripts);
//   } catch (error) {
//     console.error("Error fetching scripts by IDs:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// export const fetchScripts = async (req: Request, res: Response) => {
//   try {
//     // Fetch scenes associated with the scriptId
//     const fetchedScripts = await scriptsFull.find().exec();

//     // Debug information
//     console.log("scenes:", fetchedScripts);

//     // If no scenes found, return a 404 response
//     if (!fetchedScripts) {
//       return res
//         .status(404)
//         .json({ message: "No scenes found for the given script ID." });
//     }

//     // Return the fetched scenes
//     return res.status(200).json(fetchedScripts);
//   } catch (error) {
//     console.error("Error fetching scenes:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };
