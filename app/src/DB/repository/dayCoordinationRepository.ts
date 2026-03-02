import createMessageDTO from "../../DTOS/createMessageDTO.js";
import { pool } from "../DBconn.js";

class dayCoordinationRepository {
    async insertDayCoordinationMessage(message: createMessageDTO) {
        let rawDate = message.dateOfEvent || (message as any).date_of_event;
            let formattedDate: string | null = null;

            if (rawDate && typeof rawDate === 'string') {
                const isDotFormat = /^\d{2}\.\d{2}\.\d{4}$/.test(rawDate);
                const isIsoFormat = /^\d{4}-\d{2}-\d{2}$/.test(rawDate);

                if (isDotFormat) {
                    const [day, month, year] = rawDate.split('.');
                    formattedDate = `${year}-${month}-${day}`;
                } else if (isIsoFormat) {
                    formattedDate = rawDate;
                }
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