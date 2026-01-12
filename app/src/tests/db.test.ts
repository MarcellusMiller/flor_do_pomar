import { pool } from "../DB/DBconn.js";

async function testDatabase() {
  try {
    await pool.query("SELECT 1");
    console.log("✅ Conexão com Postgres OK");
  } catch (err) {
    console.error("❌ Erro no Postgres", err);
  } finally {
    await pool.end();
  }
}

testDatabase();
