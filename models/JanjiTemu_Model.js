import { Sequelize, DataTypes } from "sequelize";
import db from "../config/database.js";


const JanjiTemu = db.define('janjitemu', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_psikolog: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nama_user: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email_user: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      noTelepon_user: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id_jadwal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tanggalPesan: {
        type: DataTypes.DATE,
      },
      jamPesan: {
        type: DataTypes.TIME,
      },
      status: {
        type: DataTypes.STRING,
      },
}, {
    freezeTableName: true
})


export default JanjiTemu;