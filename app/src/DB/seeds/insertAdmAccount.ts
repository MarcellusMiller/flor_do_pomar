import cryptPassword from "../../services/utils/cryptPassword.js";
import { pool } from "../DBconn.js";

async function createAdminSeed() {
    const email = "admin@admin.com";
    const password = "admin123";

    const hashedPassword = await cryptPassword.hash(password)
    await pool.query(`
            INSERT INTO admin (email, password)
            VALUES ($1, $2)
            ON CONFLICT (email) DO NOTHING
        `, [email, hashedPassword]
    );
    console.log("admin seed criada com sucesso");
    process.exit(0);
}

createAdminSeed().catch(err => {
    console.error("erro ao criar seed admin");
    process.exit(1)
})