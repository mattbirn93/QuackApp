import mongoose, { Schema } from 'mongoose';
const SceneVersionContentSchema = new Schema({
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
export default mongoose.model('sceneVersionContent', SceneVersionContentSchema, 'sceneVersionContent');
