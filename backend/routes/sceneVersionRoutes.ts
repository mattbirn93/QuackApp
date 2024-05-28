import express from 'express';
import {
  fetchSceneVersions,
  createSceneVersion,
} from '../controllers/sceneVersionController.js';

const router = express.Router();

router.get('/', fetchSceneVersions);
router.post('/', createSceneVersion);

export default router;
