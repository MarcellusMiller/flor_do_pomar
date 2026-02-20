import createMessageDTO from "../../DTOS/createMessageDTO.js";
import { pool } from "../DBconn.js";

class dayCoordinationRepository {
    async insertDayCoordinationMessage(message: createMessageDTO) {
        let formattedDate = message.dateOfEvent || (message as any).date_of_event;
        if (typeof formattedDate === 'string' && formattedDate.includes('.')) {
            const [day, month, year] = formattedDate.split('.');
            formattedDate = `${year}-${month}-${day}`;
        }

        const query = `INSERT INTO messages (type, sender_name, email, phone, message, local_event, type_of_event,date_of_event, image_path) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;`;
        const values = [
            message.type,
            message.senderName,
            message.email,
            message.phone,
            message.message,
            message.localEvent || null,
            message.type_of_event,
            formattedDate || null,
            message.image || null
        ];
        const result = await pool.query(query, values);
        return result.rows[0];
        
    }

}

export default new dayCoordinationRepository();