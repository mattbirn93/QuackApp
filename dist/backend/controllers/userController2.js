import User from '../models/userModel.js';
export const createUserSocket = async (data, callback) => {
    const { first_name, last_name, email, scripts_id_array } = data;
    try {
        const newUser = new User({
            first_name,
            last_name,
            email,
            scripts_id_array,
        });
        const savedUser = await newUser.save();
        callback(null, savedUser);
    }
    catch (error) {
        callback(error.message);
    }
};
