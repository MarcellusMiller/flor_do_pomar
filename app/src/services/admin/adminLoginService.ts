import jwt from "jsonwebtoken";
import adminLoginRepository from "../../DB/repository/adminLoginRepository.js";
import cryptPassword from "../utils/cryptPassword.js";

class AdminLoginService {
    async login(email: string, password: string) {
        const admin = await adminLoginRepository.findByEmail(email);

        if(!admin) {
            throw new Error("Credenciais invalidas");
        }
        const passwordMatch = await cryptPassword.compare(password, admin.password)

        if(!passwordMatch) {
            throw new Error("Credencias invalidas");
        }
        const token = jwt.sign(
            {
                id: admin.id,
                email: admin.email,
                // role: admin
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: "1d"
            }
        );
        return {
            token,
            admin: {
                id: admin.id,
                email: admin.email
            }
        }
    }
}

export default new AdminLoginService()