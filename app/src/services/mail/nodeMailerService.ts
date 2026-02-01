import nodemailer from "nodemailer";

class nodeMailerService {
    private transporter: nodemailer.Transporter | null = null;

    async transport() {
        if (!this.transporter) {
            const testEmail = await nodemailer.createTestAccount();
            this.transporter = nodemailer.createTransport({
                host: testEmail.smtp.host,
                port: testEmail.smtp.port,
                secure: testEmail.smtp.secure,
                auth: {
                    user: testEmail.user,
                    pass: testEmail.pass,
                },
            });
        }
        return this.transporter!;
    }

    async send(to: string, subject: string, text: string, html: string) {
        const transporter = await this.transport();
        const info = await transporter.sendMail({
            from: '"Test sender" <test@example.com>',
            to,
            subject,
            text,
            html, 
        });
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        return info;
    }
}

export default new nodeMailerService();
