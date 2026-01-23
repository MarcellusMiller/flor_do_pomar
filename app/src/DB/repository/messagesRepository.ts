import { pool } from "../DBconn.js";
import listMessagesFilterDTO from "../../DTOS/listMessagesFilterDTO.js";
import { UUID } from "crypto";
class messagesRepository {
  // função deverá sempre receber um tipo filtro
  async list(filters: listMessagesFilterDTO) {
    const conditions: string[] = [];
    const values: any[] = [];

    // verificações de valores para os filtros
    // se o filtro não for vazio ele puxa o valor para o array de condições
    if (filters.isOpen !== undefined) {
      values.push(filters.isOpen);
      conditions.push(`is_open = $${values.length}`);
    }
    // se existir o tipo ele puxa para o array de condições
    if (filters.type) {
      values.push(filters.type);
      conditions.push(`type = $${values.length}`);
    }
    // se existir mais de uma condição a variavel recebe AND caso não fica vazio
    // esse where e concatenado a nossa query
    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    // ordem caso não seja passada e ascendente
    const order =
      filters.order === "desc" ? "DESC" : "ASC";
      // nossa query que vai ser feita no banco de dados
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
    // objeto que ira receber a resposta do db da nossa query com os valores
    const { rows } = await pool.query(query, values);
    return rows;
  }

  async findById(id: string) {

    const query =  `SELECT * FROM messages WHERE id = $1`;
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
}

export default new messagesRepository();
