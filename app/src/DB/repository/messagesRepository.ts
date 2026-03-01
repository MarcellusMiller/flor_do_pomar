import { pool } from "../DBconn.js";
import listMessagesFilterDTO from "../../DTOS/listMessagesFilterDTO.js";
import createMessageDTO from "../../DTOS/createMessageDTO.js";
class messagesRepository {
  // função deverá sempre receber um tipo filtro
  async list(filters: listMessagesFilterDTO, limit: number, offset: number) {
    const conditions: string[] = [];
    const values: any[] = [];

    // 1. Construção dinâmica dos filtros
    if (filters.status) {
      values.push(filters.status);
      conditions.push(`status = $${values.length}`);
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
        id, sender_name, type, status, created_at,
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
        status,
        created_at,
        image_path,
        TO_CHAR(date_of_event, 'YYYY-MM-DD') as date_of_event
      FROM messages 
      WHERE id = $1`;
    const value = [id];

    const {rows} = await pool.query(query, value);
    return rows[0] ?? null;
  }
    
  async updateStatus(id: string, status: 'new' | 'viewed' | 'responded') {
    const query = `UPDATE messages SET status = $1 WHERE id = $2 RETURNING status`;
    const { rows } = await pool.query(query, [status, id]);
    return rows[0];
  }

  async deleteMessage(id: string) {
    const query = `DELETE FROM messages WHERE id = $1 RETURNING id, sender_name, type, created_at`;
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

   async InsertOtherMessage(message: createMessageDTO) {
        try {
            // query para inserir a mensagem de decoração no banco de dados
            
            // Converte data de 'dd.mm.yyyy' para 'yyyy-mm-dd' se necessário
            let formattedDate = message.dateOfEvent || (message as any).date_of_event;
            if (typeof formattedDate === 'string' && (formattedDate as string).includes('.')) {
                const [day, month, year] = (formattedDate as string).split('.');
                formattedDate = `${year}-${month}-${day}` as any;
            }

            const query = `INSERT INTO messages (type, sender_name, email, phone, message, local_event, type_of_event, date_of_event, image_path) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *; `;
            // valores a serem inseridos, para alterar um adicione também DTO campos e também a query e a migration
            const values = [
                message.type,
                message.senderName,
                message.email,
                message.phone,
                message.message,
                message.localEvent,
                message.type_of_event,
                formattedDate,
                message.image,

            ]
            // execução da query
            const {rows} = await pool.query(query, values);
            return rows[0];
            // retorna a mensagem salva

            // tratagem de erros
        }  catch (error) {
            console.log(error)
            throw new Error(`Error inserting decoration message: ${error}`);
        }
        
    }

    async getMessagesStats() {
        try {
            const { rows } = await pool.query(`
                SELECT 
                  COUNT(*) FILTER (WHERE status = 'new') as new,
                  COUNT(*) FILTER (WHERE status = 'viewed') as viewed,
                  COUNT(*) FILTER (WHERE status = 'responded') as responded
                FROM messages
            `);
            return rows[0];
        } catch(error) {
            throw new Error(`Error search total messages ${error}`);
        }
    }
    
}

export default new messagesRepository();
