import express from "express";
import { getJadwalDokter } from "../controllers/JadwalDokter_Controller.js"

const router = express.Router();

router.get('/api/JadwalDokter', getJadwalDokter);


export default router;