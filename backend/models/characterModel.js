import mongoose, { Schema } from 'mongoose';
const characterSchema = new Schema({
    characters_array: { type: [String], required: true },
    script_id: { type: mongoose.Types.ObjectId, required: true, ref: 'Script' },
    time_stamp: { type: Date, default: Date.now },
});
export default mongoose.model('Character', characterSchema);
