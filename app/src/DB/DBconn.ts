import pkg from "pg";
import dotenv from "dotenv";
import path from "path";
const { Pool } = pkg;
dotenv.config({
    path: path.resolve(process.cwd(), '.env')
});

export const pool = new Pool ({
    
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: String(process.env.DB_PASSWORD),
    database: process.env.DB_NAME,
});