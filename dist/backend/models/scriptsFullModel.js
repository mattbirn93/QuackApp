import mongoose, { Schema } from 'mongoose';
const scriptFullSchema = new Schema({
    title: { type: String, required: true },
    users_id: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    title_page: { type: Object, required: true },
    characters_id: {
        type: mongoose.Types.ObjectId,
        required: false,
        ref: 'Character',
    },
    content: { type: Object, required: false },
    characters: { type: Array, required: false },
    time_stamp: { type: Date, default: Date.now },
});
export default mongoose.model('scriptsFull', scriptFullSchema, 'scriptsFull');
