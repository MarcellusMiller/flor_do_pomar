import { pool } from "../DBconn.js";
import listMessagesFilterDTO from "../../DTOS/listMessagesFilterDTO.js";

class messagesRepository {
  async list(filters: listMessagesFilterDTO) {
    const conditions: string[] = [];
    const values: any[] = [];

    if (filters.isOpen !== undefined) {
      values.push(filters.isOpen);
      conditions.push(`is_open = $${values.length}`);
    }

    if (filters.type) {
      values.push(filters.type);
      conditions.push(`type = $${values.length}`);
    }

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const order =
      filters.order === "desc" ? "DESC" : "ASC";

    const query = `
      SELECT
        id,
        sender_name,
        type,
        is_open,
        created_at
      FROM messages
      ${whereClause}
      ORDER BY created_at ${order}
    `;

    const { rows } = await pool.query(query, values);
    return rows;
  }
}

export default messagesRepository;
