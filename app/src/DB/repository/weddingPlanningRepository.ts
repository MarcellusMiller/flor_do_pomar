import { pool } from "../DBconn.js";
import createMessageDTO from "../../DTOS/createMessageDTO.js";
class planningRepository {
    async InsertWeddingPlanningMessage(message: createMessageDTO) {
        try {
            // query para inserir a mensagem de planejamento no banco de dados
            
            // Converte data de 'dd.mm.yyyy' para 'yyyy-mm-dd' se necessário
            let formattedDate = message.dateOfEvent || (message as any).date_of_event;
            if (typeof formattedDate === 'string' && (formattedDate as string).includes('.')) {
                const [day, month, year] = (formattedDate as string).split('.');
                formattedDate = `${year}-${month}-${day}` as any;
            }

            const query = `INSERT INTO messages (type, sender_name, email, phone, message, type_of_event, date_of_event,image_path, local_event) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *; `;
            const values = [
                message.type,           // $1 type
                message.senderName,     // $2 sender_name
                message.email,          // $3 email
                message.phone,          // $4 phone
                message.message,        // $5 message
                message.type_of_event,  // $6 type_of_event
                formattedDate,          // $7 date_of_event
                message.image,          // $8 image_path ← era localEvent
                message.localEvent      // $9 local_event ← era image
            ]
            const { rows} = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            throw new Error(`Error inserting Wedding planning message: ${error}`);
        }
    }
}

export default planningRepository;