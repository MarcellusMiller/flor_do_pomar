import JwtService from "../utils/jwt.js";
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

        const token = JwtService.createToken(admin);

        return {
            token,
            admin
        };
    }

    validateToken(token: string) {
        return JwtService.validateToken(token);
    }
    
}

export default new AdminLoginService()