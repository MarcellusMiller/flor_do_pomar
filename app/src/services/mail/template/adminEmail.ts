export const adminEmailTemplate = (senderName: string, email: string, type: string, message: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px;">
        <div style="background-color: #ffffff; border-radius: 8px; padding: 40px;">
            
            <h2 style="color: #c8a97e;">Nova mensagem recebida!</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; color: #888; width: 120px;">Nome</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${senderName}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; color: #888;">Email</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${email}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; color: #888;">Tipo</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${type}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; color: #888; vertical-align: top;">Mensagem</td>
                    <td style="padding: 10px; color: #333;">${message}</td>
                </tr>
            </table>
        </div>
    </div>
`;