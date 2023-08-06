import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Psikolog = db.define('psikolog', {
    id_psikolog: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama_psikolog: DataTypes.STRING,
    username_psikolog: DataTypes.STRING,
    password_psikolog: DataTypes.STRING,
    spesialisasi: DataTypes.STRING,
    deskripsi: DataTypes.STRING,
    notelepon: DataTypes.STRING,
    kota: DataTypes.STRING,
    imageurl: DataTypes.STRING,
    status: DataTypes.STRING
}, {
    freezeTableName: true
})


export default Psikolog;