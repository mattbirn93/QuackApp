import mongoose, { Schema } from 'mongoose';
const sceneSchema = new Schema({
    scripts_id: { type: mongoose.Types.ObjectId, required: true, ref: 'Script' },
    sceneVersions_id_array: {
        type: [mongoose.Types.ObjectId],
        required: true,
        ref: 'Scene',
    },
});
export default mongoose.model('scenes', sceneSchema, 'scenes');
