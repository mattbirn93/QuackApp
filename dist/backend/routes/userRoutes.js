// The routes define the endpoints and map them to the respective controller methods.
import { Router } from "express";
import { createUser, fetchUserById } from "../controllers/userController.js";
const router = Router();
router.post("/", createUser);
router.get("/fetchUserById", fetchUserById);
export default router;
