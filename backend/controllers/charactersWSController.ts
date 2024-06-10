import mongoose from "mongoose";
import characters from "../models/characterModel.js"

export const getCharactersById = async (id : any, callback : any) => {
    try {
      const charactersDoc = await characters.findById(id);
      if (!charactersDoc) {
        throw new Error('Characters document not found');
      }
      callback(null, charactersDoc);
    } catch (error : any) {
      callback(error.message);
    }
  };
  export const addCharacterToArray = async (data : any, callback : any) => {
    const { charactersId, character } = data;
    const session = await mongoose.startSession();
 
    if (!mongoose.Types.ObjectId.isValid(charactersId)) {
      return callback('Invalid Characters document ID');
    }

    // Creating a new ObjectId for the new character
    const newCharacter = {
      ...character,
      _id: new mongoose.Types.ObjectId()
    };
  
    try {
      session.startTransaction(); // Start a transaction
      const updatedCharacters = await characters.findByIdAndUpdate(
        charactersId,
        { $push: { characters_array: newCharacter } },
        { new: true, session: session }
      );
  
      if (!updatedCharacters) {
        await session.abortTransaction(); // Abort transaction if update fails
        session.endSession();
        throw new Error('Failed to update Characters document');
      }

      await session.commitTransaction(); // Commit the transaction
      session.endSession();
      callback(null, updatedCharacters);
    } catch (error : any) {
      await session.abortTransaction(); // Ensure transaction is aborted on error
      session.endSession();
      callback(error.message);
    }
};

  export const updateCharacterInArray = async (data : any, callback : any) => {
    const { charactersId, characterId, character_name } = data;

    console.log(charactersId, characterId, character_name)
    if (!mongoose.Types.ObjectId.isValid(charactersId) || !mongoose.Types.ObjectId.isValid(characterId)) {
      return callback('Invalid ID format');
    }
  
    try {  


        const updatedCharacters = await characters.findOneAndUpdate(
            { _id: charactersId, 'characters_array._id': characterId },
            { $set: { 'characters_array.$.character_name': character_name } }, // Directly set the character_name
            { new: true, runValidators: true }
          );

  
      if (!updatedCharacters) {
        throw new Error('Character not found or update failed');
      }
      callback(null, updatedCharacters);
    } catch (error : any) {
      callback(error.message);
    }
  };
  
  