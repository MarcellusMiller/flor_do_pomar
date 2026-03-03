import nodemailer from "nodemailer";
import dotenv from "dotenv"

dotenv.config();

class nodeMailerService {
    private transporter: nodemailer.Transporter | null = null;

    private logoAttachment = {
        filename: "logo.png",
        path: "/app/storage/logo/logo.png",
        cid: "logo@flordopomar",
        contentDisposition: "inline" as const,
        encoding: "base64", 
        headers: {
            "Content-ID": "<logo@flordopomar>",
        }
    };

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

    async send(to: string, subject: string, text: string, html: string, fromName: string = "Flor do Pomar") {
        const transporter = await this.transport();
        const info = await transporter.sendMail({
            from: `${fromName} <${process.env.MAIL_USER}>`,
            to,
            subject,
            text,
            html,
            attachments: [this.logoAttachment]
        });
        console.log("Email enviado:", info.messageId);
        return info;
    }
}

export default new nodeMailerService();
