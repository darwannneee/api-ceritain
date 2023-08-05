import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const User = db.define('psikolog', {
    ID_Dokter: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nama_Dokter: DataTypes.STRING,
    Spesialisasi: DataTypes.STRING,
    Deskripsi: DataTypes.STRING,
    Nomor_Telepon: DataTypes.STRING,
    Alamat: DataTypes.STRING
}, {
    freezeTableName: true
})


export default User;