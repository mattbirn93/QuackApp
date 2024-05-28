import mongoose from 'mongoose';
import SceneVersionContent from '../models/sceneVersionContentModel.js'; // Adjust the import path according to your project structure

export const getSceneVersionContentSocket = async (id: string, callback: Function) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ID format');
    }

    const sceneVersionContent = await SceneVersionContent.findById(id);
    if (!sceneVersionContent) {
      throw new Error('SceneVersionContent not found');
    }

    callback(null, sceneVersionContent);
  } catch (error: any) {
    callback(error.message);
  }
};
