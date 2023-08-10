import express from "express";
import { getJanjiTemu, registerJanjiTemu, sendEmail, setStatus } from "../controllers/JanjiTemu_Controller.js"

const router = express.Router();

router.get('/api/listJanjiTemu', getJanjiTemu);
router.post('/api/createJanjiTemu', registerJanjiTemu)
router.post('/api/sendEmail', sendEmail)
router.put('/api/JanjiTemu/setStatus', setStatus);


export default router;