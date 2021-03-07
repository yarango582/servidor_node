import mail from "nodemailer";


export const goSendPassword = async (from, to, html) => {

    let transporter = mail.createTransport({

        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    
    });

    try {

        let info = await transporter.sendMail({
            from,
            to,
            subject:"CORREO AUTOMATICO - CAMBIO DE CONTRASEÑA",
            html
        });
        
    } catch (error) {
        console.log(error);
    }

}

