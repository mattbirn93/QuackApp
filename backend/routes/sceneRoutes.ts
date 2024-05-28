import express from 'express';
import {
  fetchScenes,
  fetchScenesWithVersions,
  fetchScenesWithVersionContent,
} from '../controllers/sceneController.js';

const router = express.Router();

router.get('/', fetchScenes);
router.get('/sceneVersions', fetchScenesWithVersions);
router.get('/sceneVersionContent', fetchScenesWithVersionContent);

export default router;
