import { pool } from "../DBconn.js";
import createMessageDTO from "../../DTOS/createMessageDTO.js";
class planningRepository {
    async InsertWeddingPlanningMessage(message: createMessageDTO) {
        try {
            // query para inserir a mensagem de planejamento no banco de dados
            const query = `INSERT INTO messages (type, sender_name, email, phone, message, type_of_event, image_path) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *; `;
            const values = [
                message.type,
                message.senderName,
                message.email,
                message.phone,
                message.message,
                message.type_of_event,
                message.image
            ]
            const { rows} = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            throw new Error(`Error inserting Weddingplanning message: ${error}`);
        }
    }
}

export default planningRepository;