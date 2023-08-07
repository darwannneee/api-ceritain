import express from "express";
import { getJadwalPsikolog, updateJadwalPsikolog } from "../controllers/JadwalPsikolog_Controller.js"

const router = express.Router();

router.get('/api/JadwalPsikolog', getJadwalPsikolog);
router.put('/api/updateJadwalPsikolog', updateJadwalPsikolog);

export default router;