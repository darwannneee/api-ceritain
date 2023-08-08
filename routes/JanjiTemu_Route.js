import express from "express";
import { getJanjiTemu, registerJanjiTemu, sendEmail } from "../controllers/JanjiTemu_Controller.js"

const router = express.Router();

router.get('/api/listJanjiTemu', getJanjiTemu);
router.post('/api/createJanjiTemu', registerJanjiTemu)
router.post('/api/sendEmail', sendEmail)


export default router;