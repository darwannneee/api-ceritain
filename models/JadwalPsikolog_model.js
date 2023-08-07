import { Sequelize, DataTypes } from "sequelize";
import db from "../config/database.js";


const JadwalPsikolog = db.define('jadwalpsikolog', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_psikolog: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tanggal: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      jam: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      available: {
        type: DataTypes.BOOLEAN,
      },
}, {
    freezeTableName: true
})


export default JadwalPsikolog;