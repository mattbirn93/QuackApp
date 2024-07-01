import express from 'express';
import { fetchSceneVersionContent } from '../controllers/sceneVersionContentController.js';
const router = express.Router();
router.get('/', fetchSceneVersionContent);
export default router;
