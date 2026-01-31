import { pool } from "../DBconn.js";
import adminAccount from "../../DTOS/admin/adminAccountDTO.js";

class adminLoginRepository {
    async InsertAdminAccount(account: adminAccount) {
  
        const query = `
                INSERT INTO admin(email, password) VALUES ($1, $2) RETURNING *; `;

        const values = [
            account.email,
            account.password
        ]

        const {rows} = await pool.query(query, values);
        return rows[0];
        

    }

    async findByEmail(email: string){
        const query = `SELECT * FROM admin WHERE email = $1`
        const value = [
            email
        ]
        const {rows} = await pool.query(query, value);
        return rows[0];
    }
      
}

export default new adminLoginRepository()