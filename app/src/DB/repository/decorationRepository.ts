import { pool }from "../DBconn.js";
import createMessageDTO from "../../DTOS/createMessageDTO.js";

class decorationRepository  {
    async InsertdecorationMessage(message: createMessageDTO) {
        try {
            // query para inserir a mensagem de decoração no banco de dados
            const query = `INSERT INTO messages (type, sender_name, email, phone, message, local_event, type_of_event, image_path) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *; `;
            // valores a serem inseridos, para alterar um adicione também DTO campos e também a query e a migration
            const values = [
                message.type,
                message.senderName,
                message.email,
                message.phone,
                message.message,
                message.localEvent,                
                message.type_of_event,
                message.image

                // removido caso queira adicionar novamente descomente e adicione a query
                // message.dateOfEvent,
            ]
            // execução da query
            const {rows} = await pool.query(query, values);
            return rows[0];
            // retorna a mensagem salva

            // tratagem de erros
        }  catch (error) {
            throw new Error(`Error inserting decoration message: ${error}`);
        }
        
    }
}

export default decorationRepository;