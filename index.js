import express from "express";
import cors from "cors"
import UserRouter from "./routes/User_Route.js";
import PsikologRoute from "./routes/Psikolog_Route.js";
import JadwalPsikolog from "./routes/JadwalPsikolog_Route.js";
import JanjiTemu from "./routes/JanjiTemu_Route.js";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(express.json());
app.use(UserRouter);
app.use(PsikologRoute);
app.use(JadwalPsikolog);
app.use(JanjiTemu);
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.listen(9000, () => console.log("Server Running and Up"))