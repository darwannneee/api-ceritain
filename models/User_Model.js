import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const User = db.define('user', {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama_user: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    imageurl:DataTypes.STRING,
}, {
    freezeTableName: true
})


export default User;