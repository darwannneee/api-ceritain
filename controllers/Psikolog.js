import Dokter from "../models/Psikolog_Model.js"
import bcryptjs from "bcryptjs";

export const getPsikolog = async(req, res) => {
    try{
        const response = await Dokter.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}