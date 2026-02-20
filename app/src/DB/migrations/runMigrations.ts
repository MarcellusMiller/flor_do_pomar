import fs from "fs";
import path from "path";
import { pool } from "../DBconn.js";

const migrationPath = path.join(process.cwd(), "dist", "DB", "migrations");

async function ensureMigrationsTable() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS migrations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL UNIQUE,
            executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP) 
        `);
}

async function getExecutedMigrations() {
    const result = await pool.query("SELECT name FROM migrations");
    return result.rows.map(rows => rows.name);
}

async function runMigrations() {
    try {
        console.log("Starting migrations...");

        await ensureMigrationsTable();

        const executedMigrations = await getExecutedMigrations();

        const files = fs
            .readdirSync(migrationPath)
            .filter(file => file.endsWith(".js") && file !== "runMigrations.js")
            .sort();
        for (const file of files) {
            if(executedMigrations.includes(file)) {
                console.log(`skipping already executed migration: ${file}`);
                continue;
            }

            console.log(`Running migration: ${file}`);
            const migration = await import(`file://${migrationPath}/${file}`);

            await migration.up();

            await pool.query("INSERT INTO migrations (name) VALUES ($1)"
                , [file]
            );
            console.log(`Migration ${file} executed successfully`);
        
        }

    } catch (error) {
        console.error("Error running migrations:", error);
        process.exit(1);
    }
}

runMigrations();