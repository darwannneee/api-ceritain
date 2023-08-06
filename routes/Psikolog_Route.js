import express from "express";
import { getPsikolog, loginPsikolog, registerPsikologi } from "../controllers/Psikolog.js"
import multer from "multer";
const router = express.Router();

router.get('/api/listPsikolog', getPsikolog);

//Multer 
const upload = multer({
    limits: { fileSize: 10 * 1024 * 1024 }, // Set the maximum file size to 10 MB (adjust as needed)
  });

router.post('/api/psikolog/createPsikolog', upload.single('image'), registerPsikologi);
router.post('/api/psikolog/loginPsikolog', loginPsikolog);


export default router;