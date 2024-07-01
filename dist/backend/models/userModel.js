// The user model defines the structure of the user data and how it is stored in the database
import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
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
export default mongoose.model("User", userSchema);
