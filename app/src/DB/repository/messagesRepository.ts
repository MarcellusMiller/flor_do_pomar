import { pool } from "../DBconn.js";
import listMessagesFilterDTO from "../../DTOS/listMessagesFilterDTO.js";
class messagesRepository {
  // função deverá sempre receber um tipo filtro
  async list(filters: listMessagesFilterDTO, limit: number, offset: number) {
    const conditions: string[] = [];
    const values: any[] = [];

    // 1. Construção dinâmica dos filtros
    if (filters.isOpen !== undefined) {
      values.push(filters.isOpen);
      conditions.push(`is_open = $${values.length}`);
    }
    if (filters.type) {
      values.push(filters.type);
      conditions.push(`type = $${values.length}`);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
    const order = filters.order === "desc" ? "DESC" : "ASC";

    // 2. Query para contar o total (importante para o frontend saber o limite)
    // Usamos os mesmos 'values' e 'whereClause' para que o total respeite os filtros
    const countQuery = `SELECT COUNT(*) as total FROM messages ${whereClause}`;
    const countRes = await pool.query(countQuery, values);
    const totalItems = parseInt(countRes.rows[0].total);

    // 3. Query para buscar os dados com LIMIT e OFFSET
    // Adicionamos limit e offset ao final do array de valores para evitar SQL Injection
    const dataValues = [...values, limit, offset];
    const limitParam = `$${values.length + 1}`;
    const offsetParam = `$${values.length + 2}`;

    const dataQuery = `
      SELECT
        id, sender_name, type, is_open, created_at,
        phone, email, local_event, message, date_of_event
      FROM messages
      ${whereClause}
      ORDER BY created_at ${order}
      LIMIT ${limitParam}
      OFFSET ${offsetParam}
    `;

    const dataRes = await pool.query(dataQuery, dataValues);

    // 4. Retornamos um objeto contendo ambos
    return {
      rows: dataRes.rows,
      total: totalItems
    };
  }

  async findById(id: string) {

    const query =  `
      SELECT 
        id,
        sender_name,
        email,
        phone,
        message,
        type,
        local_event,
        type_of_event,
        is_open,
        created_at,
        image_path,
        TO_CHAR(date_of_event, 'YYYY-MM-DD') as date_of_event
      FROM messages 
      WHERE id = $1`;
    const value = [id];

    const {rows} = await pool.query(query, value);
    return rows[0] ?? null;
  }
    
  async markAsOpen(id: string) {
    const query = `UPDATE messages SET is_open = true WHERE id = $1`;
    const value = [id];

    const {rows} = await pool.query(query, value);
    return rows
  }

  async deleteMessage(id: string) {
    const query = `DELETE FROM messages WHERE id = $1 RETURNING id, sender_name, type, is_open, created_at`;
    const value = [id];

    const {rows} = await pool.query(query, value);
    return rows[0] ?? null;
  }

  async findImageByMessageId(id: string) {
    const query = `SELECT image_path FROM messages WHERE id = $1`;
    const value = [id];
    const {rows} = await pool.query(query, value);
    return rows[0] ? rows[0].image_path : null;
  }
}

export default new messagesRepository();
