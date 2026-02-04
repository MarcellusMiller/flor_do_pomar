import { pool }from "../DBconn.js";
import createMessageDTO from "../../DTOS/createMessageDTO.js";

class decorationRepository  {
    async InsertdecorationMessage(message: createMessageDTO) {
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
            console.log(error)
            throw new Error(`Error inserting decoration message: ${error}`);
        }
        
    }
}

export default decorationRepository;