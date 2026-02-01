import jwt  from "jsonwebtoken";
import adminAccount from "../../DTOS/admin/adminAccountDTO.js";
import dotenv from "dotenv"

dotenv.config();


class JwtService {
    createToken(payload: adminAccount) {
        return jwt.sign(
            {
                id: payload.id,
                email: payload.email,
            },
            process.env.JWT_SECRET || "chave_secreta_padrao",
            { expiresIn: "1d" }
        );
    }
    validateToken(token: string) {
       try {
           return jwt.verify(token, process.env.JWT_SECRET || "chave_secreta_padrao");
       } catch (error) {
           return null;
       }
    
    }
}

export default new JwtService();