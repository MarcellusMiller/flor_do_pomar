import nodemailer from "nodemailer";
import dotenv from "dotenv"

dotenv.config();

class nodeMailerService {
    private transporter: nodemailer.Transporter | null = null;

    async transport() {
        if (!this.transporter) {
            this.transporter = nodemailer.createTransport({
                host: process.env.MAIL_HOST,
                port: Number(process.env.MAIL_PORT),
                secure: process.env.MAIL_SECURE === "true",
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASSWORD,
                },
            });
        }
        return this.transporter!;
    }

    async send(to: string, subject: string, text: string, html: string) {
        const transporter = await this.transport();
        const info = await transporter.sendMail({
            from: `"Test Sender" <${process.env.MAIL_USER}>`,
            to,
            subject,
            text,
            html, 
        });
        console.log("Email enviado:", info.messageId);
        return info;
    }
}

export default new nodeMailerService();
