"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _dotenv = require("dotenv");
const _path = require("path");
const _typeorm = require("typeorm");
(0, _dotenv.config)({
    path: (0, _path.resolve)(__dirname, '../../.env')
});
async function createDatabase() {
    try {
        // Replace with your database configuration
        const connection = await (0, _typeorm.createConnection)({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: 5432,
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: 'postgres',
            synchronize: true
        });
        const database = process.env.DB_NAME;
        await connection.query(`CREATE DATABASE "${database}";`);
        console.log(`Database "${database}" created successfully.`);
        await connection.close();
    } catch (error) {
        console.error('Error creating database:', error.message);
    }
}
createDatabase();
