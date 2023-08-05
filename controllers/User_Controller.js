import User from "../models/User_Model.js";
import bcryptjs from "bcryptjs";
import { BlobServiceClient } from "@azure/storage-blob";

const AZURE_STORAGE_CONNECTION_STRING = 'DefaultEndpointsProtocol=https;AccountName=ceritainimage;AccountKey=CV/na++9tNjMIaYJJloWSu1wukIINImEBi6nJuxQMB2pruHivDchtR40MkIvB1o5t8ZSO757QraN+AStGvm5EQ==;EndpointSuffix=core.windows.net';
const AZURE_CONTAINER_NAME = 'dokterimage';

export const getUser = async(req, res) => {
    try{
        const response = await User.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getUserById = async(req, res) => {
    try{
        const response = await User.findOne({
            where:{
                id_user: req.params.id
            }
        });
        res.status(200).json(response);
    } catch(error) {
        console.log(error.message);
    }
}

export const createUser = async(req, res) => {
    try{
        await User.create(req.body);
        res.status(201).json({msg: "User Created!"});
    } catch(error) {
        console.log(error.message);
    }
}

export const updateUser = async(req, res) => {
    try{
        await User.update(req.body, {
            where:{
                id_user: req.params.id
            }
        });
        res.status(200).json({msg: "User Updated!"});
    } catch(error) {
        console.log(error.message);
    }
}


export const deleteUser = async(req, res) => {
    try{
        await User.destroy({
            where:{
                id_user: req.params.id
            }
        });
        res.status(200).json({msg: "User Delete!"});
    } catch(error) {
        console.log(error.message);
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ where: { username } });
      if (user) {
        bcryptjs.compare(password, user.password, (err, result) => {
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


  export const register = async (req, res) => {
    const { name, username, password, image } = req.body;
  
    try {
      
    // Cek apakah username sudah ada dalam database
    const existingUser = await User.findOne({ where: {username} });

    if (existingUser) {
      // Jika username sudah ada, berikan respons bahwa username tidak tersedia
      return res.status(409).json({ msg: 'Username is already taken' });
    }
    
      // Generate salt for hashing
      const salt = await bcryptjs.genSalt(10);
      // Hash the password
      const hashedPassword = await bcryptjs.hash(password, salt);

      let imageUrl = null;

      if (image) {
        // Upload the image to Azure Blob Storage
        const blobServiceClient = BlobServiceClient.fromConnectionString(
        AZURE_STORAGE_CONNECTION_STRING
      );
      const containerClient = blobServiceClient.getContainerClient(AZURE_CONTAINER_NAME);

      const imageBuffer = Buffer.from(image, 'base64');
      const imageName = `profile ${username}` + '.png'; // Generate a random filename
      const blockBlobClient = containerClient.getBlockBlobClient(imageName);
      await blockBlobClient.uploadData(imageBuffer);

      imageUrl = blockBlobClient.url;
    }
      // Create user with hashed password
      await User.create({
        nama_user: name,
        username: username,
        password: hashedPassword,
        imageUrl: imageUrl,
      });
  
      res.status(201).json({ msg: "User Created!" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };