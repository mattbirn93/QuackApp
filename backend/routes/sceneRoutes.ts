import express from "express";
import {
  fetchScenes,
  fetchScenesWithVersions,
  fetchScenesWithVersionContent,
  createScene,
} from "../controllers/sceneController.js";
import {
  fetchScriptsFull,
  updateScriptContent,
  updateScriptCharacters,
  updateScriptTitlePage,
  createScript,
  fetchScriptsById,
} from "../controllers/scriptsFullController.js";

const router = express.Router();

router.get("/", fetchScenes);
router.get("/fetchScriptsFull", fetchScriptsFull);
router.put("/updateScriptsContent", updateScriptContent);
router.put("/updateScriptsCharacters", updateScriptCharacters);
router.put("/updateScriptTitlePage", updateScriptTitlePage);
router.get("/sceneVersions", fetchScenesWithVersions);
router.get("/fetchScriptsById", fetchScriptsById);
router.post("/createNewScript", createScript);
router.get("/sceneVersionContent", fetchScenesWithVersionContent);
router.post("/createSecene", createScene);

export default router;
