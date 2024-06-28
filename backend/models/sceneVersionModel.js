import mongoose, { Schema } from 'mongoose';
const sceneVersionSchema = new Schema({
    scripts_id: { type: mongoose.Types.ObjectId, required: true, ref: 'Script' },
    scenes_id: { type: mongoose.Types.ObjectId, required: true, ref: 'Scene' },
    sceneVersionContent_id_array: {
        type: [mongoose.Types.ObjectId],
        required: false,
        ref: 'SceneVersions',
    },
    current_sceneVersionContent_id: {
        type: mongoose.Types.ObjectId,
        required: false,
    },
    time_stamp: { type: Date, default: Date.now },
});
export default mongoose.model('sceneVersions', sceneVersionSchema, 'sceneVersions');
