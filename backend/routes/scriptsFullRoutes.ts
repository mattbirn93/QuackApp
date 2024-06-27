import express from "express";
import { fetchScriptsFull } from "../controllers/scriptsFullController.js";

const router = express.Router();

router.get("/", fetchScriptsFull);

export default router;
