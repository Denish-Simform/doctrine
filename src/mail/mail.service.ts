import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;

    constructor(private configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            host: this.configService.get<string>('MAIL_HOST'),
            port: this.configService.get<number>('MAIL_PORT'),
            secure: false,
            auth: {
                user: this.configService.get<string>('MAIL_USER'),
                pass: this.configService.get<string>('MAIL_PASS'),
            },
        });
    }

    async sendMail(to: string, subject: string, html: string) {
        const from = this.configService.get('MAIL_FROM');

        return this.transporter.sendMail({
            from,
            to,
            subject,
            html,
        });
    }

    async sendVerificationEmail(email: string, token: string) {
        const verifyUrl = `http://localhost:3000/auth/verify?token=${token}`;

        const html = `
            <h1>Verify your email</h1>
            <p>Click the link below to verify your account:</p>
            <a href="${verifyUrl}">Verify Email</a>
        `;

        return this.sendMail(email, 'Verify your email', html);
    }
}
