import JadwalDokter from "../models/JadwalPsikolog_model.js"

export const getJadwalPsikolog = async(req, res) => {
    try{
        const response = await JadwalDokter.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}