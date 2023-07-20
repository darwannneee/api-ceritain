import { Sequelize } from "sequelize";
import mysql2 from "mysql2"

const db = new Sequelize('ceritain', 'Ceritain', 'LombaDb@3', {
    host: 'ceritain.mysql.database.azure.com',
    dialect: "mysql", 
    define: {
        timestamps: false,
        dialectModule: mysql2, // Needed to fix sequelize issues with WebPack
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
})

export default db;