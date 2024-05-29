// The service layer handles the business logic, such as creating and fetching users. This helps keep the controller lean and focused on handling HTTP requests and responses.

import User, { IUser } from "../models/userModel.js";

class UserService {
  async createUser(userData: Partial<IUser>): Promise<IUser> {
    const newUser = new User(userData);
    return await newUser.save();
  }

  async getUserById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }
}

export default new UserService();
