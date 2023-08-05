import JadwalDokter from "../models/JadwalDokter_model.js"
import bcryptjs from "bcryptjs";

export const getJadwalDokter = async(req, res) => {
    try{
        const response = await JadwalDokter.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}