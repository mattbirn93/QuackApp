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


export const updateContentItemSocket = async (data : any, callback : any) => {
  const { id, contentItem } = data;
  console.log("Received data in updateContentItemSocket:", data);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return callback('Invalid ID format');
  }

  try {
    const sceneVersionContent = await SceneVersionContent.findById(id);
    if (!sceneVersionContent) {
      return callback('SceneVersionContent not found');
    }

    console.log('Found SceneVersionContent:', sceneVersionContent);

    // Ensure time_stamp is a valid Date object
    if (contentItem.time_stamp && !(contentItem.time_stamp instanceof Date)) {
      contentItem.time_stamp = new Date(contentItem.time_stamp);
    }

    // Check if contentItem already exists in the array
    const existingItemIndex = sceneVersionContent.content.findIndex(
      (item : any) => item && item.content_id && item.content_id.toString() === contentItem.content_id.toString()
    );

    if (existingItemIndex !== -1) {
      // Update existing item
      sceneVersionContent.content[existingItemIndex] = { ...sceneVersionContent.content[existingItemIndex], ...contentItem };
      await sceneVersionContent.save();

      callback(null, sceneVersionContent);
    } else {
      callback('Content item not found');
    }
  } catch (error : any) {
    callback(error.message);
  }
};

export const createContentItemSocket = async (data : any, callback : any) => {
  const { id, contentItem, prev_content_id } = data;
  console.log("Received data in createContentItemSocket:", data);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return callback('Invalid ID format');
  }

  try {
    const sceneVersionContent = await SceneVersionContent.findById(id);
    if (!sceneVersionContent) {
      return callback('SceneVersionContent not found');
    }

    contentItem.content_id = new mongoose.Types.ObjectId();

    if (prev_content_id && mongoose.Types.ObjectId.isValid(prev_content_id)) {
      const prevItemIndex = sceneVersionContent.content.findIndex(
        (item : any) => item && item.content_id && item.content_id.toString() === prev_content_id.toString()
      );

      if (prevItemIndex !== -1) {
        // If found, splice the new item right after the found index
        sceneVersionContent.content.splice(prevItemIndex + 1, 0, contentItem);
      } else {
        // If the previous content id is not found, handle the error
        return callback('Previous content item not found');
      }
    } else {
      // If no prev_content_id is provided, or it's invalid, just push the new item
      sceneVersionContent.content.push(contentItem);
    }

    await sceneVersionContent.save();
    console.log('Saved SceneVersionContent:', sceneVersionContent);

    callback(null, sceneVersionContent);
  } catch (error : any) {
    callback(error.message);
  }
};

export const deleteContentItemSocket = async (data : any, callback  : any) => {
  const { id, content_id } = data;
  console.log("Received data in deleteContentItemSocket:", data);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return callback('Invalid ID format');
  }

  try {
    const sceneVersionContent = await SceneVersionContent.findById(id);
    if (!sceneVersionContent) {
      return callback('SceneVersionContent not found');
    }

    // Check the content array and each content_id
    if (!sceneVersionContent.content || sceneVersionContent.content.length === 0) {
      return callback('No content items found');
    }

    const existingItemIndex = sceneVersionContent.content.findIndex(
    (item : any) => item && item.content_id && item.content_id.toString() === content_id
    );

    if (existingItemIndex === -1) {
      return callback('Content item not found');
    }

    // Proceed to delete the item
    sceneVersionContent.content.splice(existingItemIndex, 1);
    await sceneVersionContent.save();
    callback(null, sceneVersionContent);
  } catch (error  : any) {
    callback(error.message);
  }
};
