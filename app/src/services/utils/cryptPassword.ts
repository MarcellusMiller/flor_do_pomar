import bcrypt from "bcrypt";
class cryptPassword {
    private saltRounds = 10;

    async hash(password: string): Promise<string> {
        const hash = await bcrypt.hash(password, this.saltRounds);
        return hash;
    }

    async compare(password: string, hashedPassword: string): Promise<boolean> {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch
    }
}

export default new cryptPassword();