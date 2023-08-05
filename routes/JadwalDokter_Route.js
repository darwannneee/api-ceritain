import express from "express";
import { getJadwalPsikolog } from "../controllers/JadwalPsikolog.js"

const router = express.Router();

router.get('/api/JadwalDokter', getJadwalPsikolog);


export default router;