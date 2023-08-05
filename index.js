import express from "express";
import cors from "cors"
import UserRouter from "./routes/User_Route.js";
import DokterRouter from "./routes/Dokter_Route.js";
import JadwalDokter from "./routes/JadwalDokter_Route.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(UserRouter);
app.use(DokterRouter);
app.use(JadwalDokter);

app.listen(9000, () => console.log("Server Running and Up"))