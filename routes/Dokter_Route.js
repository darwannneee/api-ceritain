import express from "express";
import { getDokter } from "../controllers/Dokter_Controller.js"

const router = express.Router();

router.get('/api/listDokter', getDokter);



export default router;