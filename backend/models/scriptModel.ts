import mongoose, { Document, Schema } from 'mongoose';

export interface IScript extends Document {
  title: string;
  user_id: mongoose.Types.ObjectId;
  title_page: Record<string, unknown>;
  character_document_id: mongoose.Types.ObjectId;
  scene_document_id: mongoose.Types.ObjectId;
  time_stamp: Date;
}

const scriptSchema: Schema = new Schema({
  title: { type: String, required: true },
  user_id: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  title_page: { type: Object, required: true },
  character_document_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Character',
  },
  scene_document_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Scene',
  },
  time_stamp: { type: Date, default: Date.now },
});

export default mongoose.model<IScript>('Script', scriptSchema);
