// The user model defines the structure of the user data and how it is stored in the database

import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  first_name: string;
  last_name: string;
  email: string;
  time_stamp: Date;
  scripts_id_array: mongoose.Types.ObjectId[];
}

const userSchema: Schema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  time_stamp: { type: Date, default: Date.now },
  scripts_id_array: {
    type: [mongoose.Types.ObjectId],
    required: true,
    ref: "Script",
  },
});

export default mongoose.model<IUser>("User", userSchema);