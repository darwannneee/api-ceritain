import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const JadwalPsikolog = db.define('jadwal_psikolog', {
    ID_Jadwal: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ID_Dokter: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Jam_Praktik: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      Hari: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Status: {
        type: DataTypes.ENUM('Tersedia', 'Penuh'),
        allowNull: false,
        defaultValue: 'Tersedia',
      },
}, {
    freezeTableName: true
})


export default JadwalPsikolog;