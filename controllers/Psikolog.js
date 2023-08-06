import Psikolog from "../models/Psikolog_Model.js"
import bcryptjs from "bcryptjs";

import {AZURE_CONTAINER_NAME, AZURE_STORAGE_CONNECTION_STRING} from "../config/storage.js";
import { BlobServiceClient } from "@azure/storage-blob";

const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(AZURE_CONTAINER_NAME);


// Get Data Semua Psikolog
export const getPsikolog = async(req, res) => {
    try{
        const response = await Psikolog.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const loginPsikolog = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Psikolog.findOne({ where: { username_psikolog: username } });
    if (user) {
      bcryptjs.compare(password, user.password_psikolog, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: "Internal Server Error" });
          return;
        }
        if (result) {
          res.status(200).json({ message: "Login successful" });
        } else {
          res.status(401).json({ message: "Login failed" });
        }
      });
    } else {
      res.status(401).json({ message: "Login failed" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Register Psikolog
export const registerPsikologi = async (req, res) => {
    const { name, username, password, spesialisasi, deskripsi, nomerTelepon, kota } = req.body;
  
    try {
    // Cek apakah username sudah ada dalam database
    const existingUser = await Psikolog.findOne({ where: { username_psikolog: username } });

    if (existingUser) {
      // Jika username sudah ada, berikan respons bahwa username tidak tersedia
      return res.status(409).json({ msg: 'Username is already taken' });
    }
    
      // Generate salt for hashing
      const salt = await bcryptjs.genSalt(10);
      // Hash the password
      const hashedPassword = await bcryptjs.hash(password, salt);

      let imageUrl = null;

    // Cek Jika udah Upload Poto apa belom
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload a photo.' });
    }

      // Upload Photo ke Blob Azure
      const blobName = `${Date.now()}-${req.file.originalname}`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      await blockBlobClient.uploadData(req.file.buffer, req.file.buffer.length);


      imageUrl = blockBlobClient.url;

      // Bikin User dengan Hashed Password
      await Psikolog.create({
        nama_psikolog: name,
        username_psikolog: username,
        password_psikolog: hashedPassword,
        spesialisasi: spesialisasi,
        deskripsi: deskripsi,
        notelepon: nomerTelepon,
        kota: kota,
        imageurl: imageUrl
      });
  
      res.status(201).json({ msg: "User Created!" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };

