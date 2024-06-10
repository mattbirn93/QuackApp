import mongoose, { Document, Schema } from 'mongoose';

export interface IScript extends Document {
  title: string;
  user_id: mongoose.Types.ObjectId;
  title_page: Record<string, unknown>;
  characters_id: mongoose.Types.ObjectId;
  content: string;
  time_stamp: Date;
}

const scriptFullSchema: Schema = new Schema({
  title: { type: String, required: true },
  users_id: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  title_page: { type: Object, required: true },
  characters_id: {
    type: mongoose.Types.ObjectId,
    required: false,
    ref: 'Character',
  },
  content: {type: String, required: true},
  time_stamp: { type: Date, default: Date.now },
});

export default mongoose.model<IScript>('scriptsFull', scriptFullSchema, 'scriptsFull');