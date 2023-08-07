import JadwalPsikolog from "../models/JadwalPsikolog_model.js"

export const getJadwalPsikolog = async(req, res) => {
    try{
        const response = await JadwalPsikolog.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}