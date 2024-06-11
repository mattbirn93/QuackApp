import express from 'express';
import {
  fetchScenes,
  fetchScenesWithVersions,
  fetchScenesWithVersionContent,
  createScene
} from '../controllers/sceneController.js';
import { fetchScriptsFull } from '../controllers/scriptsFullController.js'
const router = express.Router();

router.get('/', fetchScenes);
router.get('/sceneVersions', fetchScenesWithVersions);
router.get('/sceneVersionContent', fetchScenesWithVersionContent);
router.post('/createSecene', createScene)
router.get('/fetchFull', fetchScriptsFull);

export default router;