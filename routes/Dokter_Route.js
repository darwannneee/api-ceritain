import express from "express";
import { getPsikolog } from "../controllers/Psikolog.js"

const router = express.Router();

router.get('/api/listPsikolog', getPsikolog);



export default router;