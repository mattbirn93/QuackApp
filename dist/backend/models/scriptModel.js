import mongoose, { Schema } from 'mongoose';
const scriptSchema = new Schema({
    title: { type: String, required: true },
    users_id: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    title_page: { type: Object, required: true },
    characters_id: {
        type: mongoose.Types.ObjectId,
        required: false,
        ref: 'Character',
    },
    scenes_id: { type: mongoose.Types.ObjectId, required: false, ref: 'Scene' },
    time_stamp: { type: Date, default: Date.now },
});
export default mongoose.model('scripts', scriptSchema, 'scripts');
