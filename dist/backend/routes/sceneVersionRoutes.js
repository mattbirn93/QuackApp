import express from 'express';
import { fetchSceneVersions, createSceneVersion, updateCurrentSceneVersionContent } from '../controllers/sceneVersionController.js';
const router = express.Router();
router.get('/', fetchSceneVersions);
router.post('/', createSceneVersion);
router.put('/updateCurrentVersion', updateCurrentSceneVersionContent);
export default router;
