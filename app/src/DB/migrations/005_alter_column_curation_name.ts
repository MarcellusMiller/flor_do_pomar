import { pool } from "../DBconn.js";

export async function up() {
    await pool.query(`
        -- 1️⃣ Remove a constraint antiga PRIMEIRO
        ALTER TABLE messages
        DROP CONSTRAINT IF EXISTS messages_type_check;

        -- 2️⃣ Agora que não há restrição, atualiza os dados
        UPDATE messages
        SET type = 'weddingPlanning'
        WHERE type = 'curation';

        UPDATE messages
        SET type = 'decoration'
        WHERE type = 'planning';

        -- 3️⃣ Cria a nova constraint com os novos valores permitidos
        ALTER TABLE messages
        ADD CONSTRAINT messages_type_check 
        CHECK (type IN ('weddingPlanning', 'decoration'));
    `);
}

export async function down() {
    await pool.query(`
        -- 1️⃣ Remove a constraint nova
        ALTER TABLE messages
        DROP CONSTRAINT IF EXISTS messages_type_check;

        -- 2️⃣ Volta os dados para os termos antigos
        UPDATE messages
        SET type = 'curation'
        WHERE type = 'weddingPlanning';

        UPDATE messages
        SET type = 'planning'
        WHERE type = 'decoration';

        -- 3️⃣ Recria a constraint original
        ALTER TABLE messages
        ADD CONSTRAINT messages_type_check 
        CHECK (type IN ('curation', 'planning'));
    `);
}