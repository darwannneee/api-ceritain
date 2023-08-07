import express from "express";
import { getJadwalPsikolog } from "../controllers/JadwalPsikolog.js"

const router = express.Router();

router.get('/api/JadwalPsikolog', getJadwalPsikolog);


export default router;