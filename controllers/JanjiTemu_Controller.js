import JanjiTemu from "../models/JanjiTemu_Model.js"
import transporter from "../config/email.js";

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
        status: "Menunggu"
      });
  
      res.status(201).json({ msg: "User Created!" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };

export const sendEmail = async (req, res) => {
    const { namaPsikolog, namaUser, emailUser, noTeleponUser, tanggalPesan, jamPesan  } = req.body;

      try {

        const info = await transporter.sendMail({
          from: '"Ceritain" <noreply@ceritain.xyz>',
          to: emailUser,
          subject: 'Your Purchase is Complete',
          html: `
              <html>
              <head>
                  <style>
                      body {
                          font-family: Arial, sans-serif;
                          background-color: #f5f5f5;
                      }
                      .container {
                          max-width: 600px;
                          margin: 0 auto;
                          padding: 20px;
                          background-color: #ffffff;
                          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                      }
                      .header {
                          background-color: #007bff;
                          color: #ffffff;
                          padding: 10px;
                          text-align: center;
                      }
                      .content {
                          padding: 20px;
                      }
                      .footer {
                          background-color: #f0f0f0;
                          padding: 10px;
                          text-align: center;
                      }
                  </style>
              </head>
              <body>
                  <div class="container">
                      <div class="header">
                          <h2>Congratulations, ${namaUser}!</h2>
                      </div>
                      <div class="content">
                          <p>Pembelian kamu di Ceritain telah berhasil.</p>
                          <h3>Details Pesanan:</h3>
                          <ul>
                              <li><strong>Nama Psikolog:</strong> ${namaPsikolog}</li>
                              <li><strong>Price:</strong> Rp. 150,000</li>
                              <li><strong>Date:</strong> ${tanggalPesan}</li>
                              <li><strong>Time:</strong> ${jamPesan}</li>
                              <li><strong>NoTelepon:</strong> ${noTeleponUser}</li>
                          </ul>
                          <p>Terimakasih telah Booking di Ceritain, jangan lupa untuk datang tepat Waktu!</p>
                      </div>
                      <div class="footer">
                          <p>Jika ada pertanyaan, Tolong kontak kami di noreply@ceritain.xyz</p>
                      </div>
                  </div>
              </body>
              </html>
          `,
      });      

        console.log("Message sent: %s", info.messageId);
        // Kirim respons sukses ke klien
        res.status(200).send("Email sent successfully!");
      } catch {
        console.error("Error sending email:");
        res.status(500).send("An error occurred while sending the email.");
      }
        
  };

  export const setStatus = async (req, res) => {
    const { idJanjiTemu, status  } = req.body; // Assuming you have the id of the appointment
    
    try {
        let updatedStatus;

        if (status == 'Menunggu') {
            updatedStatus = 'Dikonfirmasi';
        } else if (status == 'Dikonfirmasi') {
            updatedStatus = 'Selesai';
        } else {
            // Handle other status values
            return res.status(400).json({ message: 'Invalid status value' });
        }

    // Menggunakan Sequelize untuk melakukan update status
    const updatedAppointment = await JanjiTemu.update(
        { status: updatedStatus },
        { where: { id: idJanjiTemu } }
    );

    if (updatedAppointment[0] === 0) {
        return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Status updated successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

