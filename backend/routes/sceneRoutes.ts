import express from 'express';
import {
  fetchScenes,
  fetchScenesWithVersions,
  fetchScenesWithVersionContent,
  createScene
} from '../controllers/sceneController.js';

const router = express.Router();

router.get('/', fetchScenes);
router.get('/sceneVersions', fetchScenesWithVersions);
router.get('/sceneVersionContent', fetchScenesWithVersionContent);
router.post('/createSecene', createScene)

export default router;