import nodemailer from "nodemailer";

// Di sini Anda dapat menambahkan logika untuk mengolah email yang dikirimkan melalui form
const transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'noreply@ceritain.xyz',
      pass: 'CeritainEmail@3'
    }
  });

export default transporter;