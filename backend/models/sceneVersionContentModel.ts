import mongoose, { Document, Schema } from 'mongoose';

export interface ISceneVersionContent extends Document {
  content: {
      [x: string]: any; type: [Schema.Types.Mixed]; required: false 
};
  sceneVersions_id: mongoose.Types.ObjectId;
  scripts_id: mongoose.Types.ObjectId;
}

const SceneVersionContentSchema: Schema = new Schema({
  content: { type: [Schema.Types.Mixed], required: false },
  sceneVersions_id: {
    type: mongoose.Types.ObjectId,
    required: false,
    ref: 'Scene',
  },
  scripts_id: {
    type: mongoose.Types.ObjectId,
    required: false,
    ref: 'Scene',
  },
  time_stamp: { type: Date, default: Date.now },
});

export default mongoose.model<ISceneVersionContent>(
  'sceneVersionContent',
  SceneVersionContentSchema,
  'sceneVersionContent',
);