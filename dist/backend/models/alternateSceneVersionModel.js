import mongoose, { Schema } from 'mongoose';
const versionSchema = new Schema({
    content: { type: [Schema.Types.Mixed], required: false },
});
const sceneVersionSchema = new Schema({
    current_version: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Version',
    },
    versions_array: { type: [versionSchema], required: false },
});
const sceneSchema = new Schema({
    script_id: { type: String, required: false, ref: 'Script' },
    scene_array: { type: [sceneVersionSchema], required: false },
    time_stamp: { type: Date, default: Date.now },
});
// Specify the collection name explicitly
export default mongoose.model('AltScript', sceneSchema, 'AltScript');
