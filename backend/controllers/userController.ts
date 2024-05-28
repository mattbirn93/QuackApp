import { Request, Response } from 'express';
import User from '../models/userModel.js';

export const createUser = async (req: Request, res: Response) => {
  const { first_name, last_name, email, scripts_id_array } = req.body;

  try {
    const newUser = new User({
      first_name,
      last_name,
      email,
      scripts_id_array,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
