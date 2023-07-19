import express from "express"
import {getUser, getUserById, createUser, updateUser, deleteUser, login, register} from "../controllers/User_Controller.js"

const router = express.Router();
router.get('/user', getUser);
router.get('/user/:id', getUserById);
router.post('/user', createUser);
router.patch('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);
router.post("/login", login)
router.post("/register", register); // Menambahkan rute untuk registrasi

export default router;