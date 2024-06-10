import mongoose, { Document, Schema } from 'mongoose';

export interface ISceneVersion extends Document {
  scripts_id: mongoose.Types.ObjectId;
  scenes_id: mongoose.Types.ObjectId;
  sceneVersionContent_id_array: mongoose.Types.ObjectId[];
  current_sceneVersionContent_id: mongoose.Types.ObjectId;
  time_stamp: Date;
}

const sceneVersionSchema: Schema = new Schema({
  scripts_id: { type: mongoose.Types.ObjectId, required: true, ref: 'Script' },
  scenes_id: { type: mongoose.Types.ObjectId, required: true, ref: 'Scene' },
  sceneVersionContent_id_array: {
    type: [mongoose.Types.ObjectId],
    required: false,
    ref: 'SceneVersions',
  },
  current_sceneVersionContent_id: {
    type: mongoose.Types.ObjectId,
    required: false,
  },
  time_stamp: { type: Date, default: Date.now },
});

export default mongoose.model<ISceneVersion>(
  'sceneVersions',
  sceneVersionSchema,
  'sceneVersions',
);