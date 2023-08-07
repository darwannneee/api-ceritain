import JadwalPsikolog from "../models/JadwalPsikolog_model.js"

export const getJadwalPsikolog = async(req, res) => {
    try{
        const response = await JadwalPsikolog.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const updateJadwalPsikolog = async (req, res) => {
    const { idJadwal } = req.body;
  
    try {
      // Find the existing JadwalPsikolog entry by its ID
      const jadwalPsikolog = await JadwalPsikolog.findOne({
        where: {
          id: idJadwal,
        },
      });;
  
      if (!jadwalPsikolog) {
        return res.status(404).json({ msg: "JadwalPsikolog not found" });
      }
  
      // Update the JadwalPsikolog properties with the new values

      jadwalPsikolog.available = false;
  
      // Save the updated JadwalPsikolog
      await jadwalPsikolog.save();
  
      res.status(200).json({ msg: "JadwalPsikolog updated successfully" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };
  