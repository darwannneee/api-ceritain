import express from "express"
import {getUser, getUserById, createUser, updateUser, deleteUser, login, register} from "../controllers/User_Controller.js"
import { uploadImage } from "../controllers/upload.js";
import multer from "multer";
const router = express.Router();
router.get('/user', getUser);
router.get('/user/:id', getUserById);
router.post('/user', createUser);
router.patch('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);
router.post("/login", login)

const upload = multer({
    limits: { fileSize: 10 * 1024 * 1024 }, // Set the maximum file size to 10 MB (adjust as needed)
  });
router.post("/register",upload.single('image'), register); // Menambahkan rute untuk registrasi


router.post('/api/upload', upload.single('image'), uploadImage);
export default router;