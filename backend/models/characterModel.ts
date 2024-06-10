import mongoose, { Document, Schema } from 'mongoose';

export interface ICharacter extends Document {
  characters_array: any[];
  script_id: mongoose.Types.ObjectId;
  time_stamp: Date;
}

const characterSchema: Schema = new Schema({
  characters_array: { type: [String], required: true },
  script_id: { type: mongoose.Types.ObjectId, required: true, ref: 'Script' },
  time_stamp: { type: Date, default: Date.now },
});

export default mongoose.model<ICharacter>('Character', characterSchema);