import User from "../models/User_Model.js";
import bcryptjs from "bcryptjs";

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
    const { name, username, password } = req.body;
  
    try {
      
    // Cek apakah username sudah ada dalam database
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      // Jika username sudah ada, berikan respons bahwa username tidak tersedia
      return res.status(409).json({ msg: 'Username is already taken' });
    }
    
      // Generate salt for hashing
      const salt = await bcryptjs.genSalt(10);
      // Hash the password
      const hashedPassword = await bcryptjs.hash(password, salt);
  
      // Create user with hashed password
      await User.create({
        nama_user: name,
        username: username,
        password: hashedPassword,
      });
  
      res.status(201).json({ msg: "User Created!" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };