import mongoose, { Document, Schema } from 'mongoose';

export interface IScene extends Document {
  scripts_id: mongoose.Types.ObjectId;
  sceneVersions_id_array: mongoose.Types.ObjectId[];
  time_stamp: Date;
}

const sceneSchema: Schema = new Schema({
  scripts_id: { type: mongoose.Types.ObjectId, required: true, ref: 'Script' },
  sceneVersions_id_array: {
    type: [mongoose.Types.ObjectId],
    required: true,
    ref: 'Scene',
  },
});

export default mongoose.model<IScene>('scenes', sceneSchema, 'scenes');
