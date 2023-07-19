import express from "express";
import cors from "cors"
import UserRouter from "./routes/User_Route.js"

const app = express();
app.use(cors());
app.use(express.json());
app.use(UserRouter);

app.listen(9000, () => console.log("Server Running and Up"))