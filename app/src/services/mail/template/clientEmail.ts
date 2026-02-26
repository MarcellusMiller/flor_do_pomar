export const clientEmailTemplate = (senderName: string, typeLabel: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px;">
        <div style="background-color: #ffffff; border-radius: 8px; padding: 40px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #c8a97e; font-size: 24px; margin: 0;">Flor Do Pomar</h1>
                <p style="color: #999; font-size: 12px; margin: 5px 0 0;">Weeding Planning</p>
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