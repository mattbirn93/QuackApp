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

export const updateContentArraySocket = async (data : any, callback : any) => {
    const { id, contentItem } = data;
    console.log("Received data in updateContentArraySocket:", data);
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return callback('Invalid ID format');
    }
  
    try {
      const sceneVersionContent = await SceneVersionContent.findById(id);
      if (!sceneVersionContent) {
        return callback('SceneVersionContent not found');
      }
  
      console.log('Found SceneVersionContent:', sceneVersionContent);
  
      // Check if contentItem already exists in the array
      const existingItemIndex = sceneVersionContent.content.findIndex(
        (item : any) => item.content_id.toString() === contentItem.content_id
      );
  
      if (existingItemIndex !== -1) {
        // Update existing item
        console.log('Updating existing item');
        sceneVersionContent.content[existingItemIndex] = { ...sceneVersionContent.content[existingItemIndex], ...contentItem };
      } else {
        // Add new item
        console.log('Adding new item');
        sceneVersionContent.content.push(contentItem);
      }
  
      await sceneVersionContent.save();
      console.log('Saved SceneVersionContent:', sceneVersionContent);
  
      callback(null, sceneVersionContent);
    } catch (error : any) {
      callback(error.message);
    }
  };