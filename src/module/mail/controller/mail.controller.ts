import { Controller, Post, Query } from "@nestjs/common";
import { MailService } from "../service/mail.service";

@Controller('mail')
export class MailController {
    constructor(
        private readonly sendgridService: MailService
    ){}

    @Post('send')
    async sendEmail() {
        const mail = {
            to: ['lhm2001@hotmail.com'],
            subject: 'Hello World',
            from: 'u20181g907@upc.edu.pe',
            text: 'Hello World',
            html: '<h1>Hello World</h1>'
        };

       return await this.sendgridService.send(mail);
    }
}
