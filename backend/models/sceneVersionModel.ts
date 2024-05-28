import mongoose, { Document, Schema } from 'mongoose';

export interface ISceneVersion extends Document {
  content: string[];
  scene_id: mongoose.Types.ObjectId;
  current_version_id: mongoose.Types.ObjectId;
  time_stamp: Date;
}

const sceneVersionSchema: Schema = new Schema({
  content: { type: [String], required: true },
  scene_id: { type: mongoose.Types.ObjectId, required: true, ref: 'Scene' },
  current_version_id: { type: mongoose.Types.ObjectId, required: true },
  time_stamp: { type: Date, default: Date.now },
});

export default mongoose.model<ISceneVersion>('SceneVersion', sceneVersionSchema);