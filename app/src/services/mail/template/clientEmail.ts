export const clientEmailPTTemplate = (senderName: string, typeLabel: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px;">
        <div style="background-color: #ffffff; border-radius: 8px; padding: 40px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
                <img src="https://flordopomar.pt/assets/logo/logo.png" alt="Logo Flor do Pomar" style="max-width: 150px; height: auto;" />
            </div>
            <h2 style="color: #333; font-size: 20px;">Olá, ${senderName}!</h2>
            <p style="color: #555; line-height: 1.6;">
                Recebemos a sua mensagem sobre <strong style="color: #c8a97e;">${typeLabel}</strong> com sucesso.
            </p>
            <p style="color: #555; line-height: 1.6;">
                A nossa equipa irá analisar o seu pedido e entrar em contacto em breve.
            </p>
            <div style="background-color: #fdf6ee; border-left: 4px solid #c8a97e; padding: 15px; margin: 25px 0; border-radius: 4px;">
                <p style="margin: 0; color: #888; font-size: 14px;">Tempo médio de resposta: <strong>1-2 dias úteis</strong></p>
            </div>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="color: #aaa; font-size: 12px; text-align: center; margin: 0;">
                Este é um email automático, por favor não responda.
            </p>
        </div>
    </div>
`;

export const clientEmailENTemplate = (senderName: string, typeLabel: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px;">
        <div style="background-color: #ffffff; border-radius: 8px; padding: 40px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
                <img src="https://flordopomar.pt/assets/logo/logo.png" alt="Logo Flor do Pomar" style="max-width: 150px; height: auto;" />
            </div>
            <h2 style="color: #333; font-size: 20px;">Hello, ${senderName}!</h2>
            <p style="color: #555; line-height: 1.6;">
                We have successfully received your message regarding <strong style="color: #c8a97e;">${typeLabel}</strong>.
            </p>
            <p style="color: #555; line-height: 1.6;">
                Our team will review your request and get back to you shortly.
            </p>
            <div style="background-color: #fdf6ee; border-left: 4px solid #c8a97e; padding: 15px; margin: 25px 0; border-radius: 4px;">
                <p style="margin: 0; color: #888; font-size: 14px;">Average response time: <strong>1-2 business days</strong></p>
            </div>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="color: #aaa; font-size: 12px; text-align: center; margin: 0;">
                This is an automated email, please do not reply.
            </p>
        </div>
    </div>
`;