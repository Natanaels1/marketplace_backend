const nodemailer = require("nodemailer");

import { Login } from "../interfaces/user.interface";
import { generateAccessCode } from "./generateAccessCode";

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },
});

export function sendEmailCode({email}: Login): number {
    
    const accessCode: number = generateAccessCode();

    transporter.sendMail({
        from: `Oxi Serviços <servicosoxi@gmail.com>`, 
        to: email,
        subject: "Código de login Oxi Serviços",
        text: `Olá, aqui está seu código: ${accessCode}`,
        html: `
            <!doctype html>
            <html>
                <head>
                    <meta http-equiv=3D"Content-Type" content=3D"text/html; charset=3DUTF-8">
                </head>
                <body style=3D"font-family: sans-serif;">
                    <div style=3D"display: block; margin: auto; max-width: 600px;" class=3D"main">
                        <h1 style=3D"font-size: 18px; font-weight: bold; margin-top: 20px">Olá, obrigado por se cadastrar.</h1>
                        <p>Aqui está seu código de acesso: <b>${accessCode}</b></p>
                    </div>
                    
                    <style>
                        .main { background-color: white; }
                        a:hover { border-left-width: 1em; min-height: 2em; }
                    </style>
                </body>
            </html>
        `,
    });

    return accessCode;
};