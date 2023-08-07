import JanjiTemu from "../models/JanjiTemu_Model.js"

export const getJanjiTemu = async(req, res) => {
    try{
        const response = await JanjiTemu.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const registerJanjiTemu = async (req, res) => {
    const { idPsikolog, idUser, namaUser, emailUser, noTeleponUser, idJadwal, tanggalPesan, jamPesan  } = req.body;
  
    try {
      
      // Create RegisterJanjiTemu
      await JanjiTemu.create({
        id_psikolog: idPsikolog,
        id_user: idUser,
        nama_user: namaUser,
        email_user: emailUser,
        noTelepon_user: noTeleponUser,
        id_jadwal: idJadwal, 
        tanggalPesan: tanggalPesan,
        jamPesan: jamPesan,
        status: "Dikonfirmasi"
      });
  
      res.status(201).json({ msg: "User Created!" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };