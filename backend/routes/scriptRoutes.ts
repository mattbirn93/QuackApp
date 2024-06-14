
import express from 'express';
import {
  fetchScripts,
} from '../controllers/scriptController.js';

const router = express.Router();

router.get('/', fetchScripts);


export default router;
