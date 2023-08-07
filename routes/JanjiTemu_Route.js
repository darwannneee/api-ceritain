import express from "express";
import { getJanjiTemu, registerJanjiTemu } from "../controllers/JanjiTemu_Controller.js"

const router = express.Router();

router.get('/api/listJanjiTemu', getJanjiTemu);
router.post('/api/createJanjiTemu', registerJanjiTemu)


export default router;